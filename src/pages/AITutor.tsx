import React from 'react';
import { Brain, Zap, Target, BookOpen, MessageCircle, BrainCircuit, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/src/lib/utils';

const insights = [
  { 
    title: 'Weak Spot: Critical Path Method', 
    reason: 'Multi-pause detected in Module 3.', 
    action: 'Reinforcement Mode', 
    type: 'critical',
    recommendation: 'CPM is like a tightrope walk—one slip in a task delays the entire show.'
  },
  { 
    title: 'Mastery: Project Initiation', 
    reason: '100% quiz accuracy achieved.', 
    action: 'Content Unlocked', 
    type: 'success',
    recommendation: 'Unlock: Complex Stakeholder Matrices for Infrastructure Projects.'
  }
];

export default function AITutor() {
  const navigate = useNavigate();
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-white uppercase tracking-tight">AI Personal Mentor</h2>
          <p className="text-xs text-stone-400">Cognitive reinforcement & real-time PM strategy insights.</p>
        </div>
        <div className="flex gap-2">
          <div className="px-3 py-1 bg-orange-500/10 border border-orange-500/20 rounded-full text-[10px] font-bold text-orange-400 uppercase tracking-widest animate-pulse">
            Neural Sync Active
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          {insights.map((insight, i) => (
            <motion.div
              key={insight.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={cn(
                "bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 space-y-6",
                insight.type === 'critical' ? "border-l-orange-500" : "border-l-emerald-500"
              )}
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "p-2 rounded-lg",
                    insight.type === 'critical' ? "bg-orange-500/10 text-orange-400" : "bg-emerald-500/10 text-emerald-400"
                  )}>
                    {insight.type === 'critical' ? <Zap size={20} /> : <Target size={20} />}
                  </div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">{insight.title}</h3>
                </div>
                <span className={cn(
                  "text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded",
                  insight.type === 'critical' ? "bg-orange-500/20 text-orange-400" : "bg-emerald-500/20 text-emerald-400"
                )}>
                  {insight.action}
                </span>
              </div>
              <p className="text-xs text-stone-400 leading-relaxed font-medium italic border-l border-white/10 pl-4 py-1">
                "{insight.recommendation}"
              </p>
              <div className="flex gap-3 pt-2">
                <button className="btn-primary uppercase">Explore Now</button>
                <button className="btn-secondary uppercase">Ignore</button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-col gap-6">
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-orange-500/10 text-orange-400">
                <BrainCircuit size={20} />
              </div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Cognitive Mapping</h3>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between text-[10px] uppercase font-bold tracking-widest mb-1">
                <span className="text-stone-500">Domain Retention</span>
                <span className="text-orange-400">92%</span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden p-0.5 border border-white/5">
                <div className="h-full bg-orange-500 w-[92%] rounded-full shadow-[0_0_10px_orange]"></div>
              </div>
              <p className="text-[10px] text-stone-500 font-medium italic text-center">
                "Initiation mastery reached top 5% threshold."
              </p>
            </div>
          </div>

          <div className="bg-stone-900/60 border border-orange-500/30 rounded-2xl p-8 relative overflow-hidden group flex-1">
            <h3 className="text-sm font-bold text-white mb-6 uppercase tracking-widest flex items-center gap-2">
              <MessageCircle size={18} className="text-orange-400" />
              Direct Mentor Query
            </h3>
            <div className="space-y-4">
              {[
                "Explain CPM formulas in detail",
                "How to mitigate risk on budget?",
                "Agile vs. Waterfall in SaaS",
              ].map((prompt) => (
                <button 
                  key={prompt}
                  onClick={() => navigate(`/chatbot?q=${encodeURIComponent(prompt)}`)}
                  className="w-full text-left p-4 rounded-xl bg-white/5 border border-white/5 hover:border-orange-500/40 transition-all text-xs text-stone-300 font-bold group flex justify-between items-center"
                >
                  <span className="group-hover:text-orange-400">{prompt}</span>
                  <ArrowRight size={14} className="text-orange-500 opacity-0 group-hover:opacity-100 transition-all" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
