/** @type {import('next').NextConfig} */
const isProduction = process.env.NODE_ENV === 'production'

const nextConfig = {
  // 生产构建时启用静态导出
  output: isProduction ? 'export' : undefined,
  // 生产构建使用 dist，开发使用默认 .next
  distDir: isProduction ? 'dist' : undefined,
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
