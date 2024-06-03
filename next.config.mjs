/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
          {
            source: '/',
            destination: '/text-to-speech',
            permanent: true,
          },
        ]
      },
      images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: '*.amazonaws.com',

          },
        ],
      },
};

export default nextConfig;
