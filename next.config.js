/** @type {import('next').NextConfig} */

// Standard hardening headers applied to every response.
// CSP is deliberately pragmatic: the anti-flicker script in layout.tsx is
// inline and Tailwind/framer-motion rely on inline styles, so script-src and
// style-src allow 'unsafe-inline'. img-src allows https: because article
// markdown may embed arbitrary external images.
const securityHeaders = [
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      // 'wasm-unsafe-eval' lets shiki instantiate its Oniguruma WASM matcher
      // (needed for syntax highlighting); it does NOT allow JS eval.
      "script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' https: data: blob:",
      "font-src 'self' data:",
      "connect-src 'self'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
    ].join("; "),
  },
]

const nextConfig = {
  // Node.js server mode (not static export). The app uses API routes
  // (`app/api/views/`) and dynamic features that require a running server.
  poweredByHeader: false,
  images: {
    // 启用 Next.js 图片优化
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },
  // 支持 Markdown 文件作为 raw 字符串导入
  webpack: (config) => {
    config.module.rules.push({
      test: /\.md$/,
      type: 'asset/source',
    })
    return config
  },
}

module.exports = nextConfig
