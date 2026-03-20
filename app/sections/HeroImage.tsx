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
      <motion.div
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
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
