import React from 'react';
import { useFirebase } from '../contexts/FirebaseContext';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, CreditCard, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

interface TrialGuardProps {
  children: React.ReactNode;
}

export default function TrialGuard({ children }: { children: React.ReactNode }) {
  const { trialStatus, loading, user } = useFirebase();
  const navigate = useNavigate();

  if (loading) return null;

  if (user && trialStatus.isExpired) {
    return (
      <div className="min-h-screen bg-brand-dark flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-white/5 border border-white/10 rounded-2xl p-8 text-center"
        >
          <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="text-red-500" size={32} />
          </div>
          
          <h2 className="text-2xl font-bold text-white mb-2">Trial Expired</h2>
          <p className="text-gray-400 mb-8">
            Your 7-day trial has come to an end. To continue accessing your courses and learning, 
            please upgrade to a premium plan.
          </p>

          <div className="space-y-4">
            <button 
              onClick={() => navigate('/subscription')}
              className="w-full bg-brand hover:bg-brand-hover text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02]"
            >
              <CreditCard size={18} />
              View Subscription Plans
              <ChevronRight size={18} />
            </button>
            
            <button 
              onClick={() => window.location.href = '/'}
              className="w-full bg-white/5 hover:bg-white/10 text-white py-4 rounded-xl font-bold transition-all"
            >
              Go to Homepage
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return <>{children}</>;
}
