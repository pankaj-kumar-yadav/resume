import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.ufs.sh",
        pathname: "/f/**",
      },
      {
        protocol: "https",
        hostname: "api.microlink.io",
      },
      {
        protocol: "https",
        hostname: "www.google.com",
        pathname: "/s2/favicons",
      },
      {
        protocol: "https",
        hostname: "lms.learnxg.com",
      },
      {
        protocol: "https",
        hostname: "www.botjunior.com",
      },
      {
        protocol: "https",
        hostname: "www.continuumenergy.in",
      },
      {
        protocol: "https",
        hostname: "www.techapsol.com",
        pathname: "/logo/**",
      },
      {
        protocol: "https",
        hostname: "www.checklist.design",
        pathname: "/favicon.svg",
      },
    ],
  },
};

export default nextConfig;
