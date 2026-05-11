import React, { useState } from 'react';
import { Check, Zap, Star, Shield, CreditCard, ChevronRight, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';
import { getStripe } from '@/src/lib/stripe';
import { useFirebase } from '../contexts/FirebaseContext';

export default function Subscription() {
  const [loading, setLoading] = useState<string | null>(null);
  const { user } = useFirebase();

  const handleCheckout = async (planName: string) => {
    if (planName === 'Free Trial') return;
    
    setLoading(planName);
    try {
      const idToken = await user.getIdToken();
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`
        },
        body: JSON.stringify({
          planId: planName,
          successUrl: window.location.origin + '/progress?session_id={CHECKOUT_SESSION_ID}',
          cancelUrl: window.location.origin + '/subscription',
        }),
      });

      const session = await response.json();
      if (session.url) {
        window.location.href = session.url;
      }
    } catch (error) {
      console.error('Checkout error:', error);
    } finally {
      setLoading(null);
    }
  };

  const plans = [
    {
      name: 'Free Trial',
      price: '0',
      duration: '7 Days',
      description: 'Experience the full power of Project Management AI for free.',
      features: [
        'Full Access to All 12 Modules',
        'AI Study Assistant (Limited)',
        'Practice Exams & Quizzes',
        'Digital Certificate on Completion',
        'Progress Tracking Dashboard'
      ],
      buttonText: 'Start Free Trial',
      highlight: false,
      icon: Shield
    },
    {
      name: 'Monthly',
      price: '9.99',
      duration: 'Per Month',
      description: 'Flexible access for your project management journey.',
      features: [
        'Everything in Free Trial',
        'Unlimited AI Tutor Interactions',
        'Premium Video Lab Content',
        'Priority Support Access',
        'No Commitment - Cancel Anytime'
      ],
      buttonText: 'Subscribe Monthly',
      highlight: true,
      icon: Zap
    },
    {
      name: 'Yearly',
      price: '99.99',
      duration: 'Per Year',
      description: 'The best value for committed PMP/CAPM candidates.',
      features: [
        'Value: Get 2 Months Free',
        'Lifetime Access to Modules',
        'Exclusive Webinar Sessions',
        'Advanced Analytics & Insights',
        'Custom Study Roadmap'
      ],
      buttonText: 'Subscribe Yearly',
      highlight: false,
      icon: Star
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-12">
      <div className="text-center space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl font-black tracking-tighter text-white">
            CHOOSE YOUR <span className="text-brand">TRAJECTORY</span>
          </h1>
          <p className="text-stone-400 text-lg max-w-2xl mx-auto mt-4 font-medium">
            Project Management AI™ is an AI-powered platform for training and workforce development—helping you upskill talent, track performance, and turn learning into measurable productivity.
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={cn(
              "glass-card relative p-8 flex flex-col h-full",
              plan.highlight && "ring-2 ring-brand ring-offset-4 ring-offset-bg-deep scale-105 z-10"
            )}
          >
            {plan.highlight && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand text-white px-4 py-1 rounded-full text-[10px] font-black tracking-widest uppercase">
                Most Popular
              </div>
            )}

            <div className="mb-8">
              <div className={cn(
                "w-12 h-12 rounded-2xl flex items-center justify-center mb-6 shadow-lg",
                plan.highlight ? "bg-brand text-white shadow-brand/20" : "bg-white/5 text-stone-400"
              )}>
                <plan.icon size={28} />
              </div>
              <h2 className="text-2xl font-black text-white tracking-tight uppercase leading-none mb-1">
                {plan.name}
              </h2>
              <div className="flex items-baseline gap-1 mt-4">
                <span className="text-4xl font-black text-white tracking-tighter">
                  ${plan.price}
                </span>
                <span className="text-stone-500 font-bold uppercase text-[10px]">
                  {plan.duration}
                </span>
              </div>
              <p className="text-stone-400 text-xs mt-4 leading-relaxed font-medium">
                {plan.description}
              </p>
            </div>

            <div className="space-y-4 mb-10 flex-grow">
              {plan.features.map((feature, fIndex) => (
                <div key={fIndex} className="flex items-start gap-3">
                  <div className={cn(
                    "mt-0.5 w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0",
                    plan.highlight ? "bg-brand/20 text-brand" : "bg-white/5 text-stone-500"
                  )}>
                    <Check size={10} strokeWidth={4} />
                  </div>
                  <span className="text-stone-300 text-[11px] font-bold leading-tight">
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            <button 
              onClick={() => handleCheckout(plan.name)}
              disabled={loading !== null}
              className={cn(
                "w-full py-4 rounded-xl font-black uppercase text-[11px] tracking-widest transition-all duration-300 flex items-center justify-center gap-2",
                plan.highlight 
                  ? "bg-brand text-white shadow-xl shadow-brand/20 hover:bg-brand-hover hover:scale-[1.02]" 
                  : "bg-white/5 text-white hover:bg-white/10",
                loading === plan.name && "opacity-70 cursor-wait"
              )}
            >
              {loading === plan.name ? (
                <Loader2 className="animate-spin" size={14} strokeWidth={3} />
              ) : (
                <>
                  {plan.buttonText}
                  <ChevronRight size={14} strokeWidth={3} />
                </>
              )}
            </button>
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="glass-card p-10 bg-brand/5 border-brand/20 flex flex-col md:flex-row items-center justify-between gap-8"
      >
        <div className="space-y-2 text-center md:text-left">
          <div className="flex items-center gap-2 mb-2 justify-center md:justify-start">
            <CreditCard className="text-brand" size={24} />
            <h3 className="text-xl font-black text-white tracking-tight uppercase">Bulk Licensing for Teams</h3>
          </div>
          <p className="text-stone-400 text-xs max-w-xl font-medium leading-relaxed">
            Equip your entire project management office (PMO) with PMBOK 7 mastery. 
            Custom white-label options and enterprise-grade analytics available.
          </p>
        </div>
        <button className="btn-secondary px-8 py-4 whitespace-nowrap">
          Contact Enterprise Sales
        </button>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12 px-6">
        <div className="space-y-4">
          <h4 className="text-white font-black uppercase tracking-widest text-xs flex items-center gap-2">
            <Shield size={16} className="text-brand" /> Secure Checkout
          </h4>
          <p className="text-stone-500 text-[11px] leading-relaxed font-medium">
            Project Management AI uses 256-bit SSL encryption. Your payment information is processed through 
            industry-leading secure gateways and is never stored on our servers.
          </p>
        </div>
        <div className="space-y-4">
          <h4 className="text-white font-black uppercase tracking-widest text-xs flex items-center gap-2">
            <Zap size={16} className="text-brand" /> Instant Activation
          </h4>
          <p className="text-stone-500 text-[11px] leading-relaxed font-medium">
            Gain immediate access to all premium modules and AI tools the moment your subscription 
            is confirmed. Start your PM trajectory in seconds.
          </p>
        </div>
      </div>
    </div>
  );
}
