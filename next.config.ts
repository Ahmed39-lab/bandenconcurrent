const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "bandenconcurrent-production.up.railway.app",
      },
      {
        protocol: "https",
        hostname: "hostbrake.com",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
    ],
  },
};

export default nextConfig;
