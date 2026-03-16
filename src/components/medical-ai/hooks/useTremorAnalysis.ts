
'use client';

import { useEffect, useRef, useState } from 'react';
import FFT from 'fft.js';

export const useTremorAnalysis = (landmarks: any) => {
  const [tremorFrequency, setTremorFrequency] = useState(0);
  const [tremorAmplitude, setTremorAmplitude] = useState(0);
  const positionHistoryRef = useRef<number[]>([]);
  const SAMPLE_SIZE = 64; // Power of 2 for FFT

  useEffect(() => {
    if (!landmarks || !landmarks.faceLandmarks || landmarks.faceLandmarks.length === 0) return;

    const face = landmarks.faceLandmarks[0];
    const nosePos = face[1]; // Nose tip landmark

    // Use X-axis displacement for tremor detection
    positionHistoryRef.current.push(nosePos.x);

    if (positionHistoryRef.current.length > SAMPLE_SIZE) {
      positionHistoryRef.current.shift();
    }

    if (positionHistoryRef.current.length === SAMPLE_SIZE) {
      analyze();
    }
  }, [landmarks]);

  const analyze = () => {
    const data = positionHistoryRef.current;
    
    // Detrend data (remove DC offset)
    const mean = data.reduce((a, b) => a + b, 0) / SAMPLE_SIZE;
    const detrended = data.map(x => x - mean);

    // FFT analysis
    const fft = new FFT(SAMPLE_SIZE);
    const spectrum = fft.createComplexArray();
    fft.transform(spectrum, detrended);

    // Find dominant frequency magnitude
    let maxMag = 0;
    let peakIdx = 0;
    
    // Index 0 is DC, so start from 1
    for (let i = 1; i < SAMPLE_SIZE / 2; i++) {
      const re = spectrum[i * 2];
      const im = spectrum[i * 2 + 1];
      const mag = Math.sqrt(re * re + im * im);
      if (mag > maxMag) {
        maxMag = mag;
        peakIdx = i;
      }
    }

    // Assuming 30 FPS for calculation
    const freqHz = (peakIdx * 30) / SAMPLE_SIZE;
    const amplitude = maxMag / SAMPLE_SIZE;

    setTremorFrequency(freqHz);
    setTremorAmplitude(amplitude);
  };

  return { tremorFrequency, tremorAmplitude };
};
