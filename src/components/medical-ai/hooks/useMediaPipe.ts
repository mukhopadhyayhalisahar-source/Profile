
'use client';

import { useEffect, useRef, useState } from 'react';
import { FaceLandmarker, FilesetResolver } from '@mediapipe/tasks-vision';

export const useMediaPipe = () => {
  const faceLandmarkerRef = useRef<FaceLandmarker | null>(null);
  const [isModelLoading, setIsModelLoading] = useState(true);
  const [landmarks, setLandmarks] = useState<any>(null);
  const [fps, setFps] = useState(0);

  useEffect(() => {
    const initMediaPipe = async () => {
      try {
        const filesetResolver = await FilesetResolver.forVisionTasks(
          'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm'
        );
        const landmarker = await FaceLandmarker.createFromOptions(filesetResolver, {
          baseOptions: {
            modelAssetPath: 'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task',
            delegate: 'GPU'
          },
          runningMode: 'VIDEO',
          numFaces: 1,
        });
        faceLandmarkerRef.current = landmarker;
        setIsModelLoading(false);
      } catch (err) {
        console.error('Failed to initialize MediaPipe:', err);
        setIsModelLoading(false);
      }
    };
    initMediaPipe();
  }, []);

  const detectLandmarks = (video: HTMLVideoElement) => {
    if (!faceLandmarkerRef.current || video.readyState < 2) return;

    const startTime = performance.now();
    const results = faceLandmarkerRef.current.detectForVideo(video, startTime);
    setLandmarks(results);

    // Simple FPS calculation
    const now = performance.now();
    setFps(Math.round(1000 / (now - startTime)));
  };

  return { landmarks, isModelLoading, detectLandmarks, fps };
};
