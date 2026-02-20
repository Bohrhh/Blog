import type { Metadata } from "next"
import "./globals.css"
import { AppProvider } from "@/app/context/AppContext"
import BackToTop from "@/app/components/BackToTop"

export const metadata: Metadata = {
  title: "KMLeeX Blog - Articles and Tutorials",
  description: "Personal blog about CSS, React, Animation, and Web Development",
}

// 防止主题闪烁的脚本 - 在 React 加载前执行
const themeScript = `
  (function() {
    try {
      var theme = localStorage.getItem('blog-theme');
      if (theme === 'dark' || (!theme)) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch (e) {}
  })();
`

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: themeScript }}
        />
      </head>
      <body className="antialiased transition-colors duration-300">
        <AppProvider>
          {children}
          <BackToTop />
        </AppProvider>
      </body>
    </html>
  )
}
