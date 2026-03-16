
'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { 
  Camera, Eye, Activity, Brain, ShieldCheck, 
  RefreshCcw, AlertTriangle, Zap, Target 
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, 
  ResponsiveContainer, CartesianGrid, Tooltip 
} from 'recharts';

export function NeuroScreening() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [metrics, setMetrics] = useState<any[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const getPermission = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setHasPermission(true);
        if (videoRef.current) videoRef.current.srcObject = stream;
      } catch (err) {
        setHasPermission(false);
        toast({
          variant: 'destructive',
          title: 'Camera Required',
          description: 'Neurological screening simulation requires camera access.',
        });
      }
    };
    getPermission();
    return () => {
      if (videoRef.current?.srcObject) {
        (videoRef.current.srcObject as MediaStream).getTracks().forEach(t => t.stop());
      }
    };
  }, [toast]);

  // Simulate real-time metric generation
  useEffect(() => {
    if (!isScanning) return;
    const interval = setInterval(() => {
      setMetrics(prev => [
        ...prev.slice(-19),
        {
          time: new Date().toLocaleTimeString(),
          tremor: Math.random() * 2 + 0.5,
          symmetry: Math.random() * 5 + 95,
          blink: Math.random() > 0.8 ? 1 : 0
        }
      ]);
    }, 500);
    return () => clearInterval(interval);
  }, [isScanning]);

  const toggleScan = () => {
    setIsScanning(!isScanning);
    if (!isScanning) setMetrics([]);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/40">
          <Activity className="text-primary w-5 h-5" />
        </div>
        <div>
          <h3 className="text-xl font-headline font-bold text-white uppercase tracking-widest">Neuro-Screening Camera Demo</h3>
          <p className="text-[10px] font-mono text-primary opacity-70 italic">MODE: MOTOR_STABILITY_ANALYSIS</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* Camera Interface */}
        <div className="xl:col-span-7">
          <div className="relative aspect-video rounded-[2.5rem] overflow-hidden border border-white/10 bg-black/60 shadow-2xl">
            <video ref={videoRef} autoPlay muted playsInline className="w-full h-full object-cover grayscale opacity-60" />
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
            
            {/* HUD Overlay */}
            <div className="absolute inset-0 pointer-events-none p-8 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 px-3 py-1 bg-primary/20 border border-primary/40 rounded-full text-[10px] font-mono text-primary">
                    <div className={`w-1.5 h-1.5 rounded-full ${isScanning ? 'bg-red-500 animate-pulse' : 'bg-primary'}`} />
                    {isScanning ? 'ANALYZING_STREAM' : 'SYSTEM_READY'}
                  </div>
                  <div className="text-[10px] font-mono text-white/40">FR: 60FPS | RES: 1080P</div>
                </div>
                <div className="w-16 h-16 border-t-2 border-r-2 border-primary/40 opacity-40" />
              </div>

              <div className="flex justify-center">
                <div className="w-48 h-48 border border-primary/20 rounded-full flex items-center justify-center">
                  <div className={`w-40 h-40 border-2 border-dashed border-primary/40 rounded-full ${isScanning ? 'animate-spin-slow' : ''}`} />
                </div>
              </div>

              <div className="flex justify-between items-end">
                <div className="w-16 h-16 border-b-2 border-l-2 border-primary/40 opacity-40" />
                <div className="flex gap-4 pointer-events-auto">
                  <button 
                    onClick={toggleScan}
                    className={`h-12 px-8 rounded-2xl font-bold text-xs tracking-widest transition-all flex items-center gap-3 ${
                      isScanning 
                        ? 'bg-red-500/20 border border-red-500/40 text-red-400 hover:bg-red-500 hover:text-white' 
                        : 'bg-primary border border-primary text-white hover:scale-105'
                    }`}
                  >
                    {isScanning ? <AlertTriangle className="w-4 h-4" /> : <Zap className="w-4 h-4" />}
                    {isScanning ? 'TERMINATE_SCAN' : 'INITIALIZE_SCAN'}
                  </button>
                </div>
              </div>
            </div>

            {hasPermission === false && (
              <div className="absolute inset-0 bg-black/80 flex items-center justify-center p-8 text-center">
                <div className="max-w-xs space-y-4">
                  <Camera className="w-12 h-12 text-neutral-500 mx-auto" />
                  <p className="text-sm text-neutral-400">Camera permission denied. Enable browser access to test the simulator.</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Real-time Bio-metrics */}
        <div className="xl:col-span-5 space-y-6">
          <Card className="bg-black/40 border-white/5 rounded-[2.5rem] p-8 h-full flex flex-col justify-between">
            <div className="space-y-8">
              <h4 className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">Stability Metrics</h4>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="p-6 bg-white/5 border border-white/10 rounded-3xl space-y-2">
                  <div className="flex items-center gap-2 text-primary">
                    <Activity className="w-4 h-4" />
                    <span className="text-[10px] font-mono uppercase">Tremor</span>
                  </div>
                  <p className="text-2xl font-bold text-white font-headline">
                    {isScanning ? (metrics[metrics.length-1]?.tremor.toFixed(2)) : '0.00'}
                    <span className="text-[10px] text-neutral-500 ml-1">Hz</span>
                  </p>
                </div>
                <div className="p-6 bg-white/5 border border-white/10 rounded-3xl space-y-2">
                  <div className="flex items-center gap-2 text-secondary">
                    <Target className="w-4 h-4" />
                    <span className="text-[10px] font-mono uppercase">Symmetry</span>
                  </div>
                  <p className="text-2xl font-bold text-white font-headline">
                    {isScanning ? (metrics[metrics.length-1]?.symmetry.toFixed(1)) : '100'}
                    <span className="text-[10px] text-neutral-500 ml-1">%</span>
                  </p>
                </div>
              </div>

              <div className="h-40 w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={metrics}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                    <XAxis dataKey="time" hide />
                    <YAxis hide domain={[0, 10]} />
                    <Line 
                      type="monotone" 
                      dataKey="tremor" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={2} 
                      dot={false} 
                      animationDuration={300}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="pt-8 border-t border-white/5">
              <div className="p-4 bg-primary/5 border border-primary/20 rounded-2xl flex items-start gap-4">
                <ShieldCheck className="w-5 h-5 text-primary shrink-0 mt-1" />
                <p className="text-[10px] text-neutral-400 leading-relaxed font-mono">
                  <span className="text-primary font-bold">ANALYSIS_NOTE:</span> System tracking micro-tremors via facial landmark oscillation. All data processed locally. No health claims made.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
