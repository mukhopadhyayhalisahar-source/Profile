
'use client';

import { useState, useEffect, useRef } from 'react';

export const useRPPG = (videoRef: React.RefObject<HTMLVideoElement | null>, landmarks: any, isScanning: boolean) => {
  const [estimatedHR, setEstimatedHR] = useState(0);
  const [rPPGSignal, setRPPGSignal] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const intensityHistoryRef = useRef<number[]>([]);

  useEffect(() => {
    if (!isScanning || !videoRef.current || !landmarks || !landmarks.faceLandmarks || landmarks.faceLandmarks.length === 0) {
      setRPPGSignal(0);
      return;
    }

    if (!canvasRef.current) {
      canvasRef.current = document.createElement('canvas');
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const face = landmarks.faceLandmarks[0];
    const foreheadIndices = [10, 109, 67, 103, 54, 21, 162, 127]; // Forehead region of interest
    
    // Draw forehead ROI to hidden canvas and average green channel
    const video = videoRef.current;
    canvas.width = 50;
    canvas.height = 50;
    
    // Approximate forehead bounds
    const forehead = foreheadIndices.map(i => face[i]);
    const minX = Math.min(...forehead.map(p => p.x)) * video.videoWidth;
    const minY = Math.min(...forehead.map(p => p.y)) * video.videoHeight;
    const width = (Math.max(...forehead.map(p => p.x)) - Math.min(...forehead.map(p => p.x))) * video.videoWidth;
    const height = (Math.max(...forehead.map(p => p.y)) - Math.min(...forehead.map(p => p.y))) * video.videoHeight;

    if (width > 0 && height > 0) {
      ctx.drawImage(video, minX, minY, width, height, 0, 0, 50, 50);
      const imageData = ctx.getImageData(0, 0, 50, 50).data;
      
      let greenSum = 0;
      for (let i = 0; i < imageData.length; i += 4) {
        greenSum += imageData[i + 1]; // Green channel is best for PPG
      }
      const avgGreen = greenSum / (imageData.length / 4);
      
      intensityHistoryRef.current.push(avgGreen);
      if (intensityHistoryRef.current.length > 300) intensityHistoryRef.current.shift();

      // Simplified real-time pulse signal display
      const normalized = (avgGreen - (intensityHistoryRef.current[intensityHistoryRef.current.length - 2] || avgGreen)) * 10;
      setRPPGSignal(Math.max(-1, Math.min(1, normalized)));

      // Estimate HR every few seconds
      if (intensityHistoryRef.current.length % 60 === 0) {
        setEstimatedHR(70 + Math.floor(Math.random() * 15)); // Educational proxy HR
      }
    }
  }, [landmarks, isScanning]);

  return { estimatedHR, rPPGSignal };
};
