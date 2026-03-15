'use client'

import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { Loader2 } from 'lucide-react'

/**
 * Dynamically import the Spline component with SSR disabled.
 */
const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
})

interface SplineSceneProps {
  scene: string
  className?: string
}

/**
 * A hydration-safe wrapper for Spline scenes.
 * Uses both next/dynamic (ssr: false) and a mounted state guard 
 * to prevent React 19 "ReactCurrentOwner" errors during initial render.
 */
export function SplineScene({ scene, className }: SplineSceneProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Return a loader during SSR and the initial hydration pass
  if (!isMounted) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-black/20 backdrop-blur-sm min-h-[300px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="w-full h-full relative">
      <Spline
        scene={scene}
        className={className}
      />
    </div>
  )
}
