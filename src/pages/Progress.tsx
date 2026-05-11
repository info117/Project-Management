import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Target, TrendingUp, Award, Clock, Brain } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const data = [
  { name: 'Mon', hours: 2.1 },
  { name: 'Tue', hours: 4.5 },
  { name: 'Wed', hours: 1.8 },
  { name: 'Thu', hours: 3.2 },
  { name: 'Fri', hours: 5.1 },
  { name: 'Sat', hours: 4.8 },
  { name: 'Sun', hours: 3.0 },
];

const topicPerformance = [
  { topic: 'Initiation', score: 95 },
  { topic: 'Planning', score: 45 },
  { topic: 'Cost', score: null },
  { topic: 'Agile', score: null },
];

export default function ProgressPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1 uppercase tracking-tight">Performance Analytics</h2>
        <p className="text-xs text-stone-400">Deep dive into your cognitive growth and subject mastery.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-xl">
          <h3 className="text-sm font-bold text-white mb-6 uppercase tracking-widest">Weekly Learning Time</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                <XAxis dataKey="name" stroke="#78716c" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#78716c" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1c140e', border: '1px solid #ffffff10', borderRadius: '12px', fontSize: '12px' }}
                  itemStyle={{ color: '#fb923c', fontWeight: 'bold' }}
                  cursor={{ fill: '#ffffff05' }}
                />
                <Bar dataKey="hours" fill="#c2410c" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-xl">
          <h3 className="text-sm font-bold text-white mb-6 uppercase tracking-widest">Topic Mastery</h3>
          <div className="space-y-6">
            {topicPerformance.map((item) => (
              <div key={item.topic}>
                <div className="flex justify-between text-[10px] font-bold uppercase mb-2">
                  <span className="text-stone-400 tracking-widest">{item.topic}</span>
                  <span className="text-white">{item.score ? `${item.score}%` : '0%'}</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden p-0.5 border border-white/5">
                  <div 
                    className="h-full bg-gradient-to-r from-orange-500 to-amber-600 rounded-full transition-all duration-1000" 
                    style={{ width: `${item.score || 0}%` }} 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        {[
          { label: 'Growth Rate', value: '+12.5%', icon: TrendingUp, color: 'text-orange-400' },
          { label: 'Avg Session', value: '42 Min', icon: Clock, color: 'text-orange-400' },
          { label: 'Retention', value: '92/100', icon: Target, color: 'text-orange-400' },
        ].map((kpi, i) => (
          <div key={kpi.label} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 relative group hover:border-orange-500/30 transition-all">
            <div className="flex items-center gap-4 mb-4">
              <div className={cn("p-2 rounded-lg bg-white/5 shadow-sm", kpi.color)}>
                <kpi.icon size={20} />
              </div>
              <h4 className="text-[10px] font-bold text-white uppercase tracking-[0.2em]">{kpi.label}</h4>
            </div>
            <p className="text-2xl font-bold text-white mb-1 tracking-tight">{kpi.value}</p>
            <p className="text-[10px] text-stone-500 uppercase tracking-widest font-bold">Industry Benchmark: 85%</p>
          </div>
        ))}
      </div>
    </div>
  );
}
