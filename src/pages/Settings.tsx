import React from 'react';
import { Settings, Bell, Shield, Moon, Eye, Keyboard, HelpCircle } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1 uppercase tracking-tight">App Settings</h2>
        <p className="text-xs text-stone-400">Configure your learning experience and privacy presets.</p>
      </div>

      <div className="space-y-6">
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl divide-y divide-white/5 overflow-hidden">
          <Section 
            icon={<Bell size={18} className="text-orange-400" />} 
            title="Notifications" 
            desc="Control how PMA alerts you about deadlines and AI Mentor insights."
            toggle 
          />
          <Section 
            icon={<Shield size={18} className="text-emerald-400" />} 
            title="Privacy & Data" 
            desc="Manage the interaction logs used for your cognitive learning models."
          />
          <Section 
            icon={<Moon size={18} className="text-purple-400" />} 
            title="Appearance" 
            desc="Customize the Glassmorphism transparency and dark mode intensity."
          />
          <Section 
            icon={<Eye size={18} className="text-amber-400" />} 
            title="Accessibility" 
            desc="Screen reader support, high contrast mode, and font scaling."
          />
          <Section 
            icon={<HelpCircle size={18} className="text-orange-400" />} 
            title="Support" 
            desc="Contact our technical team or report a content hallucination."
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-8">
        <button className="px-6 py-2 rounded-lg text-stone-400 font-bold text-[10px] uppercase hover:text-white transition-all">Cancel</button>
        <button className="btn-primary uppercase px-8">Save Preferences</button>
      </div>
    </div>
  );
}

function Section({ icon, title, desc, toggle }: { icon: React.ReactNode, title: string, desc: string, toggle?: boolean }) {
  return (
    <div className="p-6 flex items-start gap-6 hover:bg-white/[0.02] transition-colors cursor-pointer group">
      <div className="p-3 rounded-xl bg-white/5 group-hover:bg-white/10 transition-all border border-white/5">
        {icon}
      </div>
      <div className="flex-1">
        <h4 className="text-white font-bold mb-1 text-sm uppercase tracking-tight">{title}</h4>
        <p className="text-[11px] text-stone-500 leading-relaxed font-medium">{desc}</p>
      </div>
      {toggle ? (
        <div className="w-10 h-5 bg-orange-600 rounded-full relative shadow-lg shadow-orange-900/40">
          <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm" />
        </div>
      ) : (
        <div className="text-stone-600 group-hover:text-stone-400 transition-colors">
          <HelpCircle size={16} />
        </div>
      )}
    </div>
  );
}
