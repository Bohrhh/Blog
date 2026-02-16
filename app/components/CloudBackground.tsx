"use client"

import { motion } from "framer-motion"

export default function CloudBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Cloud 1 - Top left */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-20 top-20 opacity-80"
      >
        <svg width="300" height="150" viewBox="0 0 300 150" fill="none">
          <ellipse cx="80" cy="100" rx="60" ry="40" fill="white" fillOpacity="0.6" />
          <ellipse cx="150" cy="80" rx="70" ry="50" fill="white" fillOpacity="0.7" />
          <ellipse cx="220" cy="100" rx="60" ry="40" fill="white" fillOpacity="0.6" />
          <ellipse cx="150" cy="110" rx="80" ry="35" fill="white" fillOpacity="0.5" />
        </svg>
      </motion.div>

      {/* Cloud 2 - Top right */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute right-10 top-10 opacity-70"
      >
        <svg width="250" height="120" viewBox="0 0 250 120" fill="none">
          <ellipse cx="60" cy="80" rx="50" ry="35" fill="white" fillOpacity="0.5" />
          <ellipse cx="125" cy="60" rx="60" ry="45" fill="white" fillOpacity="0.6" />
          <ellipse cx="190" cy="80" rx="50" ry="35" fill="white" fillOpacity="0.5" />
          <ellipse cx="125" cy="90" rx="70" ry="30" fill="white" fillOpacity="0.4" />
        </svg>
      </motion.div>

      {/* Cloud 3 - Bottom left */}
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute left-1/4 bottom-20 opacity-60"
      >
        <svg width="200" height="100" viewBox="0 0 200 100" fill="none">
          <ellipse cx="50" cy="70" rx="40" ry="28" fill="white" fillOpacity="0.4" />
          <ellipse cx="100" cy="55" rx="50" ry="35" fill="white" fillOpacity="0.5" />
          <ellipse cx="150" cy="70" rx="40" ry="28" fill="white" fillOpacity="0.4" />
        </svg>
      </motion.div>

      {/* Cloud 4 - Bottom right */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute right-1/4 bottom-32 opacity-50"
      >
        <svg width="180" height="90" viewBox="0 0 180 90" fill="none">
          <ellipse cx="45" cy="60" rx="35" ry="25" fill="white" fillOpacity="0.35" />
          <ellipse cx="90" cy="48" rx="45" ry="30" fill="white" fillOpacity="0.45" />
          <ellipse cx="135" cy="60" rx="35" ry="25" fill="white" fillOpacity="0.35" />
        </svg>
      </motion.div>

      {/* Decorative dots */}
      <div className="absolute right-1/3 top-1/3">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ 
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: i * 0.3
            }}
            className="absolute w-1 h-1 rounded-full bg-amber-300"
            style={{
              left: `${Math.random() * 100}px`,
              top: `${Math.random() * 100}px`,
            }}
          />
        ))}
      </div>
    </div>
  )
}
