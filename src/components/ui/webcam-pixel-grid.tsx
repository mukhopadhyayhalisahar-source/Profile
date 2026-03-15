"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

interface WebcamPixelGridProps {
  gridCols?: number;
  gridRows?: number;
  maxElevation?: number;
  motionSensitivity?: number;
  elevationSmoothing?: number;
  colorMode?: "webcam" | "monochrome";
  monochromeColor?: string;
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
  maxElevation = 50,
  motionSensitivity = 0.25,
  elevationSmoothing = 0.2,
  colorMode = "webcam",
  monochromeColor = "#5A46B9",
  backgroundColor = "#030303",
  mirror = true,
  gapRatio = 0.05,
  invertColors = false,
  darken = 0.6,
  borderColor = "#ffffff",
  borderOpacity = 0.06,
  className,
  onWebcamReady,
  onWebcamError,
}: WebcamPixelGridProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const procCanvasRef = useRef<HTMLCanvasElement>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const previousFrameRef = useRef<Uint8ClampedArray | null>(null);
  const elevationsRef = useRef<number[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const getCameraPermission = async () => {
      try {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          throw new Error("MediaDevices API not supported");
        }
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setHasCameraPermission(true);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        onWebcamReady?.();
      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
        onWebcamError?.(error);
        toast({
          variant: 'destructive',
          title: 'Camera Access Denied',
          description: 'Please enable camera permissions to use the interactive 3D background.',
        });
      }
    };

    getCameraPermission();

    return () => {
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    if (!hasCameraPermission || !canvasRef.current || !videoRef.current) return;

    const ctx = canvasRef.current.getContext("2d", { alpha: false });
    if (!ctx) return;

    const procCanvas = procCanvasRef.current || document.createElement('canvas');
    procCanvas.width = gridCols;
    procCanvas.height = gridRows;
    const procCtx = procCanvas.getContext("2d", { willReadFrequently: true });
    if (!procCtx) return;

    elevationsRef.current = new Array(gridCols * gridRows).fill(0);

    let animationFrameId: number;

    const render = () => {
      if (!videoRef.current || !canvasRef.current) return;

      const { width, height } = canvasRef.current;
      
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, width, height);

      if (videoRef.current.readyState >= 2) {
        procCtx.drawImage(videoRef.current, 0, 0, gridCols, gridRows);
        const imageData = procCtx.getImageData(0, 0, gridCols, gridRows);
        const data = imageData.data;

        const cellW = width / gridCols;
        const cellH = height / gridRows;
        const gapX = cellW * gapRatio;
        const gapY = cellH * gapRatio;

        for (let j = 0; j < gridRows; j++) {
          for (let i = 0; i < gridCols; i++) {
            const colIndex = mirror ? (gridCols - 1 - i) : i;
            const pixelIndex = (j * gridCols + colIndex) * 4;
            const r = data[pixelIndex];
            const g = data[pixelIndex + 1];
            const b = data[pixelIndex + 2];

            let motion = 0;
            if (previousFrameRef.current) {
              const pr = previousFrameRef.current[pixelIndex];
              const pg = previousFrameRef.current[pixelIndex + 1];
              const pb = previousFrameRef.current[pixelIndex + 2];
              motion = (Math.abs(r - pr) + Math.abs(g - pg) + Math.abs(b - pb)) / 765;
            }

            const targetElevation = motion * motionSensitivity * maxElevation;
            const idx = j * gridCols + i;
            elevationsRef.current[idx] += (targetElevation - elevationsRef.current[idx]) * elevationSmoothing;

            const elevation = elevationsRef.current[idx];
            
            let color;
            if (colorMode === "webcam") {
              const dr = invertColors ? 255 - r : r;
              const dg = invertColors ? 255 - g : g;
              const db = invertColors ? 255 - b : b;
              color = `rgb(${dr * (1 - darken)}, ${dg * (1 - darken)}, ${db * (1 - darken)})`;
            } else {
              color = monochromeColor;
            }

            const drawX = i * cellW + gapX / 2;
            const drawY = j * cellH + gapY / 2;
            const drawW = cellW - gapX;
            const drawH = cellH - gapY;

            // 3D Voxel Rendering
            if (elevation > 0.5) {
              const perspectiveX = elevation * 0.4;
              const perspectiveY = elevation * 0.4;

              // Draw Depth (Sides of the cube)
              ctx.fillStyle = `rgba(0,0,0,0.4)`;
              ctx.beginPath();
              ctx.moveTo(drawX, drawY);
              ctx.lineTo(drawX + perspectiveX, drawY - perspectiveY);
              ctx.lineTo(drawX + drawW + perspectiveX, drawY - perspectiveY);
              ctx.lineTo(drawX + drawW, drawY);
              ctx.fill();

              ctx.beginPath();
              ctx.moveTo(drawX + drawW, drawY);
              ctx.lineTo(drawX + drawW + perspectiveX, drawY - perspectiveY);
              ctx.lineTo(drawX + drawW + perspectiveX, drawY + drawH - perspectiveY);
              ctx.lineTo(drawX + drawW, drawY + drawH);
              ctx.fill();

              // Draw Top Face (The elevated pixel)
              ctx.fillStyle = color;
              ctx.fillRect(drawX + perspectiveX, drawY - perspectiveY, drawW, drawH);
            } else {
              ctx.fillStyle = color;
              ctx.fillRect(drawX, drawY, drawW, drawH);
            }
            
            if (borderOpacity > 0) {
              ctx.strokeStyle = borderColor;
              ctx.globalAlpha = borderOpacity;
              ctx.lineWidth = 0.5;
              ctx.strokeRect(drawX, drawY, drawW, drawH);
              ctx.globalAlpha = 1.0;
            }
          }
        }
        previousFrameRef.current = new Uint8ClampedArray(data);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, [hasCameraPermission, gridCols, gridRows, maxElevation, motionSensitivity, elevationSmoothing, colorMode, monochromeColor, backgroundColor, mirror, gapRatio, invertColors, darken, borderColor, borderOpacity]);

  return (
    <div className={cn("relative overflow-hidden w-full h-full", className)}>
      <video ref={videoRef} autoPlay muted playsInline className="absolute opacity-0 pointer-events-none w-0 h-0" />
      <canvas 
        ref={canvasRef} 
        width={1200} 
        height={800} 
        className="w-full h-full object-cover"
      />
      
      {hasCameraPermission === false && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
          <Alert variant="destructive" className="max-w-md bg-background/95">
            <AlertTitle>Camera Access Required</AlertTitle>
            <AlertDescription>
              Please allow camera access in your browser settings to enable the 3D motion-reactive grid.
            </AlertDescription>
          </Alert>
        </div>
      )}
    </div>
  );
}