import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, X, ArrowRight, Award, Brain } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

interface QuizComponentProps {
  questions: Question[];
  onComplete: (score: number) => void;
  onClose: () => void;
  title: string;
}

export function QuizComponent({ questions, onComplete, onClose, title }: QuizComponentProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const currentQuestion = questions[currentIdx];

  const handleSubmit = () => {
    if (selectedOption === null) return;
    setIsSubmitted(true);
    if (selectedOption === currentQuestion.correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx === questions.length - 1) {
      setShowResult(true);
      onComplete(score + (selectedOption === currentQuestion.correctAnswer ? 1 : 0));
    } else {
      setCurrentIdx(prev => prev + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
    }
  };

  if (showResult) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center p-8 bg-stone-900 border border-white/10 rounded-2xl text-center space-y-6"
      >
        <div className="w-20 h-20 bg-orange-500/20 rounded-full flex items-center justify-center text-orange-500">
          <Award size={40} />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white uppercase tracking-tighter">Assessment Complete</h2>
          <p className="text-stone-400">You scored {score} out of {questions.length} ({percentage}%)</p>
        </div>
        
        <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            className="h-full bg-orange-500"
          />
        </div>

        <button 
          onClick={onClose}
          className="w-full py-3 bg-white text-black font-black uppercase tracking-widest text-xs rounded-xl hover:bg-orange-500 hover:text-white transition-all"
        >
          Return to Lesson
        </button>
      </motion.div>
    );
  }

  return (
    <div className="space-y-8 p-1">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center text-orange-500">
            <Brain size={18} />
          </div>
          <div>
            <p className="text-[9px] font-black text-stone-500 uppercase tracking-widest">Question {currentIdx + 1} of {questions.length}</p>
            <h3 className="text-sm font-bold text-white uppercase tracking-tight">{title}</h3>
          </div>
        </div>
        <button onClick={onClose} className="text-stone-500 hover:text-white"><X size={20} /></button>
      </div>

      <div className="space-y-6">
        <h4 className="text-lg font-medium text-stone-200 leading-snug">
          {currentQuestion.question}
        </h4>

        <div className="grid gap-3">
          {currentQuestion.options.map((option, idx) => {
            const isCorrect = idx === currentQuestion.correctAnswer;
            const isSelected = idx === selectedOption;
            
            let variantClass = "border-white/5 bg-white/5 text-stone-400 hover:bg-white/10";
            if (isSubmitted) {
              if (isCorrect) variantClass = "border-green-500/50 bg-green-500/10 text-green-400";
              else if (isSelected) variantClass = "border-red-500/50 bg-red-500/10 text-red-400";
            } else if (isSelected) {
              variantClass = "border-orange-500/50 bg-orange-500/10 text-white";
            }

            return (
              <button
                key={idx}
                disabled={isSubmitted}
                onClick={() => setSelectedOption(idx)}
                className={cn(
                  "w-full p-4 text-left border rounded-xl text-sm transition-all flex items-center justify-between group",
                  variantClass
                )}
              >
                <span>{option}</span>
                {isSubmitted && isCorrect && <Check size={16} className="text-green-500" />}
                {isSubmitted && isSelected && !isCorrect && <X size={16} className="text-red-500" />}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex justify-end gap-4">
        {isSubmitted ? (
          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-6 py-3 bg-orange-500 text-white text-xs font-black uppercase tracking-widest rounded-xl hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/20"
          >
            {currentIdx === questions.length - 1 ? 'Finish Assessment' : 'Next Question'}
            <ArrowRight size={16} />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={selectedOption === null}
            className="px-8 py-3 bg-white disabled:bg-stone-800 disabled:text-stone-500 text-black text-xs font-black uppercase tracking-widest rounded-xl hover:bg-orange-500 hover:text-white transition-all"
          >
            Submit Answer
          </button>
        )}
      </div>
    </div>
  );
}
