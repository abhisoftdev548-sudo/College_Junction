/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@college-junction/types'],
  images: { remotePatterns: [{ protocol: 'https', hostname: 'res.cloudinary.com' }] },
  // Self-contained server bundle for Docker / standalone hosts (Dockerfile.web sets BUILD_STANDALONE=1).
  ...(process.env.BUILD_STANDALONE === '1' ? { output: 'standalone' } : {}),
  // /api/* is proxied to the Express server by src/app/api/[...path]/route.ts
};
export default nextConfig;
