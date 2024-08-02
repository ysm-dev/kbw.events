const { withContentCollections } = require("@content-collections/next")

/** @type {import('next').NextConfig} */
const config = {
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

module.exports = withContentCollections(config)
