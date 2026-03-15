'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import { Loader2 } from 'lucide-react'

// Use next/dynamic with ssr: false to completely isolate the Spline runtime from the server.
// This prevents "ReactCurrentOwner" errors which occur when Spline tries to access React 19 internals during SSR.
const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-black/20 backdrop-blur-sm min-h-[300px]">
      <Loader2 className="w-8 h-8 animate-spin text-primary" />
    </div>
  ),
})

interface SplineSceneProps {
  scene: string
  className?: string
}

/**
 * A hydration-safe wrapper for Spline scenes.
 * Renders a loader until the browser is ready to initialize the 3D runtime.
 */
export function SplineScene({ scene, className }: SplineSceneProps) {
  return (
    <div className="w-full h-full relative">
      <Spline
        scene={scene}
        className={className}
      />
    </div>
  )
}
