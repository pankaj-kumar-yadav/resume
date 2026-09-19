"use client"

import { ReactLenis } from "lenis/react"
import type { ReactNode } from "react"

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        autoRaf: true,
        lerp: 0.1,
        smoothWheel: true,
        syncTouch: false,
        stopInertiaOnNavigate: true,
      }}
    >
      {children}
    </ReactLenis>
  )
}
