/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/jewelry-store',
  assetPrefix: '/jewelry-store/',
  images: {
    unoptimized: true,
  },
}

export default nextConfig
