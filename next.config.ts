import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb", // Set this to 10MB or higher depending on your needs
    },
  },
};

export default nextConfig;