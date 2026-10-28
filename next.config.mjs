/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Image optimization is on so next/image can serve each screen a right-sized AVIF/WebP
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
