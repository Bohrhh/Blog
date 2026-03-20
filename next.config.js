/** @type {import('next').NextConfig} */
const isProduction = process.env.NODE_ENV === 'production'

const nextConfig = {
  // 移除静态导出，使用 Node.js 服务器模式
  // output: 'export',
  images: {
    // 启用 Next.js 图片优化
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },
  // 支持 Markdown 文件作为 raw 字符串导入
  webpack: (config) => {
    config.module.rules.push({
      test: /\.md$/,
      type: 'asset/source',
    })
    return config
  }
}

module.exports = nextConfig
