"use client"

import { useTranslation } from "@/app/lib/i18n"

export default function AboutContent() {
  const { t, language } = useTranslation()
  const isZh = language === "zh"

  return (
    <div className="prose prose-lg dark:prose-invert">
      <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-dark-text mb-6">
        {t('about').heading}
      </h1>

      <p className="text-slate-700 dark:text-dark-text leading-relaxed mb-6">
        {isZh ? "嗨，我是" : "Hi, I'm"} <strong className="text-magenta">KMLee</strong>! {isZh ? "欢迎来到我的博客。" : "Welcome to my blog."}
      </p>

      <p className="text-slate-700 dark:text-dark-text leading-relaxed mb-6">
        {isZh
          ? "我是一位热衷于创造美丽、交互式用户体验的网页开发者。我的专注领域包括："
          : "I'm a passionate web developer who loves creating beautiful, interactive user experiences. My focus areas include:"}
      </p>

      <ul className="list-disc list-inside mb-6 space-y-2 text-slate-700 dark:text-dark-text">
        <li><strong className="text-magenta">{t('about').react}</strong> - {isZh ? "构建现代的、基于组件的用户界面" : "Building modern, component-based UIs"}</li>
        <li><strong className="text-magenta">{t('about').css}</strong> - {isZh ? "打造精美的布局和动画" : "Crafting beautiful layouts and animations"}</li>
        <li><strong className="text-magenta">{t('about').nextjs}</strong> - {isZh ? "创建高性能的网页应用" : "Creating performant web applications"}</li>
        <li><strong className="text-magenta">{t('about').webPerformance}</strong> - {isZh ? "为速度和用户体验而优化" : "Optimizing for speed and user experience"}</li>
      </ul>

      <p className="text-slate-700 dark:text-dark-text leading-relaxed mb-6">
        {isZh
          ? "创建这个博客是为了与网页开发社区分享我的学习心得和经验。在这里你可以找到教程、技巧和各种网页技术的深度解析。"
          : "I created this blog to share my learnings and experiences with the web development community. Here you'll find tutorials, tips, and deep dives into various web technologies."}
      </p>

      <p className="text-slate-700 dark:text-dark-text leading-relaxed mb-6">
        {isZh
          ? "当我不写代码的时候，你可能会发现我在探索新技术、为开源项目做贡献，或者享用一杯咖啡。"
          : "When I'm not coding, you can find me exploring new technologies, contributing to open source projects, or enjoying a good cup of coffee ☕."}
      </p>

      <h2 className="text-2xl font-bold text-slate-900 dark:text-dark-text mt-8 mb-4">
        {t('about').getInTouch}
      </h2>

      <p className="text-slate-700 dark:text-dark-text leading-relaxed mb-6">
        {isZh
          ? "欢迎通过社交媒体联系我，或在 GitHub 上查看我的项目。我很乐意与志同道合的开发者交流！"
          : "Feel free to reach out to me on social media or check out my projects on GitHub. I'm always happy to connect with fellow developers!"}
      </p>

      <div className="flex gap-4 mt-8">
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-slate-900 dark:bg-dark-surfaceHover text-white rounded-lg hover:bg-magenta transition-colors"
        >
          {t('about').github}
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-slate-900 dark:bg-dark-surfaceHover text-white rounded-lg hover:bg-magenta transition-colors"
        >
          {t('about').twitter}
        </a>
      </div>
    </div>
  )
}
