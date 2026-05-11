import React from 'react';
import { Download, Share2, ShieldCheck, Award } from 'lucide-react';
import { motion } from 'motion/react';
import { Tooltip } from 'react-tooltip';
import { useFirebase } from '../contexts/FirebaseContext';
import { cn } from '../lib/utils';

export default function CertificatePage() {
  const { user, profile } = useFirebase();
  const studentName = profile?.fullName || user?.displayName || 'Alex Johnson';
  const rawDate = profile?.courseCompletedAt;
  const completionDate = rawDate 
    ? (rawDate.toDate ? rawDate.toDate() : new Date(rawDate)).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      })
    : new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      });

  return (
    <div className="space-y-12 max-w-5xl mx-auto pb-20">
      <div className="text-center space-y-4">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-black text-white tracking-widest uppercase italic"
        >
          Distinction <span className="text-brand">Verified</span>
        </motion.h2>
        <p className="text-stone-400 font-medium">Official credential for Project Management Mastery.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Certificate Display Column */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative p-2 bg-[#1c140e] rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-4 border-[#d4af37]/30"
            data-tooltip-id="cert-tooltip"
            data-tooltip-content="Your institutional-grade certificate of completion, verified by the system orchestrator."
          >
            {/* The actual certificate paper */}
            <div className="bg-[#fdfbf7] p-8 sm:p-16 border-[12px] border-[#1c140e] relative overflow-hidden h-full">
              {/* Inner thin gold border */}
              <div className="border border-[#d4af37] p-8 sm:p-12 h-full flex flex-col items-center text-center">
                
                {/* Header Section */}
                <div className="mb-10 space-y-4">
                  <div className="w-16 h-16 bg-[#1c140e] text-[#d4af37] rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-[#d4af37]">
                    <Award size={32} />
                  </div>
                  <h4 className="text-[10px] font-black tracking-[0.6em] text-[#1c140e] uppercase mb-4">Certificate of Completion</h4>
                  <p className="text-[11px] text-stone-600 font-medium italic">This professional credential is hereby awarded to</p>
                </div>

                {/* Name Section */}
                <div className="mb-10">
                  <h3 className="text-6xl font-script text-[#1c140e] leading-tight px-4">{studentName}</h3>
                  <div className="w-64 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mt-4" />
                </div>

                {/* Course Details */}
                <div className="mb-12 space-y-4">
                  <p className="text-xs text-stone-600 font-medium leading-relaxed max-w-md mx-auto">
                    For successfully demonstrating mastery in the foundational and advanced methodologies of
                  </p>
                  <h2 className="text-2xl font-sans font-black text-[#1c140e] uppercase tracking-tighter">Master Project Management</h2>
                  <p className="text-[10px] text-stone-500 font-bold uppercase tracking-widest mt-2">{completionDate}</p>
                </div>

                {/* Signatures & Seal Section */}
                <div className="mt-auto w-full grid grid-cols-12 items-end pt-12">
                  {/* Left Signature */}
                  <div className="col-span-4 text-left">
                    <p className="font-handwriting text-2xl text-[#1c140e] mb-1 opacity-80">AI Orchestrator</p>
                    <div className="h-[0.5px] w-full bg-stone-300 mb-2" />
                    <p className="text-[8px] font-black text-stone-400 uppercase tracking-widest">System Verified</p>
                  </div>

                  {/* Golden Seal */}
                  <div className="col-span-4 flex justify-center pb-4 relative">
                    <div className="relative z-10 w-24 h-24 flex items-center justify-center">
                       {/* SVG Gold Seal */}
                       <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full drop-shadow-xl animate-[spin_20s_linear_infinite]">
                          <defs>
                            <linearGradient id="gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" style={{ stopColor: '#ffd700', stopOpacity: 1 }} />
                              <stop offset="50%" style={{ stopColor: '#d4af37', stopOpacity: 1 }} />
                              <stop offset="100%" style={{ stopColor: '#b8860b', stopOpacity: 1 }} />
                            </linearGradient>
                          </defs>
                          <path 
                            d="M50 0L54.1 11.5L66.2 9.5L65.5 21.7L77.1 24.3L71.8 35.3L81.2 43.1L71.8 50.8L77.1 61.8L65.5 64.4L66.2 76.6L54.1 74.6L50 86.1L45.9 74.6L33.8 76.6L34.5 64.4L22.9 61.8L28.2 50.8L18.8 43.1L28.2 35.3L22.9 24.3L34.5 21.7L33.8 9.5L45.9 11.5L50 0Z" 
                            fill="url(#gold-grad)" 
                          />
                       </svg>
                       <div className="relative z-20 flex flex-col items-center text-[#4b3c10]">
                          <Award size={20} />
                          <span className="text-[6px] font-black uppercase tracking-tighter">Certified Mastery</span>
                       </div>
                    </div>
                  </div>

                  {/* Right Signature */}
                  <div className="col-span-4 text-right">
                    <p className="font-handwriting text-2xl text-[#1c140e] mb-1 opacity-80">A Isaac</p>
                    <div className="h-[0.5px] w-full bg-stone-300 mb-2" />
                    <p className="text-[8px] font-black text-stone-400 uppercase tracking-widest">Director</p>
                  </div>
                </div>
              </div>

              {/* Texture overlays */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/old-map.png')]" />
            </div>
          </motion.div>

          <div className="flex gap-4">
            <button className="flex-1 btn-primary flex items-center justify-center gap-3 py-4 shadow-xl shadow-brand/20">
              <Download size={18} /> 
              <span className="text-[10px] uppercase tracking-widest font-black">Export Vault Credential</span>
            </button>
            <button className="glass px-10 py-4 rounded-xl text-stone-300 font-black text-[10px] uppercase tracking-widest hover:bg-white/5 transition-all flex items-center justify-center gap-3 border border-white/10">
              <Share2 size={18} /> LinkedIn Sync
            </button>
          </div>
        </div>

        {/* Info Column */}
        <div className="lg:col-span-4 space-y-8">
          <div className="glass-card p-10 bg-[#1c140e]/40 border- brand/20">
            <h3 className="text-xs font-black text-white mb-8 flex items-center gap-2 uppercase tracking-[0.3em]">
              <ShieldCheck className="text-emerald-400" size={16} /> Integrity Index
            </h3>
            
            <div className="space-y-6">
              {[
                { label: 'Neural ID Verification', val: 'Verified', color: 'text-emerald-400', tip: "Identity confirmed via biometric neural signature." },
                { label: 'Blockchain Anchor', val: 'Active', color: 'text-brand', tip: "Credential permanently etched into the immutable education ledger." },
                { label: 'Mastery Quorum', val: 'Passed', color: 'text-emerald-400', tip: "Assessment validation threshold exceeded for all core PM domains." },
              ].map((item, idx) => (
                <div 
                  key={idx} 
                  className="flex flex-col gap-1 border-b border-white/5 pb-4 last:border-0 last:pb-0"
                  data-tooltip-id="cert-tooltip"
                  data-tooltip-content={item.tip}
                >
                  <span className="text-[9px] text-stone-500 font-bold uppercase tracking-widest">{item.label}</span>
                  <span className={cn("text-sm font-black italic", item.color)}>{item.val}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-gradient-to-br from-[#d4af37]/10 to-transparent border border-[#d4af37]/20">
            <h4 className="text-[10px] font-black text-[#d4af37] mb-3 uppercase tracking-widest">Mastery Tip</h4>
            <p className="text-xs text-stone-300 leading-relaxed italic">
              "Credentialing is the artifact of the process. The true value lies in the cognitive shift toward project-based thinking."
            </p>
          </div>
        </div>
      </div>
      <Tooltip 
        id="cert-tooltip" 
        style={{ backgroundColor: '#1c140e', color: '#fdfbf7', border: '1px solid #2d241d', padding: '8px 12px', fontSize: '10px', borderRadius: '8px', zIndex: 100 }}
      />
    </div>
  );
}
