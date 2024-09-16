// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;
// next.config.mjs
export default {
  images: {
    remotePatterns: [
      // {
      //   protocol: 'https',
      //   hostname: '**.com',
      //   port: '',
      //   pathname: '/**',
      // },
      {
        protocol: 'https',
        hostname: '**.com',
        port: '',
        pathname: '/**',
      }
    ],
  },
};
  
