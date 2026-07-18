"use client"

import dynamic from "next/dynamic"

const Aurora = dynamic(() => import("@/components/Aurora"), { ssr: false })

export function AuroraBackground(props: any) {
  return <Aurora {...props} />
}
