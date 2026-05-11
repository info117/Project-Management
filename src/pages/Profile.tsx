import React from 'react';
import { UserCircle, Mail, Phone, Shield, BadgeCheck, Camera, Globe, Star } from 'lucide-react';
import { useFirebase } from '../contexts/FirebaseContext';
import { cn } from '@/src/lib/utils';

export default function ProfilePage() {
  const { user, profile } = useFirebase();

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="relative">
        <div className="h-48 rounded-3xl bg-gradient-to-r from-orange-600/20 via-amber-600/20 to-stone-500/10 border border-white/5 overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:40px_40px]" />
        </div>
        
        <div className="absolute -bottom-12 left-8 flex items-end gap-6">
          <div className="relative group">
            <div className="w-32 h-32 rounded-3xl glass border-4 border-bg-deep overflow-hidden">
              <img 
                src={user.photoURL || `https://picsum.photos/seed/${user.uid}/128/128`} 
                alt="Profile" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <button className="absolute bottom-2 right-2 p-2 bg-orange-600 rounded-xl text-white shadow-lg shadow-orange-900/40 hover:bg-orange-500 transition-all">
              <Camera size={16} />
            </button>
          </div>
          <div className="mb-4">
            <h2 className="text-3xl font-bold text-white flex items-center gap-2">
              {profile?.fullName || user.displayName} <BadgeCheck className="text-orange-400" size={24} />
            </h2>
            <p className="text-stone-400">Project Management Student • Level {profile?.level || 1}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-12">
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card p-8">
            <h3 className="text-xl font-bold text-white mb-6">Personal Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1">
                <p className="text-xs text-stone-500 uppercase flex items-center gap-2 font-bold">
                  <Mail size={12} /> Email Address
                </p>
                <p className="text-white">{user.email}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-stone-500 uppercase flex items-center gap-2 font-bold">
                  <Phone size={12} /> Contact Number
                </p>
                <p className="text-white">{profile?.phone || 'Not provided'}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-stone-500 uppercase flex items-center gap-2 font-bold">
                  <Globe size={12} /> Timezone
                </p>
                <p className="text-white">Detecting...</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-stone-500 uppercase flex items-center gap-2 font-bold">
                  <Shield size={12} /> Verification Status
                </p>
                <div className={cn(
                  "flex items-center gap-1.5 text-sm font-bold",
                  profile?.verifiedStatus ? "text-emerald-400" : "text-amber-400"
                )}>
                  {profile?.verifiedStatus ? <BadgeCheck size={14} /> : <Shield size={14} />}
                  {profile?.verifiedStatus ? "ID Matches Profile Name" : "Pending Verification"}
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card p-8">
            <h3 className="text-xl font-bold text-white mb-6">Bio & Goals</h3>
            <p className="text-stone-400 leading-relaxed">
              Passionate professional transitioning into technical project management. 
              Currently focusing on Agile methodologies and Earned Value Management (EVM). 
              Looking to achieve PMP certification by end of year.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-card p-6">
            <h3 className="text-lg font-bold text-white mb-4">Competency Radar</h3>
            <div className="space-y-4">
              {[
                { skill: 'Strategy', level: 85 },
                { skill: 'Leadership', level: 92 },
                { skill: 'Technical', level: 64 },
                { skill: 'Processes', level: 78 },
              ].map((s) => (
                <div key={s.skill} className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-stone-400">{s.skill}</span>
                    <span className="text-orange-400 font-bold">{s.level}%</span>
                  </div>
                  <div className="w-full bg-white/5 h-1 rounded-full">
                    <div 
                      className="bg-orange-500 h-full" 
                      style={{ width: `${s.level}%` }} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-6 border-l-4 border-l-orange-500">
            <h3 className="text-lg font-bold text-white mb-2 underline decoration-orange-500/50">Next Recognition</h3>
            <p className="text-xs text-stone-400 mb-4">You are only 250 XP away from the "WBS Wizard" badge.</p>
            <div className="flex justify-center p-4 bg-white/5 rounded-2xl border border-white/5">
              <Star className="text-orange-500 animate-pulse" size={48} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
