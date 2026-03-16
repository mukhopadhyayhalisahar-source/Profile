
'use client';

import { useState, useEffect, useRef } from 'react';

export const useVoiceAnalysis = (shouldAnalyze: boolean) => {
  const [voiceJitter, setVoiceJitter] = useState(0);
  const [voiceIntensity, setVoiceIntensity] = useState(0);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);

  useEffect(() => {
    if (!shouldAnalyze) return;

    const initAudio = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        const source = audioContextRef.current.createMediaStreamSource(stream);
        analyserRef.current = audioContextRef.current.createAnalyser();
        analyserRef.current.fftSize = 512;
        source.connect(analyserRef.current);
        
        const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
        
        const loop = () => {
          if (!analyserRef.current) return;
          analyserRef.current.getByteFrequencyData(dataArray);
          
          let sum = 0;
          for(let i=0; i < dataArray.length; i++) sum += dataArray[i];
          const intensity = sum / dataArray.length / 255;
          
          setVoiceIntensity(intensity);
          
          if (intensity > 0.05) {
            setVoiceJitter(prev => prev * 0.95 + (Math.random() * 0.05) * 0.05); // Proxy jitter
          }
          
          if (shouldAnalyze) requestAnimationFrame(loop);
        };
        loop();
      } catch (err) {
        console.error('Audio analysis initialization failed', err);
      }
    };

    initAudio();

    return () => {
      if (audioContextRef.current) audioContextRef.current.close();
      audioContextRef.current = null;
      analyserRef.current = null;
    };
  }, [shouldAnalyze]);

  return { voiceJitter, voiceIntensity };
};
