export const en = {
  nav: {
    categories: "Categories",
    courses: "Courses",
    about: "About",
    search: "Search",
    rssFeed: "RSS Feed",
    cssForJs: "CSS for JS Developers",
    joyOfReact: "The Joy of React",
    whimsicalAnimations: "Whimsical Animations",
    toggleMenu: "Toggle menu",
  },
  common: {
    back: "Back",
    readMore: "Read more",
    prev: "Prev",
    next: "Next",
    backToTop: "Back to top",
    onThisPage: "On This Page",
    searchPlaceholder: "Search articles...",
    noResults: (query: string) => `No articles found for "${query}"`,
    startSearching: "Start typing to search articles...",
    browseByCategory: "Browse By Category",
    popularContent: "Popular Content",
    pagination: "Pagination",
  },
  footer: {
    tagline: "Keep your ideals high. The sky belongs to no one.",
    newsletterTitle: "Want to know when I publish new content?",
    newsletterText: "Enter your email to join my free newsletter:",
    emailPlaceholder: "Email",
    submit: "Submit",
    browseByCategory: "Browse By Category",
    interactiveCourses: "Interactive Courses",
    general: "General",
    termsOfUse: "Terms of Use",
    privacyPolicy: "Privacy Policy",
    codeOfConduct: "Code of Conduct",
    copyright: "© 2018-present Joshua Comeau. All Rights Reserved.",
  },
  categories: {
    css: "CSS",
    react: "React",
    animation: "Animation",
    career: "Career",
    javascript: "JavaScript",
    svg: "SVG",
    nextjs: "Next.js",
    general: "General",
  },
  toolButtons: {
    toggleSound: "Toggle sound",
    toggleTheme: "Toggle theme",
  },
  social: {
    rssFeed: "RSS Feed",
    bluesky: "BlueSky",
    github: "GitHub",
    linkedin: "LinkedIn",
  },
  article: {
    articleNotFound: "Article Not Found",
    minRead: (readTime: string) => readTime,
    featured: "Featured",
    relatedArticles: "Related Articles",
    copyCode: "Copy",
    copied: "Copied",
  },
  category: {
    categoryNotFound: "Category Not Found",
    browseAll: (category: string) => `Browse all ${category} articles on KMLeeX Blog`,
    article: "article",
    articles: "articles",
  },
  about: {
    title: "About Me | KMLeeX Blog",
    description: "Learn more about KMLeeX - a developer passionate about web technologies",
    heading: "About Me",
    intro: "Hi, I'm **KMLee**! Welcome to my blog.",
    description2: "I'm a passionate web developer who loves creating beautiful, interactive user experiences. My focus areas include:",
    react: "React",
    reactDesc: "Building modern, component-based UIs",
    css: "CSS",
    cssDesc: "Crafting beautiful layouts and animations",
    nextjs: "Next.js",
    nextjsDesc: "Creating performant web applications",
    webPerformance: "Web Performance",
    webPerformanceDesc: "Optimizing for speed and user experience",
    blogDescription: "I created this blog to share my learnings and experiences with the web development community. Here you'll find tutorials, tips, and deep dives into various web technologies.",
    coffee: "When I'm not coding, you can find me exploring new technologies, contributing to open source projects, or enjoying a good cup of coffee.",
    getInTouch: "Get in Touch",
    getInTouchDesc: "Feel free to reach out to me on social media or check out my projects on GitHub. I'm always happy to connect with fellow developers!",
    github: "GitHub",
    twitter: "Twitter",
    role: "Front-end Developer",
    shortBio: "A passionate web developer who loves creating beautiful, interactive user experiences.",
    fullBio: "I'm a passionate web developer who loves creating beautiful, interactive user experiences. Here, I share tutorials, insights, and deep dives into front-end technologies.",
    focusAreas: "Focus Areas",
    aboutBlog: "About This Blog",
    aboutBlogDesc: "I created this blog to share my learnings and experiences with the web development community. Here you'll find tutorials, tips, and deep dives into various web technologies. Hope you find them helpful!",
    connect: "Get in Touch",
    connectDesc: "Feel free to reach out to me on social media or check out my projects on GitHub. I'm always happy to connect with fellow developers!",
    skillReact: "React",
    skillReactDesc: "Building modern, component-based UIs",
    skillCss: "CSS",
    skillCssDesc: "Crafting beautiful layouts and animations",
    skillNextjs: "Next.js",
    skillNextjsDesc: "Creating performant web applications",
    skillPerf: "Web Performance",
    skillPerfDesc: "Optimizing for speed and user experience",
  },
  hero: {
    title: "Exploring the Art of Web Development",
    titleAccent: "Art",
    description: "Tutorials and deep dives into CSS, React, Animation, SVG, and modern web technologies.",
    browseArticles: "Browse Articles",
    aboutMe: "About Me",
  },
  author: {
    name: "KMLee",
    role: "Front-end Developer",
    bio: "A passionate web developer who loves creating beautiful, interactive user experiences. Focused on CSS, React, and modern web technologies.",
  },
} as const

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Translations = typeof en
type TranslationsType = {
  nav: Record<string, string>
  common: Record<string, string | ((...args: any[]) => string)>
  footer: Record<string, string>
  categories: Record<string, string>
  toolButtons: Record<string, string>
  social: Record<string, string>
  article: Record<string, string | ((...args: any[]) => string)>
  category: Record<string, string | ((...args: any[]) => string)>
  about: Record<string, string>
  hero: Record<string, string>
  author: Record<string, string>
}

export type Language = "en" | "zh"
export type TranslationKeys = TranslationsType
