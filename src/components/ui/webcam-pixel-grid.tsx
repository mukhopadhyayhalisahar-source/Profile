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
  backgroundColor?: string;
  mirror?: boolean;
  gapRatio?: number;
  darken?: number;
  className?: string;
  onWebcamReady?: () => void;
  onWebcamError?: (err: any) => void;
}

export function WebcamPixelGrid({
  gridCols = 60,
  gridRows = 40,
  maxElevation = 50,
  motionSensitivity = 0.35,
  elevationSmoothing = 0.15,
  colorMode = "webcam",
  backgroundColor = "#030303",
  mirror = true,
  gapRatio = 0.08,
  darken = 0.7,
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
        const boxW = cellW * (1 - gapRatio);
        const boxH = cellH * (1 - gapRatio);

        const centerX = width / 2;
        const centerY = height / 2;

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

            const idx = j * gridCols + i;
            const targetElevation = motion * motionSensitivity * maxElevation;
            elevationsRef.current[idx] += (targetElevation - elevationsRef.current[idx]) * elevationSmoothing;

            const elevation = elevationsRef.current[idx];
            if (elevation < 0.1) continue;

            const baseR = colorMode === "monochrome" ? 90 : r;
            const baseG = colorMode === "monochrome" ? 70 : g;
            const baseB = colorMode === "monochrome" ? 185 : b;

            const darkFactor = 1 - darken;
            const mainColor = `rgb(${baseR * darkFactor}, ${baseG * darkFactor}, ${baseB * darkFactor})`;
            const topColor = `rgb(${Math.min(255, (baseR + 60) * darkFactor)}, ${Math.min(255, (baseG + 60) * darkFactor)}, ${Math.min(255, (baseB + 60) * darkFactor)})`;
            const sideColor = `rgb(${Math.max(0, (baseR - 40) * darkFactor)}, ${Math.max(0, (baseG - 40) * darkFactor)}, ${Math.max(0, (baseB - 40) * darkFactor)})`;

            const drawX = i * cellW + (cellW * gapRatio) / 2;
            const drawY = j * cellH + (cellH * gapRatio) / 2;

            // Perspective extrusion offsets
            const perspectiveX = (drawX - centerX) / centerX * elevation;
            const perspectiveY = (drawY - centerY) / centerY * elevation;

            // Side Face
            ctx.fillStyle = sideColor;
            ctx.beginPath();
            ctx.moveTo(drawX + boxW, drawY);
            ctx.lineTo(drawX + boxW + perspectiveX, drawY + perspectiveY);
            ctx.lineTo(drawX + boxW + perspectiveX, drawY + boxH + perspectiveY);
            ctx.lineTo(drawX + boxW, drawY + boxH);
            ctx.fill();

            // Top Face
            ctx.fillStyle = topColor;
            ctx.beginPath();
            ctx.moveTo(drawX, drawY);
            ctx.lineTo(drawX + perspectiveX, drawY + perspectiveY);
            ctx.lineTo(drawX + boxW + perspectiveX, drawY + perspectiveY);
            ctx.lineTo(drawX + boxW, drawY);
            ctx.fill();

            // Front Face
            ctx.fillStyle = mainColor;
            ctx.fillRect(drawX + perspectiveX, drawY + perspectiveY, boxW, boxH);
          }
        }
        previousFrameRef.current = new Uint8ClampedArray(data);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, [hasCameraPermission, gridCols, gridRows, maxElevation, motionSensitivity, elevationSmoothing, colorMode, backgroundColor, mirror, gapRatio, darken]);

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
          <Alert variant="destructive" className="max-w-md">
            <AlertTitle>Camera Required</AlertTitle>
            <AlertDescription>
              Please allow camera access to enable the reactive 3D voxel background.
            </AlertDescription>
          </Alert>
        </div>
      )}
    </div>
  );
}