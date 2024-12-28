import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config, { isServer }) => {
    // MonacoエディターをSSRから除外
    if (isServer) {
      config.externals = [...(config.externals || []), "monaco-editor"];
    }
    return config;
  },
};

export default nextConfig;
