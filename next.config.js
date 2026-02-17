/** @type {import('next').NextConfig} */
const nextConfig = {
  // 只在生产构建时启用静态导出
  output: process.env.NODE_ENV === 'production' ? 'export' : undefined,
  distDir: process.env.NODE_ENV === 'production' ? 'dist' : '.next',
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
