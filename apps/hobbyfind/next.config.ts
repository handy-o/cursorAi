import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: process.env.NODE_ENV === 'production' ? '/cursorAi/hobbyFind' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/cursorAi/hobbyFind' : '',
  images: {
    unoptimized: true
  },
  eslint: {
    ignoreDuringBuilds: true,
  }
}

export default nextConfig
