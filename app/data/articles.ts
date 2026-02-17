export interface Article {
  id: string
  title: string
  subtitle?: string
  description: string
  slug: string
}

export const articles: Article[] = [
  {
    id: "1",
    title: "Brand New Layouts with CSS Subgrid",
    description: "Subgrid allows us to extend a grid template down through the DOM tree, so that deeply-nested elements can participate in the same grid layout. At first glance, I thought this would be a helpful convenience, but it turns out that it's so much more. Subgrid unlocks exciting new layout possibilities, stuff we couldn't do until now. ✨",
    slug: "css-subgrid"
  },
  {
    id: "2",
    title: "Springs and Bounces in Native CSS",
    subtitle: "The magic of the `linear()` timing function",
    description: "The \"linear()\" timing function is a game-changer; it allows us to model physics-based motion right in vanilla CSS! That said, there are some limitations and quirks to be aware of. I've been experimenting with this API for a while now, and in this post, I'll share all of the tips and tricks I've learned for using it effectively. ✨",
    slug: "linear-timing-function"
  },
  {
    id: "3",
    title: "The Big Gotcha With `@starting-style`",
    description: "CSS has been on fire lately, with tons of great new features. @starting-style is an interesting one; it allows us to use CSS transitions for enter animations, something previously reserved for CSS keyframe animations. But is the juice worth the squeeze?",
    slug: "starting-style"
  },
  {
    id: "4",
    title: "Color Shifting in CSS",
    subtitle: "An Exploration of Color Animation Techniques",
    description: "A little while ago, I was trying to animate an element's background color, so that it cycled through the rainbow. Seems easy, but it turns out, browsers have a surprisingly big limitation when it comes to color processing! In this tutorial, we'll dig into the issue, and I'll share a couple of strategies you can use to work around this limitation.",
    slug: "color-shifting"
  },
  {
    id: "5",
    title: "An Interactive Guide to SVG Paths",
    description: "SVG gives us many different primitives to work with, but by far the most powerful is the `<path>` element. Unfortunately, it's also the most inscrutable, with its compact Regex-style syntax. In this tutorial, we'll demystify this infamous element and see some of the cool things we can do with it!",
    slug: "svg-paths"
  },
  {
    id: "6",
    title: "A Friendly Introduction to SVG",
    description: "SVGs are one of the most remarkable technologies we have access to on the web. They're first-class citizens, fully addressable with CSS and JavaScript. In this tutorial, I'll cover all of the most important fundamentals, and show you some of the ridiculously-cool things we can do with this massively underrated tool. ✨",
    slug: "friendly-svg"
  },
  {
    id: "7",
    title: "Partial Keyframes",
    subtitle: "Creating dynamic, composable CSS keyframe animations",
    description: "CSS Keyframe animations are so much more powerful than most developers realize. In this tutorial, I'll show you something that completely blew my mind, a technique that makes our keyframe animations so much more reusable and dynamic! 🤯",
    slug: "partial-keyframes"
  },
  {
    id: "8",
    title: "The Height Enigma",
    subtitle: "Unraveling the mystery of percentage-based heights in CSS",
    description: "One of the most perplexing and befuddling things in CSS for me, for many years, was the behaviour of percentage-based heights. Sometimes, seemingly at random, setting `height: 100%` would have no effect at all. When I finally figured out what was going on, it was like a puzzle piece snapping into place; everything made so much more sense! In this post, I'll share the epiphany I had, and we'll explore some solutions.",
    slug: "height-enigma"
  },
  {
    id: "9",
    title: "The Post-Developer Era",
    description: "When OpenAI released GPT-4 back in March 2023, they kickstarted the AI revolution. The consensus online was that front-end development jobs would be totally eliminated within a year or two. Well, it's been more than two years since then, and I thought it was worth revisiting some of those early predictions, and seeing if we can glean any insights about where things are headed.",
    slug: "post-developer-era"
  },
  {
    id: "10",
    title: "A Million Little Secrets",
    subtitle: 'Deconstructing the "Whimsical Animations" landing page',
    description: "I spent the past few weeks packing as many easter eggs as I could into my latest project, and in this blog post, I want to dig into some of the more interesting details! If you're interested in animations/interactions, you'll want to check this one out; I share a bunch of my favourite secrets and tricks. 😄",
    slug: "whimsical-animations"
  },
  {
    id: "11",
    title: "Container Queries Unleashed",
    description: "Container queries expand the universe of designs that can be implemented, giving us whole new superpowers. Now that container queries are broadly available, I think it's time we start exploring this potential! In this post, I'll share the \"killer pattern\" I can't stop using in my work, and explore what's possible with this new capability.",
    slug: "container-queries"
  },
  {
    id: "12",
    title: "Next-level frosted glass with `backdrop-filter`",
    description: "Glassy headers have become a core part of the \"slick startup\" UI toolkit, but they're all missing that final 10% that really makes it shine. In this tutorial, you'll learn how to create the most realistic lush frosted glass anywhere on the internet.",
    slug: "backdrop-filter"
  }
]

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
