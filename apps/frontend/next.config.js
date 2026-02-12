//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const nextConfig = {
  // Pure Next.js config
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://192.168.43.188:3001/api/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
