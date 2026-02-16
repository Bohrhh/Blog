import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Josh W Comeau - Articles and Tutorials",
  description: "Personal blog about CSS, React, Animation, and Web Development",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}
