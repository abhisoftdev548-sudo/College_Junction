/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@college-junction/types'],
  images: { remotePatterns: [{ protocol: 'https', hostname: 'res.cloudinary.com' }] },
  // /api/* is proxied to the Express server by src/app/api/[...path]/route.ts
};
export default nextConfig;
