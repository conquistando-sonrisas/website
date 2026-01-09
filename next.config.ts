import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  transpilePackages: ['next-mdx-remote'],
  images: {
    remotePatterns: [{
      protocol: 'https',
      hostname: 'cms.conquistandosonrisas.org',
      pathname: '/uploads/**'
    }, {
      protocol: 'https',
      hostname: 'static-content-lccc.s3.us-east-1.amazonaws.com',
    }]
  }
};

export default nextConfig;
