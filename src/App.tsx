import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import VideoLab from './pages/VideoLab';
import Chatbot from './pages/Chatbot';
import Courses from './pages/Courses';
import ModuleDetail from './pages/ModuleDetail';
import AITutor from './pages/AITutor';
import Certificate from './pages/Certificate';
import Progress from './pages/Progress';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Subscription from './pages/Subscription';
import { FirebaseProvider, useFirebase } from './contexts/FirebaseContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { LogIn } from 'lucide-react';

import TrialGuard from './components/TrialGuard';

function ProtectedRoutes() {
  const { user, loading, login } = useFirebase();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-bg-deep">
        <div className="glass-card p-12 text-center max-w-md w-full space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-white">Project Management AI</h1>
            <p className="text-stone-400 text-sm leading-relaxed">
              Project Management AI™ is an AI-powered platform for training and workforce development—helping you upskill talent, track performance, and turn learning into measurable productivity.
            </p>
          </div>
          <button 
            onClick={login}
            className="w-full btn-primary flex items-center justify-center gap-3 py-4"
          >
            <span className="bg-white/20 p-1.5 rounded-lg"><LogIn size={20} /></span>
            Continue with Google
          </button>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Guarded Routes */}
        <Route index element={<TrialGuard><Dashboard /></TrialGuard>} />
        <Route path="courses" element={<TrialGuard><Courses /></TrialGuard>} />
        <Route path="courses/:id" element={<TrialGuard><ModuleDetail /></TrialGuard>} />
        <Route path="ai-tutor" element={<TrialGuard><AITutor /></TrialGuard>} />
        <Route path="chatbot" element={<TrialGuard><Chatbot /></TrialGuard>} />
        <Route path="progress" element={<TrialGuard><Progress /></TrialGuard>} />
        <Route path="certificate" element={<TrialGuard><Certificate /></TrialGuard>} />
        <Route path="video-lab" element={<TrialGuard><VideoLab /></TrialGuard>} />
        
        {/* Open Routes (for payment/profile) */}
        <Route path="profile" element={<Profile />} />
        <Route path="subscription" element={<Subscription />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

// Placeholder pages to avoid import errors
const Placeholder = ({ title }: { title: string }) => (
  <div className="flex items-center justify-center h-[70vh]">
    <div className="glass-card p-12 text-center max-w-md">
      <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
      <p className="text-stone-400">This module is currently being optimized by our AI Orchestrator. Check back soon for the latest PM insights.</p>
    </div>
  </div>
);

export default function App() {
  return (
    <ThemeProvider>
      <FirebaseProvider>
        <BrowserRouter>
          <ProtectedRoutes />
        </BrowserRouter>
      </FirebaseProvider>
    </ThemeProvider>
  );
}
