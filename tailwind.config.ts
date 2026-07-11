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
          light: "#e0559d",
        },
        sky: {
          light: "#a8d8f0",
          DEFAULT: "#7dd3fc",
          deep: "#0284c7",
        },
        iris: {
          DEFAULT: "#6366f1",
          light: "#818cf8",
        },
        dark: {
          bg: "#121419",
          surface: "#1c2029",
          surfaceHover: "#252a35",
          raised: "#222732",
          border: "#2a2f3a",
          text: "#e8ecf1",
          textMuted: "#94a0b0",
        },
      },
      fontFamily: {
        sans: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        mono: ["SF Mono", "Monaco", "Cascadia Code", "Roboto Mono", "Consolas", "monospace"],
      },
      fontSize: {
        display: ["3rem", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "700" }],
        h1: ["2.25rem", { lineHeight: "1.15", letterSpacing: "-0.02em", fontWeight: "700" }],
        h2: ["1.875rem", { lineHeight: "1.2", letterSpacing: "-0.015em", fontWeight: "700" }],
        h3: ["1.5rem", { lineHeight: "1.3", letterSpacing: "-0.01em", fontWeight: "600" }],
        h4: ["1.25rem", { lineHeight: "1.4", letterSpacing: "-0.01em", fontWeight: "600" }],
        "body-lg": ["1.125rem", { lineHeight: "1.7" }],
        body: ["1rem", { lineHeight: "1.7" }],
        "body-sm": ["0.875rem", { lineHeight: "1.6" }],
        caption: ["0.75rem", { lineHeight: "1.5", letterSpacing: "0.04em" }],
      },
      borderRadius: {
        card: "1rem",
        panel: "1.125rem",
        overlay: "1.25rem",
        pill: "9999px",
      },
      backdropBlur: {
        glass: "12px",
        "glass-lg": "20px",
        "glass-xl": "28px",
      },
      boxShadow: {
        e1: "var(--shadow-e1)",
        e2: "var(--shadow-e2)",
        e3: "var(--shadow-e3)",
        e4: "var(--shadow-e4)",
        glow: "var(--shadow-glow)",
        "glow-strong": "var(--shadow-glow-strong)",
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
