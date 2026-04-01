export interface Article {
  id: string
  title: string
  titleZh: string
  subtitle?: string
  subtitleZh?: string
  description: string
  descriptionZh: string
  slug: string
  date: string
  category: string
  categoryZh: string
  readTime: string
  featured?: boolean
}

// 文章列表（不含内容，内容从单独文件加载）
export const articles: Article[] = [
  {
    id: "1",
    title: "Brand New Layouts with CSS Subgrid",
    titleZh: "CSS Subgrid 带来的全新布局方式",
    subtitle: "Extending grid templates through the DOM tree",
    subtitleZh: "通过 DOM 树扩展网格模板",
    description: "Subgrid allows us to extend a grid template down through the DOM tree, so that deeply-nested elements can participate in the same grid layout.",
    descriptionZh: "Subgrid 允许我们将网格模板向下扩展到 DOM 树中，使嵌套元素能够参与相同的网格布局。",
    slug: "css-subgrid",
    date: "2024-01-15",
    category: "CSS",
    categoryZh: "CSS",
    readTime: "5 min read"
  },
  {
    id: "2",
    title: "Springs and Bounces in Native CSS",
    titleZh: "原生 CSS 中的弹簧与弹跳效果",
    subtitle: "The magic of the `linear()` timing function",
    subtitleZh: "`linear()` 时间函数的魔力",
    description: "The \"linear()\" timing function is a game-changer; it allows us to model physics-based motion right in vanilla CSS!",
    descriptionZh: "\"linear()\" 时间函数是一个改变游戏规则的功能，它让我们能够在纯 CSS 中模拟基于物理的运动！",
    slug: "linear-timing-function",
    date: "2024-01-10",
    category: "CSS",
    categoryZh: "CSS",
    readTime: "8 min read"
  },
  {
    id: "3",
    title: "The Big Gotcha With `@starting-style`",
    titleZh: "`@starting-style` 的大坑",
    description: "CSS has been on fire lately, with tons of great new features. @starting-style is an interesting one.",
    descriptionZh: "最近 CSS 迎来了大量精彩的新功能，@starting-style 是一个有趣的新特性。",
    slug: "starting-style",
    date: "2024-01-05",
    category: "CSS",
    categoryZh: "CSS",
    readTime: "6 min read"
  },
  {
    id: "4",
    title: "Color Shifting in CSS",
    titleZh: "CSS 中的颜色变换",
    subtitle: "An Exploration of Color Animation Techniques",
    subtitleZh: "颜色动画技术探索",
    description: "A little while ago, I was trying to animate an element's background color, so that it cycled through the rainbow.",
    descriptionZh: "前阵子我尝试为一个元素的背景色添加动画，让它能够循环显示彩虹色。",
    slug: "color-shifting",
    date: "2023-12-20",
    category: "CSS",
    categoryZh: "CSS",
    readTime: "7 min read"
  },
  {
    id: "5",
    title: "An Interactive Guide to SVG Paths",
    titleZh: "SVG 路径交互式指南",
    description: "SVG gives us many different primitives to work with, but by far the most powerful is the `<path>` element.",
    descriptionZh: "SVG 提供了许多不同的基本图形供我们使用，但最强大的无疑是 `<path>` 元素。",
    slug: "svg-paths",
    date: "2023-12-15",
    category: "SVG",
    categoryZh: "SVG",
    readTime: "10 min read"
  },
  {
    id: "6",
    title: "A Friendly Introduction to SVG",
    titleZh: "SVG 入门指南",
    description: "SVGs are one of the most remarkable technologies we have access to on the web.",
    descriptionZh: "SVG 是我们可以在网页上使用的最出色的技术之一。",
    slug: "friendly-svg",
    date: "2023-12-10",
    category: "SVG",
    categoryZh: "SVG",
    readTime: "8 min read"
  },
  {
    id: "7",
    title: "Partial Keyframes",
    titleZh: "部分关键帧",
    subtitle: "Creating dynamic, composable CSS keyframe animations",
    subtitleZh: "创建动态、可组合的 CSS 关键帧动画",
    description: "CSS Keyframe animations are so much more powerful than most developers realize.",
    descriptionZh: "CSS 关键帧动画比大多数开发者想象的要强大得多。",
    slug: "partial-keyframes",
    date: "2023-12-05",
    category: "Animation",
    categoryZh: "动画",
    readTime: "6 min read"
  },
  {
    id: "8",
    title: "The Height Enigma",
    titleZh: "高度之谜",
    subtitle: "Unraveling the mystery of percentage-based heights in CSS",
    subtitleZh: "解开 CSS 百分比高度的奥秘",
    description: "One of the most perplexing and befuddling things in CSS for me, for many years, was the behaviour of percentage-based heights.",
    descriptionZh: "多年来，CSS 中最让我困惑和烦恼的事情之一就是百分比高度的行为。",
    slug: "height-enigma",
    date: "2023-11-28",
    category: "CSS",
    categoryZh: "CSS",
    readTime: "7 min read"
  },
  {
    id: "9",
    title: "The Post-Developer Era",
    titleZh: "后开发者时代",
    description: "When OpenAI released GPT-4 back in March 2023, they kickstarted the AI revolution.",
    descriptionZh: "2023 年 3 月，OpenAI 发布了 GPT-4，由此开启了 AI 革命。",
    slug: "post-developer-era",
    date: "2023-11-20",
    category: "Career",
    categoryZh: "职场",
    readTime: "12 min read"
  },
  {
    id: "10",
    title: "A Million Little Secrets",
    titleZh: "一百万个小秘密",
    subtitle: 'Deconstructing the "Whimsical Animations" landing page',
    subtitleZh: "解析 \"Whimsical Animations\" 着陆页",
    description: "I spent the past few weeks packing as many easter eggs as I could into my latest project.",
    descriptionZh: "过去几周，我尽可能多地把彩蛋塞进了我的最新项目中。",
    slug: "whimsical-animations",
    date: "2023-11-15",
    category: "Animation",
    categoryZh: "动画",
    readTime: "15 min read"
  },
  {
    id: "11",
    title: "Container Queries Unleashed",
    titleZh: "容器查询详解",
    description: "Container queries expand the universe of designs that can be implemented, giving us whole new superpowers.",
    descriptionZh: "容器查询扩展了可实现设计的领域，赋予我们全新的超能力。",
    slug: "container-queries",
    date: "2023-11-10",
    category: "CSS",
    categoryZh: "CSS",
    readTime: "8 min read"
  },
  {
    id: "12",
    title: "Next-level frosted glass with `backdrop-filter`",
    titleZh: "使用 `backdrop-filter` 实现高级毛玻璃效果",
    description: "Glassy headers have become a core part of the \"slick startup\" UI toolkit.",
    descriptionZh: "玻璃质感标题已经成为 \"酷炫创业公司\" UI 工具包的核心部分。",
    slug: "backdrop-filter",
    date: "2023-11-05",
    category: "CSS",
    categoryZh: "CSS",
    readTime: "6 min read"
  },
  {
    id: "13",
    title: "How to Change Your Entire Life in One Day",
    titleZh: "如何在一天内改变你的人生",
    description: "A comprehensive guide to behavior change, psychology, and productivity that can transform your life.",
    descriptionZh: "一篇关于行为改变、心理学和生产力的全面指南，可以改变你的人生。",
    slug: "how-to-fix-your-entire-life-in-1",
    date: "2025-12-23",
    category: "Career",
    categoryZh: "职场",
    readTime: "20 min read",
    featured: true
  }
]

// 根据 slug 获取文章
export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find(article => article.slug === slug)
}

// 获取所有 slug
export function getAllArticleSlugs(): string[] {
  return articles.map(article => article.slug)
}

// 根据分类获取文章
export function getArticlesByCategory(category: string): Article[] {
  return articles.filter(
    article => article.category.toLowerCase() === category.toLowerCase()
  )
}

// 获取所有分类
export function getAllCategories(): string[] {
  return categories
}

export const categories = [
  "CSS",
  "React",
  "Animation",
  "Career",
  "JavaScript",
  "SVG",
  "Next.js",
  "General"
]

export const popularContent = [
  "An Interactive Guide to Flexbox",
  "A Modern CSS Reset",
  "An Interactive Guide to CSS Transitions",
  "How To Center a Div",
  "The End of Front-End Development",
  "An Interactive Guide to CSS Grid",
  "Designing Beautiful Shadows in CSS",
  "Making Sense of React Server Components",
  "Why React Re-Renders",
  "CSS Variables for React Devs"
]
