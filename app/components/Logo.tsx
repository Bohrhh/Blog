import Link from "next/link"
import { cn } from "@/app/lib/utils"

interface LogoProps {
  className?: string
}

export default function Logo({ className = "" }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        "group flex items-center gap-0.5 text-xl font-bold tracking-tight transition-colors duration-200",
        className
      )}
    >
      <span className="text-slate-900 dark:text-dark-text transition-colors duration-200">KMLee</span>
      <span className="text-magenta transition-colors duration-200 group-hover:text-magenta-dark dark:group-hover:text-magenta-light">X</span>
      <span className="text-slate-900 dark:text-dark-text transition-colors duration-200">Blog</span>
    </Link>
  )
}
