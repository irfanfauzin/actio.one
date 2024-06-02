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
};

export default nextConfig;
