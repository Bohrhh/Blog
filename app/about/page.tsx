import ArticleNavbar from "@/app/components/ArticleNavbar"
import AboutContent from "@/app/components/AboutContent"

export const metadata = {
  title: "About Me | KMLeeX Blog",
  description: "Learn more about KMLeeX - a developer passionate about web technologies",
}

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <ArticleNavbar />

      <div className="pt-24 pb-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <AboutContent />
        </div>
      </div>
    </main>
  )
}
