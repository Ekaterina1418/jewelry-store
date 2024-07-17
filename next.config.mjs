/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    domains: ["cdn.dummyjson.com"],
    unoptimized: true,
  },
};

export default nextConfig;
