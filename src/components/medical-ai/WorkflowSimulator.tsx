
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  Users, Activity, Timer, Zap, ArrowRight, 
  UserRound, HeartPulse, Building2, TrendingUp 
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, Cell 
} from 'recharts';

export function WorkflowSimulator() {
  const [patients, setPatients] = useState<any[]>([]);
  const [efficiency, setWorkflowEfficiency] = useState(72);
  const [stats, setStats] = useState([
    { name: 'Triage', count: 12, capacity: 20 },
    { name: 'Consult', count: 8, capacity: 10 },
    { name: 'Imaging', count: 5, capacity: 5 },
    { name: 'Observation', count: 18, capacity: 30 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate patient arrival
      if (Math.random() > 0.7) {
        const id = Math.random().toString(36).substr(2, 9);
        setPatients(prev => [...prev, { id, status: 'triage', priority: Math.floor(Math.random() * 3) + 1 }]);
      }

      // Simulate movement through workflow
      setPatients(prev => {
        const updated = prev.map(p => {
          if (p.status === 'triage' && Math.random() > 0.8) return { ...p, status: 'consult' };
          if (p.status === 'consult' && Math.random() > 0.9) return { ...p, status: 'imaging' };
          return p;
        });
        return updated.slice(-20); // Keep last 20 for performance
      });

      // Fluctuate efficiency
      setWorkflowEfficiency(prev => {
        const delta = (Math.random() - 0.5) * 5;
        return Math.min(100, Math.max(40, prev + delta));
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center border border-secondary/40">
          <Building2 className="text-secondary w-5 h-5" />
        </div>
        <div>
          <h3 className="text-xl font-headline font-bold text-white uppercase tracking-widest">AI Hospital Workflow Simulator</h3>
          <p className="text-[10px] font-mono text-secondary opacity-70 italic">MODE: REAL_TIME_THROUGHPUT_ANALYSIS</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Real-time Patient Queue Visualization */}
        <div className="lg:col-span-8 space-y-6">
          <Card className="bg-black/40 border-white/5 rounded-3xl p-8 relative overflow-hidden h-full">
            <div className="flex justify-between items-center mb-8">
              <h4 className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">Active Patient Flow</h4>
              <div className="flex gap-4">
                <div className="flex items-center gap-2 text-[10px] font-mono text-emerald-400">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" /> TRIAGE
                </div>
                <div className="flex items-center gap-2 text-[10px] font-mono text-blue-400">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" /> CONSULT
                </div>
              </div>
            </div>

            <div className="relative h-64 border-l border-white/10 ml-4 flex items-center">
              <AnimatePresence>
                <div className="flex flex-wrap gap-4 px-8">
                  {patients.map((patient, i) => (
                    <motion.div
                      key={patient.id}
                      initial={{ opacity: 0, scale: 0.5, x: -20 }}
                      animate={{ opacity: 1, scale: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.5, x: 100 }}
                      className={`w-10 h-10 rounded-2xl flex items-center justify-center border transition-colors ${
                        patient.status === 'triage' 
                          ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400' 
                          : 'bg-blue-500/10 border-blue-500/40 text-blue-400'
                      }`}
                    >
                      <UserRound className="w-5 h-5" />
                    </motion.div>
                  ))}
                </div>
              </AnimatePresence>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4 border-t border-white/5 pt-8">
              <div className="space-y-1">
                <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-tighter">Avg Wait Time</span>
                <p className="text-xl font-bold text-white font-headline">14.2<span className="text-[10px] text-neutral-500 ml-1">MIN</span></p>
              </div>
              <div className="space-y-1">
                <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-tighter">Throughput</span>
                <p className="text-xl font-bold text-white font-headline">22.5<span className="text-[10px] text-neutral-500 ml-1">P/HR</span></p>
              </div>
              <div className="space-y-1 text-right">
                <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-tighter">Bottle-neck</span>
                <p className="text-sm font-bold text-secondary uppercase font-headline">IMAGING_WING</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Efficiency Analytics */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="bg-gradient-to-br from-secondary/10 via-black to-black border border-secondary/20 rounded-3xl p-8 space-y-8 h-full">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="text-[10px] font-mono text-secondary uppercase tracking-widest">Workflow Efficiency</h4>
                <TrendingUp className="w-4 h-4 text-secondary" />
              </div>
              <div className="flex items-end gap-2">
                <span className="text-5xl font-bold text-white font-headline">{efficiency.toFixed(0)}</span>
                <span className="text-xl text-secondary font-bold mb-1">%</span>
              </div>
              <Progress value={efficiency} className="h-2 bg-secondary/10" />
            </div>

            <div className="space-y-6">
              <h4 className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">Resource Allocation</h4>
              <div className="space-y-4">
                {stats.map((s) => (
                  <div key={s.name} className="space-y-2">
                    <div className="flex justify-between items-center text-[10px] font-mono">
                      <span className="text-neutral-400">{s.name}</span>
                      <span className="text-white">{s.count}/{s.capacity}</span>
                    </div>
                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-white/40" 
                        style={{ width: `${(s.count/s.capacity) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-white/10">
              <button className="w-full py-3 rounded-2xl bg-secondary/10 border border-secondary/40 text-secondary font-bold text-xs hover:bg-secondary hover:text-black transition-all flex items-center justify-center gap-2 group">
                <Zap className="w-3 h-3" />
                OPTIMIZE WORKFLOW
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
