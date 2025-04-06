import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: ['next-mdx-remote'],
  images: {
    remotePatterns: [{
      protocol: 'https',
      hostname: 'static-content-lccc.s3.us-east-1.amazonaws.com',
    }]
  }
};

export default nextConfig;
