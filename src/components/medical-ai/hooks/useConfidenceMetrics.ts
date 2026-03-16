
'use client';

import { useMemo } from 'react';

export const useConfidenceMetrics = (landmarks: any, fps: number) => {
  const confidenceScore = useMemo(() => {
    if (!landmarks || !landmarks.faceLandmarks || landmarks.faceLandmarks.length === 0) return 0;

    let score = 100;

    // Penalty for low FPS
    if (fps < 15) score -= 40;
    else if (fps < 25) score -= 15;

    // Penalty for head distance (too close or too far)
    const face = landmarks.faceLandmarks[0];
    const leftEye = face[33];
    const rightEye = face[263];
    const eyeDist = Math.sqrt((leftEye.x - rightEye.x)**2 + (leftEye.y - rightEye.y)**2);
    
    if (eyeDist < 0.1) score -= 30; // Too far
    if (eyeDist > 0.4) score -= 20; // Too close

    // Penalty for extreme rotation (profile view)
    const nose = face[1];
    const midlineX = (leftEye.x + rightEye.x) / 2;
    const deviation = Math.abs(nose.x - midlineX);
    if (deviation > 0.05) score -= 25;

    return Math.max(0, Math.min(100, score));
  }, [landmarks, fps]);

  const qualityStatus = useMemo(() => {
    if (confidenceScore > 80) return 'EXCELLENT';
    if (confidenceScore > 50) return 'ACCEPTABLE';
    return 'LOW_QUALITY';
  }, [confidenceScore]);

  return { confidenceScore, qualityStatus };
};
