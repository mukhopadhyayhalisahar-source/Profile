
'use client';

import { useState, useEffect, useRef } from 'react';

export const useGazeTracking = (landmarks: any) => {
  const [gazeVector, setGazeVector] = useState({ x: 0, y: 0 });
  const [saccadeSpeed, setSaccadeSpeed] = useState(0);
  const lastGazeRef = useRef({ x: 0, y: 0, time: Date.now() });

  useEffect(() => {
    if (!landmarks || !landmarks.faceLandmarks || landmarks.faceLandmarks.length === 0) return;

    const face = landmarks.faceLandmarks[0];
    
    // Iris/Pupil indices (approximate MediaPipe face mesh landmarks)
    const leftPupil = face[468]; // Iris center proxy
    const rightPupil = face[473];
    
    if (!leftPupil || !rightPupil) return;

    // Calculate gaze vector relative to face orientation
    const currentGaze = {
      x: (leftPupil.x + rightPupil.x) / 2 - face[1].x, // Relative to nose
      y: (leftPupil.y + rightPupil.y) / 2 - face[1].y
    };

    setGazeVector(currentGaze);

    // Calculate saccade speed
    const now = Date.now();
    const dt = (now - lastGazeRef.current.time) / 1000;
    if (dt > 0) {
      const dist = Math.sqrt(
        (currentGaze.x - lastGazeRef.current.x)**2 + 
        (currentGaze.y - lastGazeRef.current.y)**2
      );
      // Map normalized coordinate shift to degrees (heuristic)
      const speed = (dist * 180) / dt; 
      if (speed > 5) { // Threshold for saccadic movement
        setSaccadeSpeed(prev => prev * 0.8 + speed * 0.2);
      }
    }

    lastGazeRef.current = { ...currentGaze, time: now };
  }, [landmarks]);

  return { gazeVector, saccadeSpeed };
};
