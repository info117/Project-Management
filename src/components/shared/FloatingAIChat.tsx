import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, X, Minus, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { askPMTutor } from '../../services/geminiService';
import { cn } from '../../lib/utils';
import Markdown from 'react-markdown';

export function FloatingAIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'model', content: string }[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    const history = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.content }]
    }));

    const response = await askPMTutor(userMsg, history);
    setMessages(prev => [...prev, { role: 'model', content: response || "System error." }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 w-[380px] h-[520px] glass-card flex flex-col shadow-2xl border-orange-500/20 overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 bg-orange-500/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center text-white">
                  <Bot size={18} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-white uppercase tracking-widest">Cognitive Advisor</p>
                  <p className="text-[9px] text-emerald-400 font-bold uppercase">Online</p>
                </div>
              </div>
              <div className="flex gap-1">
                <button onClick={() => setIsOpen(false)} className="p-1.5 text-stone-400 hover:text-white transition-colors">
                  <Minus size={16} />
                </button>
              </div>
            </div>

            {/* Chat Area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-elegant">
              {messages.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-6">
                  <Sparkles size={32} className="text-orange-500/30" />
                  <div className="space-y-2">
                    <p className="text-xs text-stone-500 font-medium italic">Systems primed. Query the cognitive tutor for project management reinforcement.</p>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-2 w-full">
                    {[
                      "Summary: Current Curriculum",
                      "Solve a specific formula",
                      "Explain EMV vs PERT",
                      "Story: Denver Baggage System"
                    ].map((action) => (
                      <button
                        key={action}
                        onClick={() => { setInput(action); }}
                        className="text-[10px] font-bold uppercase tracking-widest p-2.5 rounded-lg bg-white/5 border border-white/10 hover:bg-orange-500/10 hover:border-orange-500/30 text-stone-400 hover:text-orange-400 transition-all text-left"
                      >
                        {action}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {messages.map((m, i) => (
                <div key={i} className={cn("flex", m.role === 'user' ? "justify-end" : "justify-start")}>
                  <div className={cn(
                    "max-w-[85%] p-3 rounded-xl text-[11px] leading-relaxed shadow-sm",
                    m.role === 'user' ? "bg-orange-600 text-white rounded-tr-none" : "bg-white/5 text-stone-300 rounded-tl-none border border-white/5"
                  )}>
                    <Markdown>{m.content}</Markdown>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 p-3 rounded-xl rounded-tl-none border border-white/5 flex gap-1">
                    <div className="w-1 h-1 bg-orange-400 rounded-full animate-bounce"></div>
                    <div className="w-1 h-1 bg-orange-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-1 h-1 bg-orange-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSend(); }}
              className="p-4 border-t border-white/10 bg-white/[0.02]"
            >
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask advisor..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500/50"
                />
                <button 
                  type="submit" 
                  disabled={isLoading || !input.trim()}
                  className="p-2 bg-orange-600 text-white rounded-lg hover:bg-orange-500 disabled:opacity-50"
                >
                  <Send size={16} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-14 h-14 rounded-2xl flex items-center justify-center transition-all shadow-2xl relative",
          isOpen ? "bg-white/10 text-white" : "bg-orange-600 text-white"
        )}
      >
        {isOpen ? <X size={24} /> : <Bot size={28} />}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-stone-950 rounded-full"></span>
        )}
      </motion.button>
    </div>
  );
}
