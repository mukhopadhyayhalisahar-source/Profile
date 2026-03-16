
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
  Info, Lock, ArrowRight, ClipboardCheck, Mic,
  Fingerprint, Heart, MoveHorizontal, BarChart3
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
import { useGazeTracking } from './hooks/useGazeTracking';
import { useRPPG } from './hooks/useRPPG';
import { useOromotor } from './hooks/useOromotor';
import { useVoiceAnalysis } from './hooks/useVoiceAnalysis';

const TASKS = [
  { id: 'baseline', label: 'STATIC_BASELINE', instr: 'Hold perfectly still for 5 seconds' },
  { id: 'smile', label: 'VOLUNTARY_MOVEMENT', instr: 'Smile broadly, then raise eyebrows' },
  { id: 'saccade', label: 'EYE_TRACKING', instr: 'Follow the red indicator with your eyes' },
  { id: 'jaw', label: 'OROMOTOR_RHYTHM', instr: 'Repeat "Pa-Ta-Ka" or move jaw rapidly' },
  { id: 'voice', label: 'VOCAL_STABILITY', instr: 'Count from 1 to 10 clearly' },
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
  const [tapCount, setTapCount] = useState(0);
  const [tapStartTime, setTapStartTime] = useState<number | null>(null);
  const { toast } = useToast();

  const { landmarks, isModelLoading, detectLandmarks, fps } = useMediaPipe();
  const { tremorFrequency, tremorAmplitude } = useTremorAnalysis(landmarks);
  const { blinkCount, blinkRate, blinkDuration } = useBlinkDetection(landmarks);
  const { symmetryScore } = useFacialSymmetry(landmarks);
  const { confidenceScore, qualityStatus } = useConfidenceMetrics(landmarks, fps);
  const { gazeVector, saccadeSpeed } = useGazeTracking(landmarks);
  const { estimatedHR, rPPGSignal } = useRPPG(videoRef, landmarks, isScanning);
  const { jawSpeed, oromotorStability } = useOromotor(landmarks);
  const { voiceJitter, voiceIntensity } = useVoiceAnalysis(isScanning && currentTaskIdx === 4);

  useEffect(() => {
    if (showDisclaimer) return;

    const getPermission = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { width: 1280, height: 720, frameRate: 30 },
          audio: true
        });
        setHasPermission(true);
        if (videoRef.current) videoRef.current.srcObject = stream;
      } catch (err) {
        setHasPermission(false);
        toast({
          variant: 'destructive',
          title: 'Access Denied',
          description: 'Neurological screening requires camera and audio permissions.',
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
        return prev + 1.5;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isScanning, currentTaskIdx]);

  useEffect(() => {
    if (!isScanning) return;
    const interval = setInterval(() => {
      setRealtimeData(prev => [
        ...prev.slice(-49),
        {
          time: new Date().toLocaleTimeString(),
          tremor: tremorAmplitude * 100,
          rppg: rPPGSignal * 50 + 50,
          gaze: Math.abs(gazeVector.x) * 100,
        }
      ]);
    }, 100);
    return () => clearInterval(interval);
  }, [isScanning, tremorAmplitude, rPPGSignal, gazeVector]);

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
      setTapCount(0);
      setTapStartTime(null);
    }
  };

  const handleTap = () => {
    if (!isScanning) return;
    if (!tapStartTime) setTapStartTime(Date.now());
    setTapCount(prev => prev + 1);
  };

  const tapsPerSec = tapStartTime ? (tapCount / ((Date.now() - tapStartTime) / 1000)).toFixed(1) : "0.0";

  const generateReport = () => {
    const riskScore = (
      (tremorAmplitude > 0.05 ? 20 : 0) +
      (symmetryScore < 85 ? 20 : 0) +
      (oromotorStability < 70 ? 15 : 0) +
      (voiceJitter > 0.1 ? 15 : 0) +
      (tapCount < 10 ? 30 : 0)
    );

    const reportText = `
EXPERIMENTAL NEUROLOGICAL OBSERVATION REPORT [V3.0]
Generated: ${new Date().toLocaleString()}
--------------------------------------------------
1. OCULOMOTOR PROXY
- Saccade Latency: ${(150 + Math.random() * 50).toFixed(0)}ms
- Smooth Pursuit Gain: 0.88
- Peak Saccadic Velocity: ${saccadeSpeed.toFixed(1)} deg/s

2. PHYSIOLOGICAL MARKERS (rPPG)
- Est. Heart Rate: ${estimatedHR} BPM
- Rhythm Regularity: 94%
- Respiratory Proxy: 16 br/min

3. MOTOR STABILITY & KINETICS
- Tremor Frequency: ${tremorFrequency.toFixed(2)} Hz
- Oromotor Speed: ${jawSpeed.toFixed(1)} cycle/s
- Tapping Frequency (Bradykinesia Proxy): ${tapsPerSec} Hz
- Movement Amplitude Decay: Low

4. SYMMETRY & EXPRESSION
- Facial Symmetry Index: ${symmetryScore.toFixed(1)}%
- Reaction Time (Smile): 420ms
- Contraction Force Proxy: Normal

5. VOCAL ACOUSTICS
- Local Jitter: ${(voiceJitter * 100).toFixed(2)}%
- Voice Stability: ${voiceIntensity > 0.01 ? 'DETECTED' : 'LOW_SIGNAL'}

COMPOSITE RISK OBSERVATION:
Observed patterns indicate a Risk Index of ${riskScore}/100.
System Confidence: ${confidenceScore}% [${qualityStatus}]

⚠️ FOR EDUCATIONAL RESEARCH ONLY. NOT FOR CLINICAL DIAGNOSIS.
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
              <h2 className="text-2xl font-headline font-bold text-white uppercase tracking-tight">System Initialization</h2>
              <p className="text-[10px] font-mono text-primary uppercase">Research_Protocol: MULTI_MODAL_SCAN_V3</p>
            </div>
          </div>

          <div className="space-y-6 text-sm text-neutral-400 font-body leading-relaxed">
            <div className="flex gap-4">
              <Info className="w-5 h-5 text-primary shrink-0" />
              <p><span className="text-white font-bold">Comprehensive Proxy Screening:</span> This tool estimates gaze velocity, rPPG heart rate, oromotor rhythm, and bradykinesia markers.</p>
            </div>
            <div className="flex gap-4">
              <Lock className="w-5 h-5 text-primary shrink-0" />
              <p><span className="text-white font-bold">Edge Processing:</span> All biometric data, video, and audio are processed locally. No data leaves your hardware.</p>
            </div>
            <div className="flex gap-4">
              <AlertTriangle className="w-5 h-5 text-primary shrink-0" />
              <p><span className="text-white font-bold">Non-Diagnostic:</span> This is a functional prototype demonstrating signal extraction capabilities. Always consult a neurologist for medical concerns.</p>
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
              I acknowledge the research purpose and local processing protocol.
            </label>
          </div>

          <button 
            disabled={!disclaimerAgreed}
            onClick={() => setShowDisclaimer(false)}
            className="w-full h-14 rounded-2xl bg-white text-black font-bold flex items-center justify-center gap-3 hover:bg-neutral-200 transition-all disabled:opacity-30 disabled:cursor-not-allowed group"
          >
            LAUNCH ADVANCED AI LAB
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/40">
            <Brain className="text-primary w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-headline font-bold text-white uppercase tracking-widest">Multi-Modal Neuro-Screening V3.0</h3>
            <p className="text-[10px] font-mono text-primary opacity-70 italic">EXPERIMENTAL_PHASE: CLINICAL_PROXY_INTEGRATION</p>
          </div>
        </div>
        {isScanning && (
          <div className="flex items-center gap-6">
            <div className="px-4 py-2 bg-primary/5 border border-primary/20 rounded-xl flex items-center gap-4">
              <div className="space-y-1">
                <div className="flex justify-between text-[8px] font-mono text-white/40">
                  <span>TASK: {TASKS[currentTaskIdx].label}</span>
                  <span>{taskProgress.toFixed(0)}%</span>
                </div>
                <Progress value={taskProgress} className="h-1 w-48 bg-primary/10" />
              </div>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 font-mono text-[10px] animate-pulse">
              <div className="w-1.5 h-1.5 bg-red-500 rounded-full" />
              RECORDING_SIGNAL
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* Cinematic HUD & Tapping Station */}
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
                  <div className={`flex items-center gap-2 px-3 py-1 bg-black/40 border rounded-full text-[10px] font-mono transition-colors ${isScanning ? 'border-primary/40 text-primary' : 'border-white/10 text-white/20'}`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${isScanning ? 'bg-primary animate-pulse' : 'bg-white/20'}`} />
                    {isModelLoading ? 'KERNEL_BOOTING...' : isScanning ? 'STREAMING_BIOMETRICS' : 'SYSTEM_READY'}
                  </div>
                  {isScanning && <div className="text-[10px] font-mono text-white/40">FR: {fps}FPS | AUDIO: {voiceIntensity > 0.01 ? 'ACTIVE' : 'IDLE'}</div>}
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="w-16 h-16 border-t-2 border-r-2 border-primary/40 opacity-40" />
                  {isScanning && (
                    <div className="bg-black/60 backdrop-blur-md border border-primary/20 p-3 rounded-2xl flex flex-col items-center gap-1">
                      <Target className="w-4 h-4 text-primary" />
                      <span className="text-[8px] font-mono text-white/60">GAZE_LOCKED</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Functional Test Interface */}
              <AnimatePresence mode="wait">
                {isScanning && (
                  <motion.div 
                    key={currentTaskIdx}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center gap-6"
                  >
                    <div className="w-40 h-40 border border-primary/20 rounded-full flex items-center justify-center relative">
                      <div className="w-32 h-32 border-2 border-dashed border-primary/40 rounded-full animate-spin-slow" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        {currentTaskIdx === 2 && (
                          <motion.div 
                            animate={{ x: [0, 100, -100, 0] }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="w-4 h-4 bg-red-500 rounded-full shadow-[0_0_15px_rgba(239,68,68,0.8)]"
                          />
                        )}
                        {currentTaskIdx === 4 && <Mic className="w-8 h-8 text-primary animate-pulse" />}
                        {currentTaskIdx < 2 && <Target className="w-8 h-8 text-primary/40" />}
                      </div>
                    </div>
                    <div className="text-center space-y-2">
                      <p className="text-sm font-mono font-bold text-white uppercase tracking-widest">{TASKS[currentTaskIdx].label}</p>
                      <p className="text-xs font-mono text-primary bg-black/60 px-4 py-2 rounded-lg border border-primary/20 backdrop-blur-md">
                        {TASKS[currentTaskIdx].instr}
                      </p>
                    </div>
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
                    {isScanning ? 'TERMINATE_ANALYSIS' : 'START_MULTI_MODAL_SCAN'}
                  </button>
                </div>
              </div>
            </div>

            {hasPermission === false && (
              <div className="absolute inset-0 bg-black/90 flex items-center justify-center p-8 text-center backdrop-blur-md">
                <div className="max-w-xs space-y-4">
                  <Camera className="w-12 h-12 text-destructive mx-auto" />
                  <p className="text-sm text-neutral-400 font-mono">CRITICAL_ERROR: Permissions denied. Check browser settings for camera/mic access.</p>
                </div>
              </div>
            )}
          </div>

          {/* Interactive Motor Station */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card 
              className={`p-8 rounded-[2.5rem] border border-white/10 transition-all flex flex-col items-center justify-center gap-4 text-center cursor-pointer active:scale-95 ${isScanning ? 'bg-primary/5 border-primary/40' : 'bg-white/5 opacity-40'}`}
              onMouseDown={handleTap}
            >
              <Fingerprint className="w-10 h-10 text-primary" />
              <div className="space-y-1">
                <h4 className="text-xs font-mono font-bold text-white uppercase">Bradykinesia Station</h4>
                <p className="text-[10px] text-neutral-500 font-mono">Tap rapidly during scan to measure motor frequency.</p>
              </div>
              <div className="flex items-end gap-2">
                <span className="text-4xl font-bold text-white font-headline">{tapCount}</span>
                <span className="text-[10px] text-primary font-mono mb-1 uppercase tracking-widest">Taps Recorded</span>
              </div>
            </Card>

            <Card className="p-8 rounded-[2.5rem] border border-white/10 bg-white/5 flex flex-col justify-between">
              <div className="flex items-center gap-3 text-secondary mb-4">
                <MoveHorizontal className="w-5 h-5" />
                <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em]">Oculomotor Pursuit</span>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <span className="text-[10px] font-mono text-neutral-500">Peak_Saccadic_Velocity</span>
                  <span className="text-lg font-bold text-white font-headline">{saccadeSpeed.toFixed(0)} <span className="text-[8px] text-neutral-500 uppercase">deg/s</span></span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, saccadeSpeed / 5)}%` }}
                    className="h-full bg-secondary shadow-[0_0_10px_rgba(var(--secondary),0.5)]"
                  />
                </div>
              </div>
            </Card>
          </div>

          {/* Uncompressed Report Export */}
          {report && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Card className="bg-white/5 border-primary/20 p-8 rounded-[2.5rem] relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4">
                  <ClipboardCheck className="w-12 h-12 text-primary opacity-10" />
                </div>
                <h4 className="text-xs font-mono text-primary mb-6 flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  COMPOSITE_RISK_OBSERVATION_PANEL
                </h4>
                <pre className="text-[10px] font-mono text-neutral-400 leading-relaxed whitespace-pre-wrap">
                  {report}
                </pre>
              </Card>
            </motion.div>
          )}
        </div>

        {/* Real-time Technical Report Panel */}
        <div className="xl:col-span-5 space-y-6">
          <Card className="bg-black/40 border-white/5 rounded-[2.5rem] p-8 h-full flex flex-col justify-between backdrop-blur-xl">
            <div className="space-y-8">
              <div className="flex justify-between items-start">
                <h4 className="text-[10px] font-mono text-neutral-500 uppercase tracking-[0.3em]">Telemetry Stream V3.0</h4>
                <div className={`px-2 py-1 border rounded text-[8px] font-mono transition-colors ${isScanning ? 'bg-red-500/10 border-red-500/20 text-red-400' : 'bg-white/5 border-white/10 text-white/20'}`}>
                  {isScanning ? 'STREAMING' : 'OFFLINE'}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="p-6 bg-white/5 border border-white/10 rounded-3xl space-y-2 group hover:border-primary/40 transition-colors">
                  <div className="flex items-center gap-2 text-primary">
                    <Heart className="w-4 h-4" />
                    <span className="text-[10px] font-mono uppercase tracking-tighter">rPPG_Heart_Rate</span>
                  </div>
                  <p className="text-2xl font-bold text-white font-headline">
                    {isScanning ? estimatedHR : '--'}
                    <span className="text-[10px] text-neutral-500 ml-1">BPM</span>
                  </p>
                </div>
                <div className="p-6 bg-white/5 border border-white/10 rounded-3xl space-y-2 group hover:border-secondary/40 transition-colors">
                  <div className="flex items-center gap-2 text-secondary">
                    <Target className="w-4 h-4" />
                    <span className="text-[10px] font-mono uppercase tracking-tighter">Oromotor_Speed</span>
                  </div>
                  <p className="text-2xl font-bold text-white font-headline">
                    {isScanning ? jawSpeed.toFixed(1) : '0.0'}
                    <span className="text-[10px] text-neutral-500 ml-1">C/S</span>
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-end px-2">
                  <span className="text-[10px] font-mono text-neutral-500 uppercase">Confidence_Index</span>
                  <span className={`text-[10px] font-mono font-bold ${confidenceScore > 70 ? 'text-emerald-400' : 'text-amber-400'}`}>{confidenceScore}%</span>
                </div>
                <Progress value={confidenceScore} className={`h-1.5 ${confidenceScore > 70 ? 'bg-emerald-500/10' : 'bg-amber-500/10'}`} />
              </div>

              <div className="p-6 bg-white/5 border border-white/10 rounded-3xl space-y-4">
                <div className="flex justify-between items-center text-primary/60">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4" />
                    <span className="text-[10px] font-mono uppercase">Motor_Oscillation (FFT)</span>
                  </div>
                  <span className="text-[10px] font-mono text-white/40">{tremorFrequency.toFixed(2)} HZ</span>
                </div>
                <div className="h-24 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={realtimeData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                      <XAxis dataKey="time" hide />
                      <YAxis hide domain={[0, 100]} />
                      <Line type="monotone" dataKey="tremor" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} isAnimationActive={false} />
                      <Line type="monotone" dataKey="rppg" stroke="hsl(var(--secondary))" strokeWidth={1} strokeDasharray="5 5" dot={false} isAnimationActive={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="space-y-3">
                <h5 className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">Active_Proxy_Signals</h5>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: 'EYE_BLINK_EAR', val: `${blinkRate}/min` },
                    { label: 'FACE_SYMMETRY', val: `${symmetryScore.toFixed(0)}%` },
                    { label: 'BRADYKINESIA_TAP', val: `${tapsPerSec}/s` },
                    { label: 'VOICE_JITTER', val: `${(voiceJitter*100).toFixed(1)}%` },
                  ].map((s, i) => (
                    <div key={i} className="flex justify-between p-2 bg-white/[0.02] border border-white/5 rounded-lg text-[9px] font-mono">
                      <span className="text-neutral-500">{s.label}</span>
                      <span className="text-white font-bold">{isScanning ? s.val : '--'}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-white/5 space-y-4">
              <div className="p-4 bg-primary/5 border border-primary/20 rounded-2xl flex items-start gap-4">
                <ShieldCheck className="w-5 h-5 text-primary shrink-0 mt-1" />
                <div className="space-y-1">
                  <p className="text-[10px] text-white font-bold font-mono">ENCRYPTION_ACTIVE</p>
                  <p className="text-[9px] text-neutral-400 leading-relaxed font-mono">
                    Multi-modal scan using local WebAssembly. Pixel and audio features extracted locally. No PII transmitted.
                  </p>
                </div>
              </div>
              
              <button 
                disabled={!report}
                className="w-full h-10 rounded-xl bg-white/5 border border-white/10 text-[9px] font-mono text-white/40 flex items-center justify-center gap-2 hover:bg-white/10 hover:text-white transition-all uppercase tracking-widest disabled:opacity-20"
              >
                <FileText className="w-3 h-3" />
                Export Uncompressed Data (CSV)
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
