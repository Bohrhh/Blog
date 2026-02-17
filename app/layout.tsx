import type { Metadata } from "next"
import "./globals.css"
import { SoundProvider } from "@/app/context/SoundContext"

export const metadata: Metadata = {
  title: "KMLeeX Blog - Articles and Tutorials",
  description: "Personal blog about CSS, React, Animation, and Web Development",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <SoundProvider>
          {children}
        </SoundProvider>
      </body>
    </html>
  )
}
