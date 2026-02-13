import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "images.example.com",
      "hostbrake.com",
      "localhost",
      "placehold.co",
      "bandenconcurrent-production.up.railway.app",
      "res.cloudinary.com",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.ngrok-free.dev",
      },
    ],
  },
};

export default nextConfig;
