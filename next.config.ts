import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["images.example.com", "hostbrake.com","localhost","placehold.co",
    "bandenconcurrent-production.up.railway.app","res.cloudinary.com"],
  },
};

export default nextConfig;
