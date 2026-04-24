import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Generate a URL-friendly ID from heading text
// Preserves all characters (including CJK), only replaces whitespace with hyphens
export function slugify(text: string): string {
  return text
    .trim()
    .replace(/\s+/g, "-")      // whitespace → hyphen
    .replace(/-+/g, "-")        // collapse multiple hyphens
    .replace(/^-|-$/g, "")      // strip leading/trailing hyphens
}
