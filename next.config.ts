import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname:'**.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com", 
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",     },
    ],
  },
};

export default nextConfig;
