
'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Camera, Eye, Activity, Brain, ShieldCheck, 
  AlertTriangle, Zap, Target, Loader2, FileText,
  Info, Lock, ArrowRight, ClipboardCheck
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, 
  ResponsiveContainer, CartesianGrid 
} from 'recharts';

// Advanced Analysis Hooks
import { useMediaPipe } from './hooks/useMediaPipe';
import { useTremorAnalysis } from './hooks/useTremorAnalysis';
import { useBlinkDetection } from './hooks/useBlinkDetection';
import { useFacialSymmetry } from './hooks/useFacialSymmetry';
import { useConfidenceMetrics } from './hooks/useConfidenceMetrics';

const TASKS = [
  { id: 'baseline', label: 'STATIC_BASELINE', instr: 'Hold perfectly still for 5 seconds' },
  { id: 'smile', label: 'SYMMETRIC_SMILE', instr: 'Smile as broadly as possible' },
  { id: 'saccade', label: 'EYE_TRACKING', instr: 'Follow the red indicator with your eyes' }
];

export function NeuroScreening() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [showDisclaimer, setShowDisclaimer] = useState(true);
  const [disclaimerAgreed, setDisclaimerAgreed] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [currentTaskIdx, setCurrentTaskIdx] = useState(0);
  const [taskProgress, setTaskProgress] = useState(0);
  const [realtimeData, setRealtimeData] = useState<any[]>([]);
  const [report, setReport] = useState<string | null>(null);
  const { toast } = useToast();

  const { landmarks, isModelLoading, detectLandmarks, fps } = useMediaPipe();
  const { tremorFrequency, tremorAmplitude } = useTremorAnalysis(landmarks);
  const { blinkCount, blinkRate, blinkDuration } = useBlinkDetection(landmarks);
  const { symmetryScore } = useFacialSymmetry(landmarks);
  const { confidenceScore, qualityStatus } = useConfidenceMetrics(landmarks, fps);

  useEffect(() => {
    if (showDisclaimer) return;

    const getPermission = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { width: 1280, height: 720, frameRate: 30 } 
        });
        setHasPermission(true);
        if (videoRef.current) videoRef.current.srcObject = stream;
      } catch (err) {
        setHasPermission(false);
        toast({
          variant: 'destructive',
          title: 'Camera Access Required',
          description: 'Advanced neurological screening requires video feed for landmark analysis.',
        });
      }
    };
    getPermission();
    return () => {
      if (videoRef.current?.srcObject) {
        (videoRef.current.srcObject as MediaStream).getTracks().forEach(t => t.stop());
      }
    };
  }, [toast, showDisclaimer]);

  // Main Detection Loop
  useEffect(() => {
    let animationId: number;
    const loop = () => {
      if (isScanning && videoRef.current) {
        detectLandmarks(videoRef.current);
      }
      animationId = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(animationId);
  }, [isScanning, detectLandmarks]);

  // Task Runner
  useEffect(() => {
    if (!isScanning) {
      setTaskProgress(0);
      return;
    }

    const interval = setInterval(() => {
      setTaskProgress(prev => {
        if (prev >= 100) {
          if (currentTaskIdx < TASKS.length - 1) {
            setCurrentTaskIdx(idx => idx + 1);
            return 0;
          } else {
            setIsScanning(false);
            generateReport();
            return 100;
          }
        }
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isScanning, currentTaskIdx]);

  // Real-time Chart Data
  useEffect(() => {
    if (!isScanning) return;
    const interval = setInterval(() => {
      setRealtimeData(prev => [
        ...prev.slice(-29),
        {
          time: new Date().toLocaleTimeString(),
          tremor: tremorAmplitude * 100,
          symmetry: symmetryScore,
        }
      ]);
    }, 200);
    return () => clearInterval(interval);
  }, [isScanning, tremorAmplitude, symmetryScore]);

  const toggleScan = () => {
    if (isScanning) {
      setIsScanning(false);
      setReport(null);
    } else {
      setIsScanning(true);
      setCurrentTaskIdx(0);
      setTaskProgress(0);
      setRealtimeData([]);
      setReport(null);
    }
  };

  const generateReport = () => {
    const reportText = `
EXPERIMENTAL NEUROLOGICAL SCREENING REPORT
Generated: ${new Date().toLocaleString()}
------------------------------------------
STABILITY METRICS:
- Tremor Frequency: ${tremorFrequency.toFixed(2)} Hz
- Symmetry Index: ${symmetryScore.toFixed(1)}%
- Blink Rate: ${blinkRate} /min
- Avg Blink Duration: ${blinkDuration.toFixed(0)} ms

SIGNAL QUALITY:
- Confidence Score: ${confidenceScore}%
- Quality Status: ${qualityStatus}
- Hardware Throughput: ${fps} FPS

OBSERVATIONS:
The system detected stability patterns across ${TASKS.length} functional tasks.
Landmark oscillation was analyzed via FFT in the 0-15Hz range.
Facial symmetry was computed via 468 landmark coordinates.

⚠️ EDUCATIONAL DEMO ONLY - NOT FOR MEDICAL DIAGNOSIS
    `.trim();
    setReport(reportText);
  };

  if (showDisclaimer) {
    return (
      <div className="flex items-center justify-center py-12">
        <Card className="max-w-2xl bg-black/60 border-white/10 p-10 rounded-[3rem] backdrop-blur-xl space-y-8">
          <div className="flex items-center gap-4 border-b border-white/10 pb-6">
            <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center border border-primary/40">
              <ShieldCheck className="text-primary w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-headline font-bold text-white uppercase tracking-tight">Important Disclaimer</h2>
              <p className="text-[10px] font-mono text-primary uppercase">Research_Demo_Mode: V2.9</p>
            </div>
          </div>

          <div className="space-y-6 text-sm text-neutral-400 font-body leading-relaxed">
            <div className="flex gap-4">
              <Info className="w-5 h-5 text-primary shrink-0" />
              <p><span className="text-white font-bold">Educational Purpose Only:</span> This experimental screening tool is for research demonstrations and does NOT provide medical diagnosis or advice.</p>
            </div>
            <div className="flex gap-4">
              <Lock className="w-5 h-5 text-primary shrink-0" />
              <p><span className="text-white font-bold">Privacy First:</span> All video processing occurs locally in your browser. No biometric data or video is transmitted or stored on any server.</p>
            </div>
            <div className="flex gap-4">
              <AlertTriangle className="w-5 h-5 text-primary shrink-0" />
              <p><span className="text-white font-bold">Not a Medical Device:</span> This tool has not been evaluated by regulatory bodies and should not be used for medical decisions.</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-primary/5 border border-primary/20 rounded-2xl">
            <Checkbox 
              id="agree" 
              checked={disclaimerAgreed} 
              onCheckedChange={(checked) => setDisclaimerAgreed(!!checked)}
              className="border-primary/40 data-[state=checked]:bg-primary"
            />
            <label htmlFor="agree" className="text-xs font-mono text-white/70 cursor-pointer">
              I understand this is an educational demo and not medical advice.
            </label>
          </div>

          <button 
            disabled={!disclaimerAgreed}
            onClick={() => setShowDisclaimer(false)}
            className="w-full h-14 rounded-2xl bg-white text-black font-bold flex items-center justify-center gap-3 hover:bg-neutral-200 transition-all disabled:opacity-30 disabled:cursor-not-allowed group"
          >
            INITIALIZE LAB INTERFACE
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/40">
            <Brain className="text-primary w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-headline font-bold text-white uppercase tracking-widest">Advanced Neuro-Screening Prototypes</h3>
            <p className="text-[10px] font-mono text-primary opacity-70 italic">EXPERIMENTAL_PHASE: LANDMARK_STABILITY_ANALYSIS</p>
          </div>
        </div>
        {isScanning && (
          <div className="px-4 py-2 bg-primary/5 border border-primary/20 rounded-xl flex items-center gap-4">
            <div className="space-y-1">
              <div className="flex justify-between text-[8px] font-mono text-white/40">
                <span>TASK: {TASKS[currentTaskIdx].label}</span>
                <span>{taskProgress}%</span>
              </div>
              <Progress value={taskProgress} className="h-1 w-48 bg-primary/10" />
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* Cinematic Camera Interface */}
        <div className="xl:col-span-7 space-y-6">
          <div className="relative aspect-video rounded-[2.5rem] overflow-hidden border border-white/10 bg-black/60 shadow-2xl">
            <video 
              ref={videoRef} 
              autoPlay 
              muted 
              playsInline 
              className={`w-full h-full object-cover transition-opacity duration-700 ${isScanning ? 'opacity-40 grayscale' : 'opacity-20'}`} 
            />
            
            {/* HUD Overlay */}
            <div className="absolute inset-0 pointer-events-none p-8 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div className="flex flex-col gap-2">
                  <div className={`flex items-center gap-2 px-3 py-1 bg-black/40 border rounded-full text-[10px] font-mono transition-colors ${isScanning ? 'border-red-500/40 text-red-400' : 'border-primary/40 text-primary'}`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${isScanning ? 'bg-red-500 animate-pulse' : 'bg-primary'}`} />
                    {isModelLoading ? 'INITIALIZING_MODELS...' : isScanning ? 'ANALYZING_DATA_STREAM' : 'SYSTEM_READY'}
                  </div>
                  {isScanning && <div className="text-[10px] font-mono text-white/40">FR: {fps}FPS | ANALYTICS: ACTIVE</div>}
                </div>
                <div className="w-16 h-16 border-t-2 border-r-2 border-primary/40 opacity-40" />
              </div>

              {/* Task Instruction / Scanning Reticle */}
              <AnimatePresence mode="wait">
                {isScanning && (
                  <motion.div 
                    key={currentTaskIdx}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center gap-6"
                  >
                    <div className="w-48 h-48 border border-primary/20 rounded-full flex items-center justify-center relative">
                      <div className="w-40 h-40 border-2 border-dashed border-primary/40 rounded-full animate-spin-slow" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Target className={`w-8 h-8 transition-colors ${currentTaskIdx === 2 ? 'text-red-500 animate-bounce' : 'text-primary/40'}`} />
                      </div>
                    </div>
                    <p className="text-xs font-mono text-primary bg-black/60 px-4 py-2 rounded-lg border border-primary/20 backdrop-blur-md">
                      {TASKS[currentTaskIdx].instr}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex justify-between items-end">
                <div className="w-16 h-16 border-b-2 border-l-2 border-primary/40 opacity-40" />
                <div className="flex gap-4 pointer-events-auto">
                  <button 
                    onClick={toggleScan}
                    disabled={isModelLoading}
                    className={`h-12 px-8 rounded-2xl font-bold text-xs tracking-widest transition-all flex items-center gap-3 ${
                      isScanning 
                        ? 'bg-red-500/20 border border-red-500/40 text-red-400 hover:bg-red-500/40 hover:text-white' 
                        : 'bg-primary border border-primary text-white hover:scale-105 active:scale-95 disabled:opacity-50'
                    }`}
                  >
                    {isModelLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : isScanning ? <AlertTriangle className="w-4 h-4" /> : <Zap className="w-4 h-4" />}
                    {isScanning ? 'TERMINATE_ANALYSIS' : 'INITIALIZE_SCAN'}
                  </button>
                </div>
              </div>
            </div>

            {hasPermission === false && (
              <div className="absolute inset-0 bg-black/90 flex items-center justify-center p-8 text-center backdrop-blur-md">
                <div className="max-w-xs space-y-4">
                  <Camera className="w-12 h-12 text-destructive mx-auto" />
                  <p className="text-sm text-neutral-400 font-mono">CRITICAL_ERROR: Camera access denied. Enable permissions to run landmark analysis.</p>
                </div>
              </div>
            )}
          </div>

          {/* Detailed Observations Panel */}
          {report && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="bg-white/5 border-primary/20 p-8 rounded-[2.5rem] relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4">
                  <ClipboardCheck className="w-12 h-12 text-primary opacity-10" />
                </div>
                <h4 className="text-xs font-mono text-primary mb-6 flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  EXPERIMENTAL_SCREENING_SUMMARY
                </h4>
                <pre className="text-[10px] font-mono text-neutral-400 leading-relaxed whitespace-pre-wrap">
                  {report}
                </pre>
              </Card>
            </motion.div>
          )}
        </div>

        {/* Real-time Technical Report */}
        <div className="xl:col-span-5 space-y-6">
          <Card className="bg-black/40 border-white/5 rounded-[2.5rem] p-8 h-full flex flex-col justify-between backdrop-blur-xl">
            <div className="space-y-8">
              <div className="flex justify-between items-start">
                <h4 className="text-[10px] font-mono text-neutral-500 uppercase tracking-[0.3em]">Stability Metrics V2.9</h4>
                <div className={`px-2 py-1 border rounded text-[8px] font-mono transition-colors ${isScanning ? 'bg-primary/10 border-primary/20 text-primary' : 'bg-white/5 border-white/10 text-white/20'}`}>
                  {isScanning ? 'SYNC_ACTIVE' : 'OFFLINE'}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="p-6 bg-white/5 border border-white/10 rounded-3xl space-y-2 group hover:border-primary/40 transition-colors">
                  <div className="flex items-center gap-2 text-primary">
                    <Activity className="w-4 h-4" />
                    <span className="text-[10px] font-mono uppercase tracking-tighter">Tremor_Frequency</span>
                  </div>
                  <p className="text-2xl font-bold text-white font-headline">
                    {isScanning ? tremorFrequency.toFixed(2) : '0.00'}
                    <span className="text-[10px] text-neutral-500 ml-1">Hz</span>
                  </p>
                </div>
                <div className="p-6 bg-white/5 border border-white/10 rounded-3xl space-y-2 group hover:border-secondary/40 transition-colors">
                  <div className="flex items-center gap-2 text-secondary">
                    <Target className="w-4 h-4" />
                    <span className="text-[10px] font-mono uppercase tracking-tighter">Symmetry_Index</span>
                  </div>
                  <p className="text-2xl font-bold text-white font-headline">
                    {isScanning ? symmetryScore.toFixed(1) : '100'}
                    <span className="text-[10px] text-neutral-500 ml-1">%</span>
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-end px-2">
                  <span className="text-[10px] font-mono text-neutral-500 uppercase">Signal_Confidence</span>
                  <span className={`text-[10px] font-mono font-bold ${confidenceScore > 70 ? 'text-emerald-400' : 'text-amber-400'}`}>{confidenceScore}%</span>
                </div>
                <Progress value={confidenceScore} className={`h-1.5 ${confidenceScore > 70 ? 'bg-emerald-500/10' : 'bg-amber-500/10'}`} />
              </div>

              <div className="p-6 bg-white/5 border border-white/10 rounded-3xl space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-primary/60">
                    <Eye className="w-4 h-4" />
                    <span className="text-[10px] font-mono uppercase">Blink_Analytics</span>
                  </div>
                  <span className="text-[10px] font-mono text-white/40">{blinkCount} TOTAL</span>
                </div>
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-bold text-white font-headline">{isScanning ? blinkRate : '0'}</span>
                  <span className="text-[10px] text-neutral-500 font-mono mb-1 uppercase tracking-widest">Blinks / MIN</span>
                </div>
              </div>

              <div className="h-32 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={realtimeData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                    <XAxis dataKey="time" hide />
                    <YAxis hide domain={[0, 100]} />
                    <Line 
                      type="monotone" 
                      dataKey="tremor" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={2} 
                      dot={false} 
                      isAnimationActive={false}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="symmetry" 
                      stroke="hsl(var(--secondary))" 
                      strokeWidth={1} 
                      strokeDasharray="5 5"
                      dot={false} 
                      isAnimationActive={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="pt-8 border-t border-white/5 space-y-4">
              <div className="p-4 bg-primary/5 border border-primary/20 rounded-2xl flex items-start gap-4">
                <ShieldCheck className="w-5 h-5 text-primary shrink-0 mt-1" />
                <div className="space-y-1">
                  <p className="text-[10px] text-white font-bold font-mono">SYSTEM_NOTE:</p>
                  <p className="text-[9px] text-neutral-400 leading-relaxed font-mono">
                    Analysis based on facial landmark oscillation and Euclidean distances. All data processed locally on client-side WASM kernel. No biometric data is transmitted.
                  </p>
                </div>
              </div>
              
              <button 
                disabled={!report}
                className="w-full h-10 rounded-xl bg-white/5 border border-white/10 text-[9px] font-mono text-white/40 flex items-center justify-center gap-2 hover:bg-white/10 hover:text-white transition-all uppercase tracking-widest disabled:opacity-20"
              >
                <FileText className="w-3 h-3" />
                Export Uncompressed Data
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
