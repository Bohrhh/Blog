import Link from "next/link"

interface LogoProps {
  className?: string
}

export default function Logo({ className = "" }: LogoProps) {
  return (
    <Link href="/" className={`flex items-center gap-0.5 text-xl font-bold tracking-tight ${className}`}>
      <span className="text-blue-500">KMLee</span>
      <span className="text-amber-400">X</span>
      <span className="text-blue-500">Blog</span>
    </Link>
  )
}
