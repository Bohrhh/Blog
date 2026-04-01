// 应用常量

// localStorage keys
export const STORAGE_KEYS = {
  THEME: "blog-theme",
  SOUND: "blog-sound-enabled",
  LANGUAGE: "blog-language",
} as const

// 路由
export const ROUTES = {
  HOME: "/",
  RSS: "/rss",
  ABOUT: "/about",
} as const

// 动画配置
export const ANIMATION = {
  TRANSITION_DURATION: 0.5,
  TRANSITION_EASE: [0.4, 0, 0.2, 1] as const,
  STAGGER_DELAY: 0.05,
} as const

// UI 配置
export const UI = {
  NAVBAR_HEIGHT: 64, // h-16 = 4rem = 64px
  SIDEBAR_WIDTH: "1/3",
  MAX_CONTENT_WIDTH: 1200, // max-w-[1200px]
  ARTICLE_WIDTH: 672, // max-w-3xl ≈ 48rem = 768px, using 42rem = 672px
} as const
