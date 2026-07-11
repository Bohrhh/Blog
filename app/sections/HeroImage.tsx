"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function HeroImage() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
      className="relative w-48 h-64 sm:w-64 sm:h-80"
    >
      {/* Soft brand glow behind the character */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-[radial-gradient(circle_at_50%_45%,_rgba(214,51,132,0.18)_0%,_rgba(56,189,248,0.10)_42%,_transparent_70%)] blur-2xl"
      />
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="relative w-full h-full"
      >
        <Image
          src="/images/character.webp"
          alt="3D Character"
          fill
          className="object-contain"
          sizes="(max-width: 640px) 192px, 256px"
          priority
        />
      </motion.div>
    </motion.div>
  )
}
