export interface Article {
  id: string
  title: string
  subtitle?: string
  description: string
  slug: string
  date: string
  category: string
  readTime: string
}

// 文章列表（不含内容，内容从单独文件加载）
export const articles: Article[] = [
  {
    id: "1",
    title: "Brand New Layouts with CSS Subgrid",
    subtitle: "Extending grid templates through the DOM tree",
    description: "Subgrid allows us to extend a grid template down through the DOM tree, so that deeply-nested elements can participate in the same grid layout.",
    slug: "css-subgrid",
    date: "2024-01-15",
    category: "CSS",
    readTime: "5 min read"
  },
  {
    id: "2",
    title: "Springs and Bounces in Native CSS",
    subtitle: "The magic of the `linear()` timing function",
    description: "The \"linear()\" timing function is a game-changer; it allows us to model physics-based motion right in vanilla CSS!",
    slug: "linear-timing-function",
    date: "2024-01-10",
    category: "CSS",
    readTime: "8 min read"
  },
  {
    id: "3",
    title: "The Big Gotcha With `@starting-style`",
    description: "CSS has been on fire lately, with tons of great new features. @starting-style is an interesting one.",
    slug: "starting-style",
    date: "2024-01-05",
    category: "CSS",
    readTime: "6 min read"
  },
  {
    id: "4",
    title: "Color Shifting in CSS",
    subtitle: "An Exploration of Color Animation Techniques",
    description: "A little while ago, I was trying to animate an element's background color, so that it cycled through the rainbow.",
    slug: "color-shifting",
    date: "2023-12-20",
    category: "CSS",
    readTime: "7 min read"
  },
  {
    id: "5",
    title: "An Interactive Guide to SVG Paths",
    description: "SVG gives us many different primitives to work with, but by far the most powerful is the `<path>` element.",
    slug: "svg-paths",
    date: "2023-12-15",
    category: "SVG",
    readTime: "10 min read"
  },
  {
    id: "6",
    title: "A Friendly Introduction to SVG",
    description: "SVGs are one of the most remarkable technologies we have access to on the web.",
    slug: "friendly-svg",
    date: "2023-12-10",
    category: "SVG",
    readTime: "8 min read"
  },
  {
    id: "7",
    title: "Partial Keyframes",
    subtitle: "Creating dynamic, composable CSS keyframe animations",
    description: "CSS Keyframe animations are so much more powerful than most developers realize.",
    slug: "partial-keyframes",
    date: "2023-12-05",
    category: "Animation",
    readTime: "6 min read"
  },
  {
    id: "8",
    title: "The Height Enigma",
    subtitle: "Unraveling the mystery of percentage-based heights in CSS",
    description: "One of the most perplexing and befuddling things in CSS for me, for many years, was the behaviour of percentage-based heights.",
    slug: "height-enigma",
    date: "2023-11-28",
    category: "CSS",
    readTime: "7 min read"
  },
  {
    id: "9",
    title: "The Post-Developer Era",
    description: "When OpenAI released GPT-4 back in March 2023, they kickstarted the AI revolution.",
    slug: "post-developer-era",
    date: "2023-11-20",
    category: "Career",
    readTime: "12 min read"
  },
  {
    id: "10",
    title: "A Million Little Secrets",
    subtitle: 'Deconstructing the "Whimsical Animations" landing page',
    description: "I spent the past few weeks packing as many easter eggs as I could into my latest project.",
    slug: "whimsical-animations",
    date: "2023-11-15",
    category: "Animation",
    readTime: "15 min read"
  },
  {
    id: "11",
    title: "Container Queries Unleashed",
    description: "Container queries expand the universe of designs that can be implemented, giving us whole new superpowers.",
    slug: "container-queries",
    date: "2023-11-10",
    category: "CSS",
    readTime: "8 min read"
  },
  {
    id: "12",
    title: "Next-level frosted glass with `backdrop-filter`",
    description: "Glassy headers have become a core part of the \"slick startup\" UI toolkit.",
    slug: "backdrop-filter",
    date: "2023-11-05",
    category: "CSS",
    readTime: "6 min read"
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
