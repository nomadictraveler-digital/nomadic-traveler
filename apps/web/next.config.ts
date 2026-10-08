import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath: '/nomadic-traveler',
  assetPrefix: '/nomadic-traveler/',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
