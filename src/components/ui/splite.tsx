
'use client';

import { useEffect, useRef, useState } from 'react';

interface SplineSceneProps {
  scene: string;
  className?: string;
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let splineApp: any = null;

    const initSpline = async () => {
      try {
        const { Application } = await import('@splinetool/runtime');
        if (!canvasRef.current) return;

        splineApp = new Application(canvasRef.current);
        await splineApp.load(scene);
        setLoading(false);
      } catch (error) {
        console.error('Error loading Spline scene:', error);
        setLoading(false);
      }
    };

    initSpline();

    return () => {
      // Cleanup if necessary
    };
  }, [scene]);

  return (
    <div className={className + " relative overflow-hidden"}>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 z-10">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
