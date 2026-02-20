import ArticleNavbar from "@/app/components/ArticleNavbar"

export const metadata = {
  title: "About This Blog | KMLeeX Blog",
  description: "Learn more about KMLeeX Blog and its technology stack",
}

export default function AboutBlogPage() {
  return (
    <main className="min-h-screen">
      <ArticleNavbar />

      <div className="pt-24 pb-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          {/* Title */}
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-6">
            About This Blog
          </h1>

          {/* Content */}
          <div className="prose prose-lg dark:prose-invert">
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
              Welcome to <strong className="text-magenta">KMLeeX Blog</strong>! This is my
              personal blog where I share articles and tutorials about web development.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
              Technology Stack
            </h2>

            <ul className="list-disc list-inside mb-6 space-y-2 text-slate-700 dark:text-slate-300">
              <li><strong className="text-magenta">Next.js</strong> - React framework for production</li>
              <li><strong className="text-magenta">TypeScript</strong> - Type-safe JavaScript</li>
              <li><strong className="text-magenta">Tailwind CSS</strong> - Utility-first CSS framework</li>
              <li><strong className="text-magenta">Framer Motion</strong> - Smooth animations</li>
              <li><strong className="text-magenta">React Markdown</strong> - Markdown content rendering</li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
              Features
            </h2>

            <ul className="list-disc list-inside mb-6 space-y-2 text-slate-700 dark:text-slate-300">
              <li>Dark/Light theme support with persistence</li>
              <li>Interactive sound effects</li>
              <li>Responsive design for all devices</li>
              <li>Category-based article filtering</li>
              <li>Code syntax highlighting</li>
              <li>Smooth page transitions</li>
            </ul>

            <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
              This blog is built with modern web technologies to provide the best
              reading experience. I continuously update and improve it based on
              feedback and new learnings.
            </p>

            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              Thank you for visiting! Stay tuned for more articles and tutorials.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
