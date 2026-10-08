import type { NextConfig } from 'next';

const isProduction = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath: isProduction ? '/nomadic-traveler' : '',
  assetPrefix: isProduction ? '/nomadic-traveler/' : '',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
