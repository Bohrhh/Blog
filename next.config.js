/** @type {import('next').NextConfig} */
const isProduction = process.env.NODE_ENV === 'production'

const nextConfig = {
  // 移除静态导出，使用 Node.js 服务器模式
  // output: 'export',
  images: {
    unoptimized: true
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
