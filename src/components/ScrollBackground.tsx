import type { ReactNode } from 'react'
import ColorBends from './ColorBends'

export function LaserField(_props?: { variant?: string; className?: string }) {
  return null
}

function ScrollBackground({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-black selection:bg-color-accent selection:text-color-papel">
      {/* Interactive WebGL ColorBends Background */}
      <div className="fixed inset-0 z-0 pointer-events-none w-screen h-screen">
        <ColorBends
          colors={['#3b82f6']}
          rotation={140}
          autoRotate={0}
          speed={0.2}
          scale={1}
          frequency={1}
          warpStrength={1}
          mouseInfluence={0}
          parallax={0}
          noise={0.09}
          iterations={1}
          intensity={1.8}
          bandWidth={8}
          transparent={true}
        />
      </div>

      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}

export default ScrollBackground
