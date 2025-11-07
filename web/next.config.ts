import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';
const isPreview = process.env.PREVIEW_MODE === 'true';

const nextConfig: NextConfig = {
  ...(isProd && { output: 'export' }),
  basePath: (isProd && !isPreview) ? '/english-reading-history' : '',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
