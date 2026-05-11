import { LayoutDashboard, BookOpen, GraduationCap, MessageSquare, User, BarChart3, Award, Settings, CreditCard, Clock } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/src/lib/utils';
import { useFirebase } from '@/src/contexts/FirebaseContext';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: BookOpen, label: 'Courses', path: '/courses' },
  { icon: GraduationCap, label: 'AI Tutor', path: '/ai-tutor' },
  { icon: MessageSquare, label: 'Chatbot', path: '/chatbot' },
  { icon: User, label: 'Profile', path: '/profile' },
  { icon: BarChart3, label: 'Progress', path: '/progress' },
  { icon: Award, label: 'Certificate', path: '/certificate' },
  { icon: CreditCard, label: 'Subscription', path: '/subscription' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export function Sidebar() {
  const { trialStatus, profile } = useFirebase();

  return (
    <aside className="w-64 border-r border-white/10 glass flex flex-col h-screen fixed left-0 top-0 z-20 transition-colors">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 bg-brand rounded-xl flex items-center justify-center shadow-lg shadow-brand/20">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div>
            <span className="font-black tracking-tighter text-white text-base block leading-none">Project</span>
            <span className="font-bold tracking-widest text-orange-500 text-[10px] block">Management AI</span>
          </div>
        </div>
        
        <nav className="space-y-1.5">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => 
                cn(
                  "nav-link relative group",
                  isActive && "nav-link-active"
                )
              }
            >
              <item.icon size={18} className="group-hover:scale-110 transition-transform" />
              <span className="text-[11px] font-bold uppercase tracking-wider">{item.label}</span>
              {item.label === 'AI Tutor' && (
                <span className="ml-auto bg-brand/20 text-brand px-1.5 py-0.5 rounded text-[8px] font-black animate-pulse">BETA</span>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-6 space-y-4">
        {trialStatus.isTrial && !trialStatus.isExpired && (
          <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-2xl">
            <div className="flex items-center gap-2 text-orange-500 mb-2">
              <Clock size={14} />
              <span className="text-[10px] font-black uppercase tracking-wider">Free Trial</span>
            </div>
            <p className="text-xs text-white font-bold mb-3">
              {trialStatus.daysLeft === 0 ? 'Last day of trial' : `${trialStatus.daysLeft} days left in trial`}
            </p>
            <NavLink 
              to="/subscription"
              className="w-full btn-primary text-[10px] flex items-center justify-center py-2 bg-orange-500 hover:bg-orange-600 border-orange-600"
            >
              Upgrade Now
            </NavLink>
          </div>
        )}

        {profile?.subscriptionStatus === 'active' && (
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
            <p className="text-[9px] text-emerald-500 font-black mb-1 uppercase tracking-[0.2em]">Tier: {profile.plan || 'Premium'}</p>
            <p className="text-xs text-white font-bold tracking-tight">Active Subscription</p>
          </div>
        )}

        <div className="p-4 bg-brand/10 border border-brand/20 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:rotate-12 transition-transform">
            <Award size={48} className="text-brand" />
          </div>
          <p className="text-[9px] text-brand font-black mb-1 uppercase tracking-[0.2em]">Mastery</p>
          <p className="text-xs text-white font-bold mb-3 tracking-tight leading-tight">Master PMP Formulas Today.</p>
          <button className="w-full btn-primary text-[10px]">Resume Roadmap</button>
        </div>
      </div>
    </aside>
  );
}
