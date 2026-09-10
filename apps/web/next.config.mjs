/** @type {import('next').NextConfig} */
const API_URL = process.env.API_INTERNAL_URL || 'http://localhost:4000';
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@college-junction/types'],
  images: { remotePatterns: [{ protocol: 'https', hostname: 'res.cloudinary.com' }] },
  // Dev/same-host convenience: proxy /api/* to the Express server so the browser
  // never calls localhost directly. In split-origin deployments set NEXT_PUBLIC_API_URL
  // and this rewrite is simply unused.
  async rewrites() {
    return [{ source: '/api/:path*', destination: `${API_URL}/api/:path*` }];
  },
};
export default nextConfig;
