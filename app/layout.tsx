import type { Metadata } from "next"
import "./globals.css"
import { AppProvider } from "@/app/context/AppContext"
import { I18nProvider } from "@/app/lib/i18n"
import BackToTop from "@/app/components/BackToTop"

export const metadata: Metadata = {
  title: "KMLeeX Blog - Articles and Tutorials",
  description: "Personal blog about CSS, React, Animation, and Web Development",
}

// 防止主题和语言闪烁的脚本 - 在 React 加载前执行
const initScript = `
  (function() {
    try {
      var theme = localStorage.getItem('blog-theme');
      if (theme === 'dark' || (!theme)) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      var lang = localStorage.getItem('blog-language');
      if (lang === 'zh') {
        document.documentElement.lang = 'zh';
      } else {
        document.documentElement.lang = 'en';
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: initScript }}
        />
      </head>
      <body className="antialiased transition-colors duration-300">
        <AppProvider>
          <I18nProvider>
            {children}
            <BackToTop />
          </I18nProvider>
        </AppProvider>
      </body>
    </html>
  )
}
