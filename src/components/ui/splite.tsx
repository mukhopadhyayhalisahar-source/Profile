
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
    let isMounted = true;
    let splineApp: any = null;

    const initSpline = async () => {
      try {
        // Direct dynamic import to ensure chunk loading is handled on client only
        const { Application } = await import('@splinetool/runtime');
        
        if (!isMounted || !canvasRef.current) return;

        splineApp = new Application(canvasRef.current);
        await splineApp.load(scene);
        
        if (isMounted) {
          setLoading(false);
        }
      } catch (error) {
        console.warn('Spline initialization issue:', error);
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    initSpline();

    return () => {
      isMounted = false;
      splineApp = null;
    };
  }, [scene]);

  return (
    <div className={`${className} relative overflow-hidden flex items-center justify-center`}>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 z-10 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="text-[10px] uppercase tracking-widest text-primary/60 font-bold">Initializing Engine</p>
          </div>
        </div>
      )}
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
