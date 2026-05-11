import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User, 
  onAuthStateChanged, 
  signInWithPopup, 
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile
} from 'firebase/auth';
import { auth, googleProvider, db } from '../lib/firebase';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';

import { getTrialStatus } from '../lib/subscription';

interface FirebaseContextType {
  user: User | null;
  loading: boolean;
  profile: any | null;
  trialStatus: { isExpired: boolean; isTrial: boolean; daysLeft: number };
  login: () => Promise<void>;
  logout: () => Promise<void>;
  loginEmail: (email: string, pass: string) => Promise<void>;
  signupEmail: (email: string, pass: string, name: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const FirebaseContext = createContext<FirebaseContextType | undefined>(undefined);

export function FirebaseProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [trialStatus, setTrialStatus] = useState({ isExpired: false, isTrial: true, daysLeft: 7 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Safety timeout to prevent infinite loading spinner
    const timer = setTimeout(() => {
      setLoading(curr => {
        if (curr) console.warn("Loading timed out, forcing display.");
        return false;
      });
    }, 8000);

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        setUser(user);
        
        if (user) {
          // Sync/Fetch user profile
          if (!db) {
            setLoading(false);
            return;
          }
          const userDocRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userDocRef);
          
          let currentProfile;
          if (!userDoc.exists()) {
            currentProfile = {
              fullName: user.displayName || 'New Scholar',
              email: user.email,
              verifiedStatus: false,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              subscriptionStatus: 'trial'
            };
            await setDoc(userDocRef, currentProfile);
          } else {
            currentProfile = userDoc.data();
          }
          setProfile(currentProfile);
          setTrialStatus(getTrialStatus(currentProfile.createdAt, currentProfile.subscriptionStatus));
        } else {
          setProfile(null);
          setTrialStatus({ isExpired: false, isTrial: true, daysLeft: 7 });
        }
      } catch (error) {
        console.error("Auth state change processing failed:", error);
      } finally {
        setLoading(false);
        clearTimeout(timer);
      }
    });

    return () => {
      unsubscribe();
      clearTimeout(timer);
    };
  }, []);

  const login = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Login failed", error);
      throw error;
    }
  };

  const loginEmail = async (email: string, pass: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, pass);
    } catch (error) {
      console.error("Email login failed", error);
      throw error;
    }
  };

  const signupEmail = async (email: string, pass: string, name: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
      await updateProfile(userCredential.user, { displayName: name });
      
      // The onAuthStateChanged will handle the profile creation in Firestore
    } catch (error) {
      console.error("Signup failed", error);
      throw error;
    }
  };

  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      console.error("Password reset failed", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout failed", error);
      throw error;
    }
  };

  return (
    <FirebaseContext.Provider value={{ 
      user, 
      loading, 
      profile, 
      trialStatus, 
      login, 
      logout,
      loginEmail,
      signupEmail,
      resetPassword
    }}>
      {children}
    </FirebaseContext.Provider>
  );
}

export function useFirebase() {
  const context = useContext(FirebaseContext);
  if (context === undefined) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return context;
}
