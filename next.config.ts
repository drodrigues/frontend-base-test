import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  trailingSlash: false,
  sassOptions: {
    prependData: `@use "${path.join(
      __dirname,
      'src',
      'stylesheets',
      'includes',
      '_includes.scss',
    )}" as *;`,
  },
  output: 'standalone',
  poweredByHeader: false,
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [{ key: 'x-nextjs-cache', value: '' }],
      },
    ];
  },
};

export default nextConfig;
