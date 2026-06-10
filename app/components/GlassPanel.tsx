"use client"

import { cn } from "@/app/lib/utils"

/**
 * Shared glass-card background classes.
 * Export as a string constant so it can be composed with `cn()` in
 * components that need a non-`div` element (e.g. `motion.div`, `<Link>`).
 */
export const glassPanelClasses =
  "rounded-xl border border-slate-200/70 dark:border-dark-border/60 bg-white/70 dark:bg-dark-surface/60 backdrop-blur-sm"

interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

/**
 * A lightweight glass-card panel that composes the shared rounded-xl
 * glass background classes via `cn()`.  Pass padding / margin / layout
 * classes through `className`.
 *
 * @example
 *   <GlassPanel className="p-6 mb-8">…</GlassPanel>
 *   <GlassPanel className="p-5 hover:border-magenta/30">…</GlassPanel>
 */
export default function GlassPanel({ className, children, ...props }: GlassPanelProps) {
  return (
    <div className={cn(glassPanelClasses, className)} {...props}>
      {children}
    </div>
  )
}
