import { Bell, Search, UserCircle } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

export function Navbar() {
  return (
    <header className="h-16 border-b border-white/10 glass flex items-center justify-between px-8 z-50">
      <div className="flex items-center gap-8">
        <h1 className="text-sm font-bold text-white tracking-[0.2em]">Project Management AI<sup>®</sup></h1>
        
        <div className="hidden md:flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 min-w-[300px]">
          <Search size={14} className="text-stone-500" />
          <input 
            type="text" 
            placeholder="Search competencies..." 
            className="bg-transparent border-none text-xs text-white focus:outline-none w-full placeholder:text-stone-500" 
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <ThemeToggle />
        
        <button className="relative p-2 text-stone-400 hover:text-white transition-colors">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
        </button>

        <div className="flex items-center gap-3 pl-6 border-l border-white/10">
          <div className="text-right hidden sm:block">
            <p className="text-[10px] font-bold text-white uppercase tracking-tighter">Alex Rivera</p>
            <p className="text-[9px] text-stone-500 font-bold uppercase">Learning Path: Level 4</p>
          </div>
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-orange-500 to-amber-600 p-0.5 overflow-hidden">
            <img 
              src="https://picsum.photos/seed/alex/64/64" 
              alt="Avatar" 
              className="w-full h-full object-cover rounded-[10px]" 
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
