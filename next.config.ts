import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    API_KEY: process.env.API_KEY, // 显式声明环境变量
  },
};

export default nextConfig;
