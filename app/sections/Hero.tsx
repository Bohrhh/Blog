"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import CloudBackground from "@/app/components/CloudBackground"

export default function Hero() {
  return (
    <section className="relative min-h-[400px] pt-16 overflow-hidden">
      {/* Cloud Background */}
      <CloudBackground />

      {/* Content */}
      <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 py-12">
        <div className="flex items-center justify-between">
          {/* Left side - could add text here if needed */}
          <div className="flex-1" />

          {/* Right side - 3D Character */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="relative w-48 h-64 sm:w-64 sm:h-80"
          >
            <motion.div
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-full h-full"
            >
              <Image
                src="/images/character.png"
                alt="3D Character"
                fill
                className="object-contain"
                priority
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>

  )
}