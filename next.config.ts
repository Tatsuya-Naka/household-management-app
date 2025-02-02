import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: `${process.env.AUTH_AWSS3_BUCKET}.s3.${process.env.AWSS3_REGION}.amazonaws.com`,
      },
      {
        protocol: 'https',
        hostname: `${process.env.AUTH_AWSS3_BUCKET_TEMP}.s3.${process.env.AWSS3_REGION}.amazonaws.com`,
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },
};

export default nextConfig;