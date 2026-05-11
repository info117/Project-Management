import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import { Readable } from 'stream';
import Stripe from 'stripe';
import admin from 'firebase-admin';
import helmet from 'helmet';
import { rateLimit } from 'express-rate-limit';
import firebaseConfig from './firebase-applet-config.json' with { type: 'json' };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Firebase Admin
let adminDb: admin.firestore.Firestore;

if (!admin.apps.length) {
  const adminApp = admin.initializeApp({
    projectId: firebaseConfig.projectId,
  });
  // @ts-ignore - databaseId is supported in v12+ but types might be trailing
  adminDb = adminApp.firestore(firebaseConfig.firestoreDatabaseId || undefined);
} else {
  // @ts-ignore
  adminDb = admin.app().firestore(firebaseConfig.firestoreDatabaseId || undefined);
}

let stripeClient: Stripe | null = null;

function getStripe(): Stripe {
  if (!stripeClient) {
    let key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      throw new Error('STRIPE_SECRET_KEY environment variable is required');
    }
    
    // Aggressively clean the key: remove whitespace, quotes, and leading dots (common copy-paste errors)
    key = key.trim().replace(/^['".]+/, '').replace(/['"]+$/, '');
    
    stripeClient = new Stripe(key);
  }
  return stripeClient;
}

async function startServer() {
  const app = express();
  app.set('trust proxy', 1);
  const PORT = 3000;

  // Security Headers
  app.use(helmet({
    contentSecurityPolicy: false, // Disable CSP so Vite/Preview works correctly
    crossOriginEmbedderPolicy: false
  }));

  // Generic Rate Limiting
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limit each IP to 100 requests per `window`
    standardHeaders: 'draft-7',
    legacyHeaders: false,
  });
  app.use('/api/', limiter);

  // Auth Middleware
  const authenticate = async (req: any, res: any, next: any) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized: Missing or malformed token' });
    }
    const idToken = authHeader.split('Bearer ')[1];
    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      req.user = decodedToken;
      next();
    } catch (error) {
      console.error('Error verifying ID token:', error);
      res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }
  };

  // Stripe Webhook Endpoint (MUST be before express.json() for raw body)
  app.post('/api/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
    const sig = req.headers['stripe-signature'] as string;
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    const stripe = getStripe();

    let event;

    try {
      if (!webhookSecret) {
        throw new Error('STRIPE_WEBHOOK_SECRET is not configured');
      }
      event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    } catch (err: any) {
      console.error(`Webhook Error: ${err.message}`);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    try {
      switch (event.type) {
        case 'checkout.session.completed': {
          const session = event.data.object as Stripe.Checkout.Session;
          const userId = session.metadata?.userId;
          const planId = session.metadata?.planId;

          if (userId && userId !== 'anonymous') {
            console.log(`Updating subscription for user: ${userId}`);
            await adminDb.collection('users').doc(userId).set({
              subscriptionStatus: 'active',
              plan: planId,
              stripeSessionId: session.id,
              updatedAt: admin.firestore.FieldValue.serverTimestamp()
            }, { merge: true });
          }
          break;
        }
        case 'customer.subscription.deleted': {
          const subscription = event.data.object as Stripe.Subscription;
          // Find user by stripe customer ID would be better, but for now we look for active session
          const users = await adminDb.collection('users')
            .where('stripeSubscriptionId', '==', subscription.id)
            .limit(1)
            .get();
          
          if (!users.empty) {
            const userDoc = users.docs[0];
            await userDoc.ref.update({
              subscriptionStatus: 'canceled',
              updatedAt: admin.firestore.FieldValue.serverTimestamp()
            });
          }
          break;
        }
        default:
          console.log(`Unhandled event type ${event.type}`);
      }
    } catch (dbError) {
      console.error('Error updating Firestore from webhook:', dbError);
      return res.status(500).json({ error: 'Database update failed' });
    }

    res.json({ received: true });
  });

  app.use(express.json());

  // Stripe Checkout Session Endpoint
  app.post('/api/create-checkout-session', authenticate, async (req: any, res) => {
    try {
      const { planId, priceId: priceIdFromReq, successUrl, cancelUrl } = req.body;
      const userId = req.user.uid; // Securely get userId from verified token
      const stripe = getStripe();

      let priceId = priceIdFromReq;
      
      // Fallback to plan mapping if priceId isn't provided directly
      if (!priceId) {
        if (planId === 'Monthly') {
          priceId = 'price_1TRmUKRz1q5gMpOxrc7ltpty';
        } else if (planId === 'Yearly') {
          priceId = 'price_1TRmW2Rz1q5gMpOxTPJjOZjr';
        }
      }

      if (!priceId) {
        return res.status(400).json({ error: 'Invalid plan or price ID' });
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        mode: 'subscription',
        success_url: successUrl || `${req.headers.origin}/progress?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: cancelUrl || `${req.headers.origin}/subscription`,
        metadata: {
          userId: req.body.userId || 'anonymous',
          planId: planId
        }
      });

      res.json({ url: session.url });
    } catch (error: any) {
      console.error('Stripe Error:', error);
      res.status(500).json({ error: error.message });
    }
  });

  // Optimized Video Streaming Proxy
  // Supports Range requests, injects API Keys for Google Veo/GenAI, and handles generic streaming (e.g. Firebase)
  const streamProxy = async (req: express.Request, res: express.Response) => {
    const videoUrl = req.query.url as string;
    if (!videoUrl) return res.status(400).send('URL is required');

    const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY;
    const isGoogleApi = videoUrl.includes('googleapis.com');

    try {
      const headers: Record<string, string> = {};
      if (isGoogleApi && apiKey) {
        headers['x-goog-api-key'] = apiKey;
      }

      if (req.headers.range) {
        headers['range'] = req.headers.range as string;
      }

      const response = await fetch(videoUrl, { headers });

      // Cleanly forward the response status and headers for efficient playback
      res.status(response.status);
      
      const importantHeaders = [
        'content-type',
        'content-range',
        'accept-ranges',
        'content-length',
        'cache-control',
        'etag',
        'last-modified'
      ];

      importantHeaders.forEach(h => {
        const val = response.headers.get(h);
        if (val) res.setHeader(h, val);
      });

      // Stream the body directly for low memory footprint and instant playback
      if (response.body) {
        // @ts-ignore
        Readable.fromWeb(response.body).pipe(res);
      } else {
        res.end();
      }
    } catch (error) {
      console.error('Streaming error:', error);
      res.status(500).send('Error during video playback orchestration');
    }
  };

  app.get('/api/video-proxy', streamProxy);
  app.get('/api/stream', streamProxy);

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
