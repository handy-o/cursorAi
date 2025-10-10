import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: isDev ? "" : "/cursorAi/otherColor",
  assetPrefix: isDev ? "" : "/cursorAi/otherColor/",
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


