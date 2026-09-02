import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import Link from "next/link"
import { motion } from "framer-motion"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * localStorage access that never throws. In environments where storage is
 * blocked (Safari private mode with third-party cookies disabled, some
 * webviews, disabled cookies), a raw getItem/setItem can throw and crash the
 * app. Returns null on read failure and silently drops writes.
 */
export const safeStorage = {
  getItem(key: string): string | null {
    try {
      return window.localStorage.getItem(key)
    } catch {
      return null
    }
  },
  setItem(key: string, value: string): void {
    try {
      window.localStorage.setItem(key, value)
    } catch {
      // Storage unavailable — ignore.
    }
  },
}

/** A motion-enhanced Next.js Link component for animated navigation. */
export const MotionLink = motion(Link)

// Generate a URL-friendly ID from heading text
// Preserves all characters (including CJK), only replaces whitespace with hyphens
export function slugify(text: string): string {
  return text
    .trim()
    .replace(/\s+/g, "-")      // whitespace → hyphen
    .replace(/-+/g, "-")        // collapse multiple hyphens
    .replace(/^-|-$/g, "")      // strip leading/trailing hyphens
}
