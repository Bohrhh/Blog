import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import Link from "next/link"
import { motion } from "framer-motion"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
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
