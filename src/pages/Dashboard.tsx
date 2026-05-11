import React, { useState, useEffect, useMemo } from 'react';
import { BookOpen, Trophy, Clock, Zap, Target, ArrowRight, BrainCircuit, Sparkles, BarChart as BarChartIcon, Activity, User, Video, Award, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useFirebase } from '../contexts/FirebaseContext';
import { db } from '../lib/firebase';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { cn } from '../lib/utils';
import { getPersonalizedAdvice } from '../services/geminiService';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from 'recharts';

export default function Dashboard() {
  const { user, profile } = useFirebase();
  const [progressData, setProgressData] = useState<any[]>([]);
  const [vaultCredentials, setVaultCredentials] = useState<any[]>([]);
  const [aiAdvice, setAiAdvice] = useState<string[]>([]);
  const [isAdviceLoading, setIsAdviceLoading] = useState(false);

  // Sync with 'Course_Progress' (mapped to users/{uid}/progress)
  useEffect(() => {
    if (!user) return;
    
    const progressRef = collection(db, 'users', user.uid, 'progress');
    const q = query(progressRef);
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProgressData(data);
    });

    return () => unsubscribe();
  }, [user]);

  // Sync with 'Vault_Credentials'
  useEffect(() => {
    if (!user) return;
    
    const vaultRef = collection(db, 'users', user.uid, 'vault_credentials');
    const q = query(vaultRef);
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as any[];
      data.sort((a, b) => (b.awardedAt?.seconds || 0) - (a.awardedAt?.seconds || 0));
      setVaultCredentials(data);
    });

    return () => unsubscribe();
  }, [user]);

  useEffect(() => {
    if (progressData.length > 0 && aiAdvice.length === 0) {
      fetchAdvice();
    }
  }, [progressData]);

  const fetchAdvice = async () => {
    setIsAdviceLoading(true);
    const summary = progressData
      .map(p => `Module ${p.moduleId}: ${p.status} (Score: ${p.quizScore || 'N/A'})`)
      .join(', ');
    const result = await getPersonalizedAdvice(summary || "User has just started their journey.");
    setAiAdvice(result.tips);
    setIsAdviceLoading(false);
  };

  const completedModulesCount = progressData.filter(p => p.status === 'Completed').length;
  const avgScore = progressData.length > 0 
    ? Math.round(progressData.reduce((acc, p) => acc + (p.quizScore || 0), 0) / progressData.length)
    : 0;

  // Prepare data for the Bar Chart (Module Scores)
  const barData = useMemo(() => {
    return progressData
      .filter(p => p.quizScore !== undefined)
      .sort((a, b) => (a.moduleId || 0) - (b.moduleId || 0))
      .map(p => ({
        name: `M${p.moduleId}`,
        score: p.quizScore,
      }));
  }, [progressData]);

  // Prepare data for the Radar Chart (PM Knowledge Areas)
  const radarData = useMemo(() => {
    const areas = [
      { subject: 'Initiation', A: 0, fullMark: 100 },
      { subject: 'Planning', A: 0, fullMark: 100 },
      { subject: 'Execution', A: 0, fullMark: 100 },
      { subject: 'Monitoring', A: 0, fullMark: 100 },
      { subject: 'Closing', A: 0, fullMark: 100 },
    ];

    // Simple mapping: Module IDs to Areas
    progressData.forEach(p => {
      if (p.status === 'Completed') {
        const score = p.quizScore || 80;
        if (p.moduleId <= 2) areas[0].A = Math.max(areas[0].A, score);
        if (p.moduleId >= 3 && p.moduleId <= 5) areas[1].A = Math.max(areas[1].A, score);
        if (p.moduleId >= 6 && p.moduleId <= 8) areas[2].A = Math.max(areas[2].A, score);
        if (p.moduleId >= 9 && p.moduleId <= 11) areas[3].A = Math.max(areas[3].A, score);
        if (p.moduleId >= 12) areas[4].A = Math.max(areas[4].A, score);
      }
    });

    return areas;
  }, [progressData]);

  const stats = [
    { label: 'Modules Ready', value: `${completedModulesCount}/13`, icon: BookOpen, color: 'text-orange-400', tip: 'Total modules completed vs total available in the PMBOK 7 curriculum.' },
    { label: 'Growth Factor', value: '1.2x', icon: Zap, color: 'text-amber-400', tip: 'Calculated velocity of knowledge acquisition compared to the platform average.' },
    { label: 'Mastery Index', value: `${avgScore}%`, icon: Trophy, color: 'text-emerald-400', tip: 'Aggregate average score across all completed knowledge assessments.' },
    { label: 'Deep Focus', value: '12.5h', icon: Clock, color: 'text-orange-400', tip: 'Total active learning time recorded in the cognitive focus state.' },
  ];

  return (
    <div className="space-y-10 max-w-7xl mx-auto px-4 sm:px-6 mb-20 transition-all duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h2 className="text-3xl font-black text-white tracking-tighter leading-none mb-3 uppercase">
            System <span className="text-brand">Analytics</span> <span className="text-[10px] text-stone-500 font-mono align-top ml-2">v4.5.1</span>
          </h2>
          <p className="text-[10px] text-stone-500 font-bold uppercase tracking-widest max-w-2xl mt-2 leading-relaxed">
            Project Management AI™ is an AI-powered platform for training and workforce development—helping you upskill talent, track performance, and turn learning into measurable productivity.
          </p>
        </motion.div>
        
        <div className="flex items-center gap-2 px-4 py-2 bg-brand/5 border border-brand/20 rounded-full backdrop-blur-sm">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.8)]"></div>
          <span className="text-[10px] font-black text-brand uppercase tracking-widest">Mastery Node Synchronized</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-6 relative group border-white/5 hover:border-brand/40 overflow-hidden"
            data-tooltip-id="dashboard-tooltip"
            data-tooltip-content={stat.tip}
          >
            <div className="absolute -top-4 -right-4 p-8 opacity-10 group-hover:opacity-20 transition-all group-hover:scale-125 group-hover:rotate-12 duration-700">
              <stat.icon size={80} className={stat.color} />
            </div>
            <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em] mb-1">{stat.label}</p>
            <p className="text-3xl font-black text-white tracking-tighter">{stat.value}</p>
            <div className="mt-4 h-1 w-12 bg-brand/20 rounded-full overflow-hidden">
               <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: '100%' }}
                 transition={{ duration: 1.5, delay: i * 0.1 }}
                 className="h-full bg-brand"
               />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Analytics Charts */}
        <div className="col-span-12 lg:col-span-8 flex flex-col gap-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Quiz Score Distribution */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass p-8 min-h-[350px] flex flex-col"
              data-tooltip-id="dashboard-tooltip"
              data-tooltip-content="Your performance across module quizzes. Higher scores indicate stronger retention."
            >
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-[10px] font-black text-white uppercase tracking-[0.4em] mb-1 flex items-center gap-2">
                    <BarChartIcon size={14} className="text-brand" />
                    Quiz Metrics
                  </h3>
                  <p className="text-[9px] text-slate-500 font-bold">HISTORICAL SCORE VARIANCE</p>
                </div>
              </div>
              
              <div className="flex-1 w-full h-[200px]">
                {barData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={barData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                      <XAxis 
                        dataKey="name" 
                        stroke="#94a3b8" 
                        fontSize={10} 
                        tickLine={false} 
                        axisLine={false} 
                      />
                      <YAxis 
                        stroke="#94a3b8" 
                        fontSize={10} 
                        tickLine={false} 
                        axisLine={false}
                        domain={[0, 100]}
                      />
                      <RechartsTooltip 
                        contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #ffffff10', borderRadius: '12px', fontSize: '10px' }}
                        cursor={{ fill: '#ffffff05' }}
                      />
                      <Bar 
                        dataKey="score" 
                        fill="#6366f1" 
                        radius={[4, 4, 0, 0]} 
                        barSize={20}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                    <Activity size={32} className="mb-2 text-slate-700" />
                    <p className="text-[10px] uppercase font-black text-slate-600">Insufficient Data Points</p>
                  </div>
                )}
              </div>
            </motion.div>

            {/* PM Competency Radar */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="glass p-8 min-h-[350px] flex flex-col"
              data-tooltip-id="dashboard-tooltip"
              data-tooltip-content="Visual representation of your strengths relative to PMBOK 7 knowledge domains."
            >
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-[10px] font-black text-white uppercase tracking-[0.4em] mb-1 flex items-center gap-2">
                    <Activity size={14} className="text-emerald-400" />
                    Competency Radar
                  </h3>
                  <p className="text-[9px] text-slate-500 font-bold">PMBOK 7 ALIGNMENT INDEX</p>
                </div>
              </div>

              <div className="flex-1 w-full h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                    <PolarGrid stroke="#ffffff10" />
                    <PolarAngleAxis 
                      dataKey="subject" 
                      stroke="#94a3b8" 
                      fontSize={10} 
                      tick={{ fill: '#94a3b8', fontWeight: 700 }}
                    />
                    <PolarRadiusAxis 
                      angle={30} 
                      domain={[0, 100]} 
                      tick={false} 
                      axisLine={false} 
                    />
                    <Radar
                      name="User Mastery"
                      dataKey="A"
                      stroke="#818cf8"
                      fill="#818cf8"
                      fillOpacity={0.5}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>

          {/* Cognitive Mastery Path (Visual Roadmap) */}
          <div className="glass-card p-10 flex flex-col relative overflow-hidden group mb-8">
            <div className="absolute top-0 right-0 p-10 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity pointer-events-none">
              <BrainCircuit size={300} />
            </div>
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-4 relative z-10">
              <div>
                <h3 className="text-[10px] font-black text-white uppercase tracking-[0.5em] mb-2 flex items-center gap-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                  >
                    <Target size={16} className="text-brand" />
                  </motion.div>
                  Cognitive Mastery Path
                </h3>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest max-w-md">Synchronous tracking of knowledge architecture progression.</p>
              </div>
              <div className="px-3 py-1 bg-brand/10 border border-brand/20 rounded-lg text-[9px] font-black text-brand uppercase tracking-tighter shadow-lg shadow-brand/10">Neural Map Active</div>
            </div>

            <div className="relative flex items-center justify-between py-10 px-4">
              <div className="absolute h-[1px] w-full bg-slate-800 left-0 top-1/2 -translate-y-1/2 -z-10 bg-gradient-to-r from-transparent via-slate-800 to-transparent"></div>
              
              {[
                { label: 'Initiation', val: completedModulesCount >= 1 ? 100 : 0 },
                { label: 'Planning', val: completedModulesCount >= 2 ? 100 : 25 },
                { label: 'Execution', val: completedModulesCount >= 6 ? 100 : 0 },
                { label: 'Control', val: completedModulesCount >= 9 ? 100 : 0 },
                { label: 'Closing', val: completedModulesCount >= 12 ? 100 : 0 }
              ].map((step, idx) => (
                <div key={idx} className="flex flex-col items-center gap-6 relative group">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={cn(
                      "w-14 h-14 rounded-2xl flex items-center justify-center border-2 transition-all duration-700 relative z-20",
                      step.val === 100 
                        ? "bg-brand/20 border-brand shadow-[0_0_30px_rgba(99,102,241,0.3)] text-brand" 
                        : "bg-slate-900/80 border-slate-800 text-slate-600 grayscale opacity-60"
                    )}
                  >
                    {step.val === 100 ? <Trophy size={24} /> : <Target size={24} />}
                    {step.val === 100 && (
                      <div className="absolute -inset-1 bg-brand/20 blur-xl rounded-full animate-pulse -z-10"></div>
                    )}
                  </motion.div>
                  <div className="text-center absolute top-20 w-32 left-1/2 -translate-x-1/2">
                    <p className="text-[9px] font-black text-white uppercase tracking-[0.2em] mb-2">{step.label}</p>
                    <div className="w-16 h-[2px] bg-white/5 rounded-full overflow-hidden mx-auto">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${step.val}%` }}
                        transition={{ duration: 2, ease: "easeOut" }}
                        className="h-full bg-brand" 
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-24 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 relative z-10">
              <div className="flex items-center gap-5">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-6 h-6 rounded-full border border-slate-950 bg-slate-800 flex items-center justify-center">
                       <User size={10} className="text-slate-500" />
                    </div>
                  ))}
                </div>
                <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest">
                   Join <span className="text-white">4.2k</span> peers on the path
                </p>
              </div>
              <button className="btn-primary flex items-center gap-3 group px-8">
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">Resume Module</span> 
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Vault Credential Section */}
          <div className="glass-card p-10 flex flex-col relative overflow-hidden group mb-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-[10px] font-black text-white uppercase tracking-[0.5em] mb-2 flex items-center gap-2">
                  <Award size={16} className="text-brand" />
                  Vault Credentials
                </h3>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Auto-generated certifications and mastery badges.</p>
              </div>
              <Link to="/certificate" className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[9px] font-black text-white uppercase tracking-tighter hover:bg-brand hover:border-brand transition-all">
                View Full Certificate
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {vaultCredentials.length > 0 ? vaultCredentials.map((cred) => (
                <motion.div 
                  key={cred.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-stone-900/50 border border-white/5 rounded-2xl p-6 flex flex-col items-center text-center group/cred hover:border-brand/30 transition-all"
                >
                  <div className={cn(
                    "w-12 h-12 rounded-full mb-4 flex items-center justify-center transition-all duration-500",
                    cred.type === 'certificate' ? "bg-brand/20 text-brand scale-110" : "bg-orange-500/10 text-orange-400 group-hover/cred:bg-orange-500/20"
                  )}>
                    {cred.type === 'certificate' ? <Award size={24} /> : <Trophy size={20} />}
                  </div>
                  <h4 className="text-[10px] font-black text-white uppercase tracking-tight mb-1">{cred.title}</h4>
                  <p className="text-[8px] text-stone-500 font-bold uppercase tracking-widest">
                    Awarded {cred.awardedAt ? (cred.awardedAt.toDate ? cred.awardedAt.toDate() : new Date(cred.awardedAt)).toLocaleDateString() : 'N/A'}
                  </p>
                  {cred.type === 'certificate' && (
                    <Link to="/certificate" className="mt-4 text-[9px] font-bold text-brand uppercase tracking-widest border-b border-brand/0 hover:border-brand/100 transition-all">
                      Download PDF
                    </Link>
                  )}
                </motion.div>
              )) : (
                <div className="col-span-full py-12 flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-3xl opacity-40">
                  <ShieldCheck size={32} className="text-stone-700 mb-4" />
                  <p className="text-[10px] uppercase font-black text-stone-600 tracking-widest">No Credentials Minted Yet</p>
                </div>
              )}
            </div>
          </div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="group relative h-48 rounded-3xl overflow-hidden cursor-pointer"
          >
            <Link 
              to="/video-lab" 
              className="block w-full h-full"
              data-tooltip-id="dashboard-tooltip"
              data-tooltip-content="Enter the lab to generate custom explanatory videos for PM concepts using Veo."
            >
              <div className="absolute inset-0 bg-gradient-to-r from-brand to-purple-600 opacity-90 group-hover:scale-105 transition-transform duration-700"></div>
              <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/render/1200/400?blur=5')] bg-cover opacity-30 mix-blend-overlay"></div>
              <div className="relative h-full p-10 flex items-center justify-between z-10">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/20 backdrop-blur-md rounded-xl">
                      <Video size={24} className="text-white" />
                    </div>
                    <h3 className="text-2xl font-black text-white tracking-tighter uppercase">Visual Concept <span className="text-white/60">Engine</span></h3>
                  </div>
                  <p className="text-white/80 font-bold text-xs uppercase tracking-widest">Synthesize high-fidelity explanatory videos via Veo Intelligence</p>
                </div>
                <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 group-hover:bg-white/20 transition-all">
                   <ArrowRight className="text-white group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          </motion.div>
        </div>

        {/* Sidebar / Insights Panel */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-8">
          
          {/* Gemini AI Intelligence Section */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-stone-950/40 border-2 border-orange-500/20 rounded-3xl p-8 flex flex-col relative overflow-hidden group shadow-2xl transition-all hover:border-brand/40"
            data-tooltip-id="dashboard-tooltip"
            data-tooltip-content="Personalized advice generated by Gemini based on your recent activity."
          >
            <div className="absolute top-0 right-0 p-6 pointer-events-none">
              <Sparkles size={24} className="text-brand animate-pulse" />
            </div>
            
            <h3 className="text-[10px] font-black text-white mb-8 uppercase tracking-[0.5em] flex items-center gap-2">
               AI Insight Engine
            </h3>

            <div className="space-y-6 flex-1">
              <AnimatePresence mode="wait">
                {isAdviceLoading ? (
                  <motion.div 
                    key="loading" 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    {[1, 2].map(i => (
                      <div key={i} className="h-20 bg-white/5 rounded-2xl animate-pulse"></div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div 
                    key="advice" 
                    initial={{ opacity: 0, y: 10 }} 
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    {aiAdvice.length > 0 ? aiAdvice.map((tip, idx) => (
                      <div key={idx} className="p-5 rounded-2xl bg-brand/5 border border-white/5 hover:bg-brand/10 hover:border-brand/20 transition-all duration-300">
                        <div className="flex gap-4">
                           <div className="mt-1 w-5 h-5 rounded-lg bg-brand/20 flex items-center justify-center text-[10px] font-black text-brand flex-shrink-0">
                             {idx + 1}
                           </div>
                           <p className="text-[11px] text-slate-300 leading-relaxed font-medium">
                             {tip}
                           </p>
                        </div>
                      </div>
                    )) : (
                      <div className="p-10 text-center border-2 border-dashed border-white/5 rounded-3xl opacity-50">
                        <BrainCircuit size={32} className="mx-auto mb-4 text-slate-700" />
                        <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest leading-loose">
                           Awaiting node activity.<br/>Initial analysis pending.
                        </p>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              <button 
                onClick={fetchAdvice}
                disabled={isAdviceLoading}
                className="w-full mt-6 py-4 rounded-2xl border border-white/5 hover:border-brand/40 hover:bg-brand/5 transition-all text-[9px] font-black text-slate-500 hover:text-brand uppercase tracking-[0.3em] flex items-center justify-center gap-2 group"
              >
                Sync Insight Node <ArrowRight size={10} className="group-hover:translate-x-1 transition-all" />
              </button>
            </div>
          </motion.div>

          {/* Subscription CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-8 bg-gradient-to-br from-brand/20 to-purple-600/10 border-brand/30 relative overflow-hidden group shadow-2xl"
          >
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand/20 blur-[60px] rounded-full group-hover:scale-150 transition-transform duration-1000"></div>
            
            <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-brand rounded-xl shadow-lg shadow-brand/30">
                  <Zap size={20} className="text-white" />
                </div>
                <h3 className="text-xl font-black text-white tracking-tighter uppercase leading-none">Unlock <span className="text-brand">Pro</span></h3>
              </div>
              
              <p className="text-[11px] text-stone-300 font-medium leading-relaxed">
                Maximize your trajectory with unlimited AI Tutor access, premium video synthesis, and verified PMBOK 7 certification.
              </p>

              <Link to="/subscription" className="block">
                <button className="w-full bg-brand hover:bg-brand-hover text-white py-4 rounded-xl font-black uppercase text-[10px] tracking-[0.2em] transition-all shadow-xl shadow-brand/20 hover:scale-[1.02]">
                  Upgrade Journey
                </button>
              </Link>
              
              <p className="text-center text-[9px] text-stone-500 font-bold uppercase tracking-widest">
                Starting at $9.99 / mo
              </p>
            </div>
          </motion.div>

          {/* Curriculum Quick Status */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-10"
          >
            <h3 className="text-[10px] font-black text-white mb-10 uppercase tracking-[0.5em]">Knowledge Stack</h3>
            <div className="space-y-8">
              {[
                { name: 'Predictive Lifecycle', status: 'Mastered', val: 100, color: 'bg-emerald-500 shadow-emerald-500/20' },
                { name: 'Cost Management', status: 'In Sync', val: 45, color: 'bg-brand shadow-brand/20' },
                { name: 'Risk Integration', status: 'Offline', val: 0, color: 'bg-slate-800' },
              ].map((item, idx) => (
                <div key={idx} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-slate-400 font-bold uppercase tracking-tight">{item.name}</span>
                    <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">{item.status}</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${item.val}%` }}
                      transition={{ duration: 1.5, delay: 0.3 + (idx * 0.1) }}
                      className={cn("h-full rounded-full transition-all duration-1000 shadow-[0_0_10px]", item.color)} 
                    />
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-12 py-4 border border-white/5 bg-white/[0.02] rounded-2xl text-[9px] font-black text-white uppercase tracking-[0.4em] hover:bg-brand hover:border-brand transition-all shadow-xl hover:shadow-brand/20">
              Access Full Roadmap
            </button>
          </motion.div>
        </div>
      </div>
      <ReactTooltip 
        id="dashboard-tooltip" 
        style={{ backgroundColor: '#0f172a', color: '#f1f5f9', border: '1px solid #1e293b', padding: '8px 12px', fontSize: '10px', borderRadius: '8px', zIndex: 100 }}
      />
    </div>
  );
}
