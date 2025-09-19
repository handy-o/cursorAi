import type { NextConfig } from 'next';
/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath:  isDev ? "" : "/cursorAi/gpt",
  assetPrefix: isDev ? "" : "/cursorAi/gpt/",
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
