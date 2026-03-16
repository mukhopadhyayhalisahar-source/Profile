
'use client';

import { useState, useEffect, useRef } from 'react';

export const useOromotor = (landmarks: any) => {
  const [jawSpeed, setJawSpeed] = useState(0);
  const [oromotorStability, setOromotorStability] = useState(100);
  const lastJawPosRef = useRef({ y: 0, time: Date.now() });
  const cycleCountRef = useRef(0);

  useEffect(() => {
    if (!landmarks || !landmarks.faceLandmarks || landmarks.faceLandmarks.length === 0) return;

    const face = landmarks.faceLandmarks[0];
    const chin = face[152]; // Chin landmark
    
    const now = Date.now();
    const dt = (now - lastJawPosRef.current.time) / 1000;
    
    if (dt > 0.03) { // 30Hz limit
      const dy = Math.abs(chin.y - lastJawPosRef.current.y);
      if (dy > 0.005) { // Detected movement
        cycleCountRef.current += dy;
        setJawSpeed(prev => prev * 0.9 + (dy / dt) * 0.1);
      }
      
      lastJawPosRef.current = { y: chin.y, time: now };
    }

    // Heuristic oromotor stability
    const mouthDist = Math.sqrt((face[13].x - face[14].x)**2 + (face[13].y - face[14].y)**2);
    setOromotorStability(prev => prev * 0.99 + (100 - mouthDist * 1000) * 0.01);

  }, [landmarks]);

  return { jawSpeed, oromotorStability };
};
