
'use client';

import { useEffect, useRef, useState } from 'react';

const EAR_THRESHOLD = 0.22;

export const useBlinkDetection = (landmarks: any) => {
  const [blinkCount, setBlinkCount] = useState(0);
  const [blinkRate, setBlinkRate] = useState(0);
  const [blinkDuration, setBlinkDuration] = useState(0);
  const isBlinkingRef = useRef(false);
  const blinkStartTimeRef = useRef(0);
  const lastResetRef = useRef(performance.now());
  const historyRef = useRef<number[]>([]);

  const calculateEAR = (eye: any[]) => {
    const dist = (p1: any, p2: any) => Math.sqrt((p1.x - p2.x)**2 + (p1.y - p2.y)**2);
    const v1 = dist(eye[1], eye[5]);
    const v2 = dist(eye[2], eye[4]);
    const h = dist(eye[0], eye[3]);
    return (v1 + v2) / (2 * h);
  };

  useEffect(() => {
    if (!landmarks || !landmarks.faceLandmarks || landmarks.faceLandmarks.length === 0) return;

    const face = landmarks.faceLandmarks[0];
    
    // Left eye indices
    const leftEyeIdx = [33, 160, 158, 133, 153, 144];
    const leftEye = leftEyeIdx.map(i => face[i]);
    
    // Right eye indices
    const rightEyeIdx = [362, 385, 387, 263, 373, 380];
    const rightEye = rightEyeIdx.map(i => face[i]);

    const leftEAR = calculateEAR(leftEye);
    const rightEAR = calculateEAR(rightEye);
    const avgEAR = (leftEAR + rightEAR) / 2;

    if (avgEAR < EAR_THRESHOLD) {
      if (!isBlinkingRef.current) {
        isBlinkingRef.current = true;
        blinkStartTimeRef.current = performance.now();
      }
    } else {
      if (isBlinkingRef.current) {
        isBlinkingRef.current = false;
        const duration = performance.now() - blinkStartTimeRef.current;
        setBlinkDuration(duration);
        setBlinkCount(prev => prev + 1);
        historyRef.current.push(duration);
      }
    }

    // Calculate Rate per Minute
    const now = performance.now();
    const elapsed = (now - lastResetRef.current) / 1000;
    if (elapsed >= 60) {
      setBlinkRate(blinkCount);
      setBlinkCount(0);
      lastResetRef.current = now;
    }
  }, [landmarks, blinkCount]);

  return { blinkCount, blinkRate, blinkDuration };
};
