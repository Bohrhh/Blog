import ArticleNavbar from "@/app/components/ArticleNavbar"

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
          {/* Title */}
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-6">
            About Me
          </h1>

          {/* Content */}
          <div className="prose prose-lg dark:prose-invert">
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
              Hi, I'm <strong className="text-magenta">KMLee</strong>! Welcome to my blog.
            </p>

            <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
              I'm a passionate web developer who loves creating beautiful, interactive
              user experiences. My focus areas include:
            </p>

            <ul className="list-disc list-inside mb-6 space-y-2 text-slate-700 dark:text-slate-300">
              <li><strong className="text-magenta">React</strong> - Building modern, component-based UIs</li>
              <li><strong className="text-magenta">CSS</strong> - Crafting beautiful layouts and animations</li>
              <li><strong className="text-magenta">Next.js</strong> - Creating performant web applications</li>
              <li><strong className="text-magenta">Web Performance</strong> - Optimizing for speed and user experience</li>
            </ul>

            <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
              I created this blog to share my learnings and experiences with the
              web development community. Here you'll find tutorials, tips, and
              deep dives into various web technologies.
            </p>

            <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
              When I'm not coding, you can find me exploring new technologies,
              contributing to open source projects, or enjoying a good cup of coffee ☕.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
              Get in Touch
            </h2>

            <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
              Feel free to reach out to me on social media or check out my
              projects on GitHub. I'm always happy to connect with fellow
              developers!
            </p>

            <div className="flex gap-4 mt-8">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-slate-900 dark:bg-slate-700 text-white rounded-lg hover:bg-magenta transition-colors"
              >
                GitHub
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-slate-900 dark:bg-slate-700 text-white rounded-lg hover:bg-magenta transition-colors"
              >
                Twitter
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
