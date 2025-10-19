import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  // 개발환경에서는 basePath 없음, 배포환경에서는 basePath 적용
  basePath: process.env.NODE_ENV === 'production' ? '/cursorAi/hobbyFind' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/cursorAi/hobbyFind' : '',
  images: {
    unoptimized: true
  }
}

export default nextConfig
