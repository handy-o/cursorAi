import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: process.env.NODE_ENV === 'production' ? '/cursor-ai/gpt' : '/gpt',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/cursor-ai/gpt/' : '/gpt/',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
