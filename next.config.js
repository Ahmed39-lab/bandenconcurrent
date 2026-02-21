/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

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

module.exports = nextConfig;