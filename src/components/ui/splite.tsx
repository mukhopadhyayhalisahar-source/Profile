
'use client'

import React, { useState, useEffect, Suspense, lazy } from 'react'
import { Loader2 } from 'lucide-react'

// Lazy load Spline to prevent it from initializing during SSR
const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Do not render anything until client-side hydration is complete
  if (!mounted) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-black/20 backdrop-blur-sm min-h-[300px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <Suspense 
      fallback={
        <div className="w-full h-full flex items-center justify-center bg-black/20 backdrop-blur-sm min-h-[300px]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      }
    >
      <Spline
        scene={scene}
        className={className}
      />
    </Suspense>
  )
}
