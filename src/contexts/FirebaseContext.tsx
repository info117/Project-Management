import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
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
}

const FirebaseContext = createContext<FirebaseContextType | undefined>(undefined);

export function FirebaseProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [trialStatus, setTrialStatus] = useState({ isExpired: false, isTrial: true, daysLeft: 7 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      
      if (user) {
        // Sync/Fetch user profile
        if (!db) {
          console.error("Firestore database instance (db) is not initialized.");
          setLoading(false);
          return;
        }
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);
        
        let currentProfile;
        if (!userDoc.exists()) {
          currentProfile = {
            fullName: user.displayName || 'New Student',
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
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <FirebaseContext.Provider value={{ user, loading, profile, trialStatus, login, logout }}>
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
