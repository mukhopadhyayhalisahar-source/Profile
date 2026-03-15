'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Loader2 } from 'lucide-react'

interface SplineSceneProps {
  scene: string
  className?: string
}

/**
 * A robust, hydration-safe wrapper for Spline scenes.
 * Bypasses the React wrapper components to avoid React 19 "ReactCurrentOwner" errors
 * by using the @splinetool/runtime directly on a canvas element.
 */
export function SplineScene({ scene, className }: SplineSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let splineRuntime: any = null

    async function initSpline() {
      if (!canvasRef.current) return

      try {
        // Dynamically import the Application class from the runtime
        const { Application } = await import('@splinetool/runtime')
        
        // Initialize the vanilla JS application on our canvas ref
        splineRuntime = new Application(canvasRef.current)
        
        // Load the scene file
        await splineRuntime.load(scene)
        
        setIsLoading(false)
      } catch (err) {
        console.error('Spline loading error:', err)
        setError('Failed to initialize 3D scene')
        setIsLoading(false)
      }
    }

    initSpline()

    return () => {
      // Basic cleanup: if the runtime provides a stop/dispose method in future versions, 
      // it should be called here. For current versions, removing the canvas via React cleanup is sufficient.
    }
  }, [scene])

  return (
    <div className={(className || "") + " relative flex items-center justify-center overflow-hidden min-h-[300px]"}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/10 backdrop-blur-sm z-10 rounded-xl">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      )}
      
      {error ? (
        <div className="text-destructive text-sm bg-destructive/10 p-4 rounded-lg border border-destructive/20">
          {error}
        </div>
      ) : (
        <canvas 
          ref={canvasRef} 
          className="w-full h-full"
          style={{ opacity: isLoading ? 0 : 1, transition: 'opacity 0.5s ease-in-out' }}
        />
      )}
    </div>
  )
}
