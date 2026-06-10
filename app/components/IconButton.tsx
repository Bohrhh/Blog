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
    "hover:text-magenta transition-colors duration-200 rounded-lg",
    "hover:bg-slate-100/50 dark:hover:bg-dark-surfaceHover/50",
    "text-slate-700 dark:text-dark-text"
  ),
  footer: cn(
    "transition-colors duration-200 rounded-lg",
    "hover:bg-slate-100 dark:hover:bg-dark-surfaceHover",
    "text-slate-600 hover:text-magenta dark:text-dark-textMuted"
  ),
  social: cn(
    "transition-all duration-200 rounded-lg hover:scale-110",
    "hover:bg-slate-100 dark:hover:bg-dark-surfaceHover",
    "text-slate-600 hover:text-magenta dark:text-dark-textMuted"
  ),
  ghost: cn("hover:text-magenta transition-colors duration-200 rounded-lg"),
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
