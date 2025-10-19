import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: process.env.NODE_ENV === 'production' ? '/cursorAi/hobbyfind' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/cursorAi/hobbyfind' : '',
  images: {
    unoptimized: true
  },
  eslint: {
    ignoreDuringBuilds: true,
  }
}

export default nextConfig
