import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: isDev ? "" : "/cursorAi/g2048",
  assetPrefix: isDev ? "" : "/cursorAi/g2048/",
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;

