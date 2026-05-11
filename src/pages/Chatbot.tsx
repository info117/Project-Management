import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Sparkles, MoreVertical } from 'lucide-react';
import { askPMTutor, SubscriptionInfo } from '../services/geminiService';
import { useFirebase } from '../contexts/FirebaseContext';
import { motion, AnimatePresence } from 'motion/react';
import { useSearchParams } from 'react-router-dom';
import { cn } from '@/src/lib/utils';
import Markdown from 'react-markdown';

interface Message {
  role: 'user' | 'model';
  content: string;
}

export default function ChatbotPage() {
  const { trialStatus, profile } = useFirebase();
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', content: "Hello! I am **Tutor Brain**, your specialized Cognitive Advisor. I can summarize our **Course Modules**, guide you through complex **PM Formulas**, or narrate real-world **Case Studies** like the Sydney Opera House. How can I facilitate your mastery today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const query = searchParams.get('q');
    if (query && messages.length === 1) {
      handleSend(query);
    }
  }, [searchParams]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (customInput?: string) => {
    const textToSend = customInput || input.trim();
    if (!textToSend || isLoading) return;

    if (!customInput) setInput('');
    setMessages(prev => [...prev, { role: 'user', content: textToSend }]);
    setIsLoading(true);

    const history = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.content }]
    }));

    const subInfo: SubscriptionInfo = {
      status: profile?.subscriptionStatus === 'active' ? 'SUBSCRIBED' : (trialStatus.isExpired ? 'EXPIRED' : 'TRIAL'),
      daysLeft: trialStatus.daysLeft
    };

    const response = await askPMTutor(textToSend, history, subInfo);
    
    setMessages(prev => [...prev, { role: 'model', content: response || "System link interrupted." }]);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-160px)] max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white uppercase tracking-tight">Cognitive PM Advisor</h2>
          <p className="text-xs text-slate-400">Summaries • Formula Strategy • Technical Case Studies</p>
        </div>
        <div className="flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 px-4 py-2 rounded-full">
          <Sparkles size={14} className="text-orange-400" />
          <span className="text-[10px] font-bold text-orange-400 uppercase tracking-[0.2em]">Neural Sync Active</span>
        </div>
      </div>

      <div className="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
        {[
          "Summary: Module 4 (Monitoring)",
          "Step-by-step EVM Calculation",
          "Case Study: Denver Baggage System",
          "What is critical path float?",
          "Explain Agile vs Waterfall",
          "Study guide for Initiation"
        ].map(query => (
          <button
            key={query}
            onClick={() => setInput(query)}
            className="whitespace-nowrap px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-stone-400 hover:text-orange-400 hover:border-orange-500/30 transition-all uppercase tracking-widest"
          >
            {query}
          </button>
        ))}
      </div>

      <div className="flex-1 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl flex flex-col overflow-hidden shadow-2xl relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-500"></div>
        
        {/* Chat Header */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-500/10 rounded-xl flex items-center justify-center text-orange-400 border border-orange-500/20">
              <Bot size={22} className="animate-bounce" />
            </div>
            <div>
              <h2 className="text-xs font-bold text-white uppercase tracking-widest">Cognitive Tutor</h2>
              <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-tighter flex items-center gap-1">
                <span className="w-1 h-1 bg-emerald-400 rounded-full animate-pulse"></span>
                Network Online
              </p>
            </div>
          </div>
          <button className="p-2 text-stone-500 hover:text-white transition-colors">
            <MoreVertical size={18} />
          </button>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-6 scroll-smooth scrollbar-elegant">
          <AnimatePresence initial={false}>
            {messages.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={cn(
                  "flex group",
                  m.role === 'user' ? "justify-end" : "justify-start"
                )}
              >
                <div className={cn(
                  "max-w-[75%] p-5 rounded-2xl text-sm leading-relaxed transition-all",
                  m.role === 'user' 
                    ? "bg-orange-600 text-white rounded-tr-none shadow-lg shadow-orange-900/20" 
                    : "bg-white/5 text-stone-300 rounded-tl-none border border-white/5 font-medium group-hover:bg-white/10"
                )}>
                  <div className="prose prose-invert prose-sm max-w-none">
                    <Markdown>{m.content}</Markdown>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {isLoading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
              <div className="bg-white/5 p-5 rounded-2xl rounded-tl-none border border-white/5 flex gap-1.5 items-center">
                <div className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-bounce"></div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Input */}
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSend(); }} 
          className="p-6 border-t border-white/10 bg-white/[0.02]"
        >
          <div className="flex gap-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Query your personal PM mentor..."
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-sm text-white placeholder:text-stone-500 focus:outline-none focus:border-orange-500/50 transition-all font-medium"
            />
            <button 
              type="submit" 
              disabled={isLoading || !input.trim()}
              className="p-4 bg-orange-600 text-white rounded-xl hover:bg-orange-500 disabled:opacity-50 disabled:hover:bg-orange-600 transition-all shadow-lg shadow-orange-900/40"
            >
              <Send size={22} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
