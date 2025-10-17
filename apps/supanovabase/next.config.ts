import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Next-Auth와 API 라우트를 사용하려면 output: "export"를 제거해야 함
  // 개발 환경에서는 서버 기능이 필요하므로 빈 설정 사용
};

export default nextConfig;
