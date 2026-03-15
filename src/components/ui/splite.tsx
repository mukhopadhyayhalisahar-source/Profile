
'use client'

import dynamic from 'next/dynamic'
import { Loader2 } from 'lucide-react'

// Use next/dynamic with ssr: false to prevent ReactCurrentOwner errors on the server
// and ensure Spline only runs in the browser environment.
const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-black/20 backdrop-blur-sm">
      <Loader2 className="w-8 h-8 animate-spin text-primary" />
    </div>
  )
})

interface SplineSceneProps {
  scene: string
  className?: string
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  return (
    <Spline
      scene={scene}
      className={className}
    />
  )
}
