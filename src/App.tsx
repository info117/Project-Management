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
import { Login } from './components/Login';
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
    return <Login />;
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
