/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
        pathname: "/images/tcfgh3jw/production/**",
      },
    ],
  },
  reactStrictMode: false, // ✅ This is default
}; // next.config.js

module.exports = nextConfig;
