"use client"

// Pre-calculate dot positions with fixed values to avoid hydration mismatch
const dotPositions = [
  { left: "5%", top: "8%" },
  { left: "18%", top: "15%" },
  { left: "32%", top: "5%" },
  { left: "45%", top: "22%" },
  { left: "58%", top: "12%" },
  { left: "72%", top: "28%" },
  { left: "85%", top: "8%" },
  { left: "95%", top: "18%" },
]

// Cloud animation keyframes
const cloudAnimations = [
  { name: "cloud1", duration: "4s", delay: "0s" },
  { name: "cloud2", duration: "5s", delay: "1s" },
  { name: "cloud3", duration: "6s", delay: "0.5s" },
  { name: "cloud4", duration: "4.5s", delay: "2s" },
]

const cloudStyles = cloudAnimations.map((cloud, i) => ({
  ...cloud,
  animation: `${cloud.name} ${cloud.duration} ease-in-out infinite`,
  animationDelay: cloud.delay,
}))

export default function CloudBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <style jsx>{`
        @keyframes cloud1 {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes cloud2 {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes cloud3 {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        @keyframes cloud4 {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        @keyframes dotPulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.2); }
        }
      `}</style>

      {/* Cloud 1 - Top left */}
      <div
        className="absolute -left-20 top-20 opacity-80 dark:opacity-30"
        style={cloudStyles[0]}
      >
        <svg width="300" height="150" viewBox="0 0 300 150" fill="none">
          <ellipse cx="80" cy="100" rx="60" ry="40" fill="white" fillOpacity="0.6" />
          <ellipse cx="150" cy="80" rx="70" ry="50" fill="white" fillOpacity="0.7" />
          <ellipse cx="220" cy="100" rx="60" ry="40" fill="white" fillOpacity="0.6" />
          <ellipse cx="150" cy="110" rx="80" ry="35" fill="white" fillOpacity="0.5" />
        </svg>
      </div>

      {/* Cloud 2 - Top right */}
      <div
        className="absolute right-10 top-10 opacity-70 dark:opacity-25"
        style={cloudStyles[1]}
      >
        <svg width="250" height="120" viewBox="0 0 250 120" fill="none">
          <ellipse cx="60" cy="80" rx="50" ry="35" fill="white" fillOpacity="0.5" />
          <ellipse cx="125" cy="60" rx="60" ry="45" fill="white" fillOpacity="0.6" />
          <ellipse cx="190" cy="80" rx="50" ry="35" fill="white" fillOpacity="0.5" />
          <ellipse cx="125" cy="90" rx="70" ry="30" fill="white" fillOpacity="0.4" />
        </svg>
      </div>

      {/* Cloud 3 - Bottom left */}
      <div
        className="absolute left-1/4 bottom-20 opacity-60 dark:opacity-20"
        style={cloudStyles[2]}
      >
        <svg width="200" height="100" viewBox="0 0 200 100" fill="none">
          <ellipse cx="50" cy="70" rx="40" ry="28" fill="white" fillOpacity="0.4" />
          <ellipse cx="100" cy="55" rx="50" ry="35" fill="white" fillOpacity="0.5" />
          <ellipse cx="150" cy="70" rx="40" ry="28" fill="white" fillOpacity="0.4" />
        </svg>
      </div>

      {/* Cloud 4 - Bottom right */}
      <div
        className="absolute right-1/4 bottom-32 opacity-50 dark:opacity-15"
        style={cloudStyles[3]}
      >
        <svg width="180" height="90" viewBox="0 0 180 90" fill="none">
          <ellipse cx="45" cy="60" rx="35" ry="25" fill="white" fillOpacity="0.35" />
          <ellipse cx="90" cy="48" rx="45" ry="30" fill="white" fillOpacity="0.45" />
          <ellipse cx="135" cy="60" rx="35" ry="25" fill="white" fillOpacity="0.35" />
        </svg>
      </div>

      {/* Decorative dots */}
      <div className="absolute right-1/3 top-1/3">
        {dotPositions.map((pos, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-magenta"
            style={{
              left: pos.left,
              top: pos.top,
              animation: `dotPulse 3s ease-in-out infinite`,
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}
      </div>
    </div>
  )
}
