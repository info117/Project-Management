import React from 'react';
import { Sun, Moon, Sparkles } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { motion } from 'motion/react';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all group relative overflow-hidden"
      title="Switch Theme"
    >
      <motion.div
        animate={{ y: theme === 'elegant' ? 0 : theme === 'midnight' ? -40 : -80 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="flex flex-col items-center gap-6"
      >
        <Sparkles size={20} className="text-orange-400" />
        <Moon size={20} className="text-amber-700" />
        <Sun size={20} className="text-amber-400" />
      </motion.div>
      
      {/* Tooltip / Label */}
      <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[8px] font-bold uppercase tracking-widest text-stone-500 opacity-0 group-hover:opacity-100 transition-opacity">
        {theme}
      </span>
    </button>
  );
}
