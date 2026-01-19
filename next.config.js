/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'images.unsplash.com'],
  },
  // Vercel-optimierte Konfiguration
  swcMinify: true,
  // Umgebungsvariablen für Client-Side
  env: {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  },
}

module.exports = nextConfig
