
'use client';

import { useEffect, useState } from 'react';

export const useFacialSymmetry = (landmarks: any) => {
  const [symmetryScore, setSymmetryScore] = useState(100);

  useEffect(() => {
    if (!landmarks || !landmarks.faceLandmarks || landmarks.faceLandmarks.length === 0) return;

    const face = landmarks.faceLandmarks[0];

    // Compare mirrored pairs
    const pairs = [
      { left: 33, right: 263 }, // Eye corners
      { left: 61, right: 291 }, // Mouth corners
      { left: 70, right: 300 }, // Eyebrows
    ];

    let totalDiff = 0;
    pairs.forEach(pair => {
      const left = face[pair.left];
      const right = face[pair.right];
      
      // Calculate horizontal symmetry relative to midline (approx midline is x=0.5)
      const leftDist = Math.abs(0.5 - left.x);
      const rightDist = Math.abs(right.x - 0.5);
      
      totalDiff += Math.abs(leftDist - rightDist);
    });

    const avgDiff = totalDiff / pairs.length;
    // Normalize difference to a 0-100 score (lower diff = higher symmetry)
    const score = Math.max(0, 100 - (avgDiff * 1000));
    setSymmetryScore(score);
  }, [landmarks]);

  return { symmetryScore };
};
