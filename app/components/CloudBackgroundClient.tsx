"use client"

import dynamic from "next/dynamic"

const CloudBackground = dynamic(() => import("@/app/components/CloudBackground"), { ssr: false })

export default function CloudBackgroundClient() {
  return <CloudBackground />
}
