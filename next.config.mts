/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  distDir: "dist",
  images: {
    unoptimized: true,
  },
  experimental: {
    appDir: true, // Если вы используете папку app для роутинга
  },
  pageExtensions: ["tsx", "ts", "jsx", "js"], // Укажите расширения файлов, если используете TypeScript
};

export default nextConfig;
