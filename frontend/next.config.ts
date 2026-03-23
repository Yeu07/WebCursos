import type { NextConfig } from "next";

  
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "webcursos777.blob.core.windows.net",
      },
    ],
  },
};

module.exports = nextConfig;
