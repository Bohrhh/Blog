"use client"

import { cn } from "@/app/lib/utils"

export interface IconButtonProps {
  icon: React.ReactNode
  "aria-label": string
  onClick?: () => void
  href?: string
  external?: boolean
  className?: string
  size?: "sm" | "md"
  variant?: "default" | "footer" | "social" | "ghost"
  pressed?: boolean
  type?: "button" | "submit" | "reset"
}

const sizeMap = {
  sm: "p-1.5",
  md: "p-2",
} as const

const variantMap: Record<string, string> = {
  default: cn(
    "text-slate-700 dark:text-dark-text rounded-card transition-colors duration-200",
    "hover:text-magenta hover:bg-slate-100/60 dark:hover:bg-dark-surfaceHover/60",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-magenta/40"
  ),
  footer: cn(
    "text-slate-600 dark:text-dark-textMuted rounded-card transition-colors duration-200",
    "hover:text-magenta hover:bg-slate-100/60 dark:hover:bg-dark-surfaceHover/60",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-magenta/40"
  ),
  social: cn(
    "text-slate-600 dark:text-dark-textMuted rounded-card transition-all duration-200 hover:scale-110",
    "hover:text-magenta hover:bg-slate-100/60 dark:hover:bg-dark-surfaceHover/60",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-magenta/40"
  ),
  ghost: cn(
    "text-slate-700 dark:text-dark-text rounded-card transition-colors duration-200 hover:text-magenta",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-magenta/40"
  ),
}

export default function IconButton({
  icon,
  "aria-label": ariaLabel,
  onClick,
  href,
  external = false,
  className,
  size = "md",
  variant = "default",
  pressed,
  type = "button",
}: IconButtonProps) {
  const baseClasses = cn(sizeMap[size], variantMap[variant], className)

  const ariaProps = pressed !== undefined ? { "aria-pressed": pressed } : {}

  if (href) {
    const linkProps = external
      ? { target: "_blank", rel: "noopener noreferrer" }
      : {}
    return (
      <a href={href} className={baseClasses} aria-label={ariaLabel} {...linkProps}>
        {icon}
      </a>
    )
  }

  return (
    <button
      onClick={onClick}
      className={baseClasses}
      aria-label={ariaLabel}
      type={type}
      {...ariaProps}
    >
      {icon}
    </button>
  )
}
