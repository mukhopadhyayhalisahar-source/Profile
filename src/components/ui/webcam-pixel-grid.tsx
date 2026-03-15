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
  maxElevation = 45,
  motionSensitivity = 0.35,
  elevationSmoothing = 0.15,
  colorMode = "webcam",
  monochromeColor = "#5A46B9",
  backgroundColor = "#030303",
  mirror = true,
  gapRatio = 0.08,
  invertColors = false,
  darken = 0.7,
  borderColor = "#ffffff",
  borderOpacity = 0.05,
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
          description: 'Please enable camera permissions to use the interactive 3D voxel background.',
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

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: false });
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
        const boxW = cellW - gapX;
        const boxH = cellH - gapY;

        const centerX = gridCols / 2;
        const centerY = gridRows / 2;

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
            
            // Base Color
            let baseR = r, baseG = g, baseB = b;
            if (colorMode === "monochrome") {
              baseR = 90; baseG = 70; baseB = 185; 
            }
            if (invertColors) {
              baseR = 255 - baseR; baseG = 255 - baseG; baseB = 255 - baseB;
            }
            
            const darkFactor = 1 - darken;
            // Enhanced shading for better voxel depth
            const mainColor = `rgb(${baseR * darkFactor}, ${baseG * darkFactor}, ${baseB * darkFactor})`;
            const topColor = `rgb(${Math.min(255, (baseR + 80) * darkFactor)}, ${Math.min(255, (baseG + 80) * darkFactor)}, ${Math.min(255, (baseB + 80) * darkFactor)})`;
            const sideColor = `rgb(${Math.max(0, (baseR - 60) * darkFactor)}, ${Math.max(0, (baseG - 60) * darkFactor)}, ${Math.max(0, (baseB - 60) * darkFactor)})`;

            const drawX = i * cellW + gapX / 2;
            const drawY = j * cellH + gapY / 2;

            // Voxel depth and perspective offsets
            const depth = elevation;
            
            // Perspective extrusion: cubes tilt away from the center
            const perspectiveX = (i - centerX) / centerX * depth;
            const perspectiveY = (j - centerY) / centerY * depth;

            if (depth > 0.1) {
              // Side Face (Right/Left)
              ctx.fillStyle = sideColor;
              ctx.beginPath();
              ctx.moveTo(drawX + boxW, drawY);
              ctx.lineTo(drawX + boxW + perspectiveX, drawY + perspectiveY);
              ctx.lineTo(drawX + boxW + perspectiveX, drawY + boxH + perspectiveY);
              ctx.lineTo(drawX + boxW, drawY + boxH);
              ctx.closePath();
              ctx.fill();

              // Top Face
              ctx.fillStyle = topColor;
              ctx.beginPath();
              ctx.moveTo(drawX, drawY);
              ctx.lineTo(drawX + perspectiveX, drawY + perspectiveY);
              ctx.lineTo(drawX + boxW + perspectiveX, drawY + perspectiveY);
              ctx.lineTo(drawX + boxW, drawY);
              ctx.closePath();
              ctx.fill();

              // Front Face (Elevated)
              ctx.fillStyle = mainColor;
              ctx.fillRect(drawX + perspectiveX, drawY + perspectiveY, boxW, boxH);
              
              if (borderOpacity > 0) {
                ctx.strokeStyle = borderColor;
                ctx.globalAlpha = borderOpacity;
                ctx.lineWidth = 0.5;
                ctx.strokeRect(drawX + perspectiveX, drawY + perspectiveY, boxW, boxH);
                ctx.globalAlpha = 1.0;
              }
            } else {
              // Flat Voxel
              ctx.fillStyle = mainColor;
              ctx.fillRect(drawX, drawY, boxW, boxH);
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
              Please allow camera access in your browser settings to enable the reactive 3D voxel grid background.
            </AlertDescription>
          </Alert>
        </div>
      )}
    </div>
  );
}
