import HeroImage from "@/app/sections/HeroImage"
import CloudBackgroundClient from "@/app/components/CloudBackgroundClient"

export default function Hero() {
  return (
    <section className="relative min-h-[400px] pt-16 overflow-hidden">
      {/* Cloud Background */}
      <CloudBackgroundClient />

      {/* Content */}
      <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 py-12">
        <div className="flex items-center justify-between">
          {/* Left side - could add text here if needed */}
          <div className="flex-1" />

          {/* Right side - 3D Character */}
          <HeroImage />
        </div>
      </div>
    </section>
  )
}
