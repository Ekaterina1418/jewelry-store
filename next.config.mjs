/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    domains: ["cdn.dummyjson.com"],
    loader: "default",
  },
};

export default nextConfig;
