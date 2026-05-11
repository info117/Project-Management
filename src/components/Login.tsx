import React, { useState } from 'react';
import { useFirebase } from '../contexts/FirebaseContext';
import { LogIn, UserPlus, Mail, Lock, User as UserIcon, AlertCircle, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type AuthMode = 'login' | 'signup' | 'reset';

export function Login() {
  const { login, loginEmail, signupEmail, resetPassword } = useFirebase();
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    try {
      if (mode === 'login') {
        await loginEmail(email, password);
      } else if (mode === 'signup') {
        if (!name) throw new Error('Full name is required');
        await signupEmail(email, password, name);
      } else if (mode === 'reset') {
        await resetPassword(email);
        setMessage('Password reset email sent! Check your inbox.');
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const socialLogin = async () => {
    setError(null);
    setLoading(true);
    try {
      await login();
    } catch (err: any) {
      if (err.code === 'auth/popup-closed-by-user') {
        setError('Login popup was closed before completion. Please try again or use email login.');
      } else if (err.code === 'auth/cancelled-popup-request') {
        // Ignore this one as it usually means another popup was opened
      } else {
        setError(err.message || 'Google login failed');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-bg-deep selection:bg-orange-500/30">
      <div className="w-full max-w-md">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-8 md:p-10 space-y-8 relative overflow-hidden"
        >
          {/* Decorative background elements */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-orange-600/10 blur-3xl rounded-full" />
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-brand/10 blur-3xl rounded-full" />

          <div className="text-center space-y-3 relative z-10">
            <h1 className="text-3xl font-black text-white tracking-tight italic">
              PROJECT MANAGEMENT <span className="text-orange-500 underline decoration-2 underline-offset-4">AI</span>
            </h1>
            <p className="text-stone-400 text-xs font-medium uppercase tracking-[0.2em] opacity-70">
              {mode === 'login' ? 'Welcome back to the future' : mode === 'signup' ? 'Begin your executive journey' : 'Restore access to your vault'}
            </p>
          </div>

          <AnimatePresence mode="wait">
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl flex gap-3 items-center text-red-400 text-xs font-bold"
              >
                <AlertCircle size={16} className="shrink-0" />
                <p>{error}</p>
              </motion.div>
            )}

            {message && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl flex gap-3 items-center text-emerald-400 text-xs font-bold"
              >
                <AlertCircle size={16} className="shrink-0 text-emerald-400" />
                <p>{message}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
            {mode === 'signup' && (
              <div className="space-y-1">
                <label className="text-[10px] font-black text-stone-500 uppercase ml-1">Full Name</label>
                <div className="relative group">
                  <UserIcon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-500 group-focus-within:text-orange-500 transition-colors" />
                  <input 
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white text-sm outline-none focus:border-orange-500/50 focus:bg-white/10 transition-all"
                    placeholder="Enter your name"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-[10px] font-black text-stone-500 uppercase ml-1">Corporate Email</label>
              <div className="relative group">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-500 group-focus-within:text-orange-500 transition-colors" />
                <input 
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white text-sm outline-none focus:border-orange-500/50 focus:bg-white/10 transition-all"
                  placeholder="name@company.com"
                />
              </div>
            </div>

            {mode !== 'reset' && (
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-black text-stone-500 uppercase ml-1">Security Key</label>
                  {mode === 'login' && (
                    <button 
                      type="button"
                      onClick={() => setMode('reset')}
                      className="text-[10px] font-black text-orange-500 hover:text-orange-400 uppercase transition-colors"
                    >
                      Forgot Key?
                    </button>
                  )}
                </div>
                <div className="relative group">
                  <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-500 group-focus-within:text-orange-500 transition-colors" />
                  <input 
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white text-sm outline-none focus:border-orange-500/50 focus:bg-white/10 transition-all"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            )}

            <button 
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-4 rounded-xl flex items-center justify-center gap-2 text-sm font-black disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  {mode === 'login' ? 'Initialize Board' : mode === 'signup' ? 'Provision Account' : 'Reset Credentials'}
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="relative flex items-center py-2">
            <div className="flex-grow border-t border-white/5"></div>
            <span className="flex-shrink mx-4 text-[10px] font-black text-stone-500 uppercase">Secure Gateway</span>
            <div className="flex-grow border-t border-white/5"></div>
          </div>

          <button 
            onClick={socialLogin}
            disabled={loading}
            className="w-full bg-white h-14 rounded-xl flex items-center justify-center gap-3 text-stone-900 font-bold hover:bg-stone-50 transition-colors disabled:opacity-50"
          >
            <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
            Continue with Google
          </button>

          <div className="text-center pt-2">
            {mode === 'login' ? (
              <p className="text-stone-400 text-xs font-medium">
                New to the platform?{' '}
                <button 
                  onClick={() => setMode('signup')}
                  className="text-orange-500 font-black hover:underline underline-offset-4"
                >
                  Apply for Account
                </button>
              </p>
            ) : (
              <p className="text-stone-400 text-xs font-medium">
                Already have access?{' '}
                <button 
                  onClick={() => setMode('login')}
                  className="text-orange-500 font-black hover:underline underline-offset-4"
                >
                  Return to Dashboard
                </button>
              </p>
            )}
          </div>
        </motion.div>
        
        <p className="mt-8 text-center text-stone-500 text-[10px] font-black uppercase tracking-widest leading-loose">
          Secure AI-Powered Workforce Development Ecosystem © 2026<br/>
          Advanced encryption active
        </p>
      </div>
    </div>
  );
}
