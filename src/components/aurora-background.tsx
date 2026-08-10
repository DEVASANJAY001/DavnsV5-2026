import React from "react"

export function AuroraBackground() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 w-full h-full pointer-events-none overflow-hidden z-0 bg-white"
    >
      {/* Top Soft Blue Ambient Wash */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-gradient-to-b from-blue-500/10 via-indigo-500/5 to-transparent rounded-full blur-[150px] opacity-80 animate-pulse-glow" />

      {/* Mid Left Soft Cyan/Teal Ambient Orb */}
      <div className="absolute top-1/3 -left-40 w-[650px] h-[500px] bg-gradient-to-r from-sky-400/10 via-blue-500/5 to-transparent rounded-full blur-[140px] opacity-70" />

      {/* Bottom Right Soft Emerald/Indigo Ambient Orb */}
      <div className="absolute bottom-10 -right-40 w-[700px] h-[500px] bg-gradient-to-l from-indigo-500/8 via-sky-500/5 to-transparent rounded-full blur-[150px] opacity-60" />

      {/* Subtle Precision Dot-Grid Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_20%,#000_60%,transparent_100%)] opacity-70" />
    </div>
  )
}
