import type { Metadata } from "next"
import "./globals.css"
import { SoundProvider } from "@/app/context/SoundContext"
import { ThemeProvider } from "@/app/context/ThemeContext"

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
      <body className="antialiased transition-colors duration-300">
        <ThemeProvider>
          <SoundProvider>
            {children}
          </SoundProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
