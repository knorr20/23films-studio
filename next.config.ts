import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "23films.studio",
        pathname: "/wp-content/**",
      },
    ],
  },
};

export default nextConfig;
