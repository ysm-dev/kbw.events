import type { NextConfig } from "next"

const config: NextConfig = {
  reactStrictMode: true,
  compiler: {
    // removeConsole: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
}

export default config
