import React from 'react';
import { PM_MODULES } from '../constants/courseData';
import { Lock, CheckCircle2, PlayCircle, Clock, BookOpen } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';
import { useNavigate } from 'react-router-dom';

export default function CoursesPage() {
  const navigate = useNavigate();

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1 uppercase tracking-tight">Curriculum</h2>
        <p className="text-xs text-stone-400 max-w-2xl mt-1 leading-relaxed">
          Project Management AI™ is an AI-powered platform for training and workforce development—helping you upskill talent, track performance, and turn learning into measurable productivity.
        </p>
</div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {PM_MODULES.map((module, i) => (
          <motion.div
            key={module.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className={cn(
              "glass-card group relative p-6 flex flex-col h-full cursor-pointer",
              module.status === 'locked' && "opacity-50 grayscale"
            )}
            onClick={() => module.status !== 'locked' && navigate(`/courses/${module.id}`)}
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-[10px] text-orange-400 font-bold uppercase tracking-widest mb-1">Module {module.id.toString().padStart(2, '0')}</p>
                <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors uppercase tracking-tight">{module.title}</h3>
              </div>
              <div className={cn(
                "p-2 rounded-lg bg-white/5",
                module.status === 'completed' ? "text-emerald-400" : 
                module.status === 'in-progress' ? "text-orange-400" : "text-stone-500"
              )}>
                {module.status === 'completed' ? <CheckCircle2 size={20} /> : 
                 module.status === 'locked' ? <Lock size={20} /> : <BookOpen size={20} />}
              </div>
            </div>

            <p className="text-xs text-stone-400 line-clamp-2 mb-6 leading-relaxed flex-1">
              {module.description}
            </p>

            <div className="space-y-4">
              <div className="flex justify-between text-[10px] uppercase font-bold tracking-widest">
                <span className="text-stone-500">Mastery</span>
                <span className="text-white">{module.progress}%</span>
              </div>
              <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden p-0.5 border border-white/5">
                <div 
                  className={cn(
                    "h-full transition-all duration-1000 rounded-full",
                    module.status === 'completed' ? "bg-emerald-500" : "bg-gradient-to-r from-orange-500 to-amber-600"
                  )} 
                  style={{ width: `${module.progress}%` }} 
                />
              </div>

              <div className="flex items-center gap-4 pt-2">
                <div className="flex items-center gap-1.5 text-[10px] text-stone-500 font-bold uppercase tracking-widest">
                  <Clock size={12} /> {module.duration}
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-stone-500 font-bold uppercase tracking-widest">
                  <BookOpen size={12} /> {module.lessons} Lessons
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
