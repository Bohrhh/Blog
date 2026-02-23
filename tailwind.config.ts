import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        magenta: {
          DEFAULT: "#d63384",
          dark: "#b52a6f",
        },
        sky: {
          light: "#a8d8f0",
          DEFAULT: "#7dd3fc",
        },
        // Dark mode colors
        dark: {
          bg: "#1d1d1d",
          surface: "#262626",
          surfaceHover: "#2d2d2d",
          border: "#3d3d3d",
          text: "#e0e0e0",
          textMuted: "#a0a0a0",
        },
      },
      fontFamily: {
        sans: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        mono: ["SF Mono", "Monaco", "Cascadia Code", "Roboto Mono", "Consolas", "monospace"],
      },
      animation: {
        float: "float 4s ease-in-out infinite",
        breathe: "breathe 3s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        breathe: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.02)" },
        },
      },
    },
  },
  plugins: [],
}

export default config
