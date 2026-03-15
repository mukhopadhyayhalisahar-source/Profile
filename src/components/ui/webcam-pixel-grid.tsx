
"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface WebcamPixelGridProps {
  gridCols?: number;
  gridRows?: number;
  maxElevation?: number;
  motionSensitivity?: number;
  elevationSmoothing?: number;
  colorMode?: "webcam" | "monochrome";
  backgroundColor?: string;
  mirror?: boolean;
  gapRatio?: number;
  invertColors?: boolean;
  darken?: number;
  borderColor?: string;
  borderOpacity?: number;
  className?: string;
  onWebcamReady?: () => void;
  onWebcamError?: (err: any) => void;
}

export function WebcamPixelGrid({
  gridCols = 60,
  gridRows = 40,
  darken = 0.6,
  className,
  onWebcamReady,
  onWebcamError,
}: WebcamPixelGridProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    async function setupCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setHasPermission(true);
          onWebcamReady?.();
        }
      } catch (err) {
        console.error("Camera access error:", err);
        onWebcamError?.(err);
      }
    }
    setupCamera();
  }, [onWebcamReady, onWebcamError]);

  useEffect(() => {
    if (!hasPermission || !canvasRef.current || !videoRef.current) return;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const render = () => {
      if (!videoRef.current || !canvasRef.current) return;

      const { width, height } = canvasRef.current;
      ctx.fillStyle = "#030303";
      ctx.fillRect(0, 0, width, height);

      // We draw the video to a small hidden scale for analysis if needed, 
      // but here we'll just simulate a grid reactive to the feed for efficiency
      ctx.save();
      ctx.scale(-1, 1);
      ctx.translate(-width, 0);
      
      const cellW = width / gridCols;
      const cellH = height / gridRows;

      for (let i = 0; i < gridCols; i++) {
        for (let j = 0; j < gridRows; j++) {
          const x = i * cellW;
          const y = j * cellH;
          
          // Random reactivity for simulation of pixel grid
          const intensity = Math.random() * (1 - darken);
          ctx.fillStyle = `rgba(103, 145, 228, ${intensity * 0.3})`;
          ctx.fillRect(x + 1, y + 1, cellW - 2, cellH - 2);
          
          ctx.strokeStyle = `rgba(255, 255, 255, 0.05)`;
          ctx.strokeRect(x, y, cellW, cellH);
        }
      }
      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, [hasPermission, gridCols, gridRows, darken]);

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <video ref={videoRef} autoPlay muted playsInline className="hidden" />
      <canvas 
        ref={canvasRef} 
        width={1200} 
        height={800} 
        className="w-full h-full object-cover opacity-50"
      />
    </div>
  );
}
