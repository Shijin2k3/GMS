//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { composePlugins, withNx } = require('@nx/next');
const path = require('path');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {},
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@': path.resolve(__dirname, 'src'),
      '@/components': path.resolve(__dirname, 'src/components'),
      '@/atoms': path.resolve(__dirname, 'src/components/atoms'),
      '@/hooks': path.resolve(__dirname, 'src/hooks'),
      '@/services': path.resolve(__dirname, 'src/services'),
      '@/helpers': path.resolve(__dirname, 'src/helpers'),
      '@/types': path.resolve(__dirname, 'src/types'),
      '@/api': path.resolve(__dirname, 'src/api'),
      '@/features': path.resolve(__dirname, 'src/features'),
      '@lib': path.resolve(__dirname, 'lib'),
    };
    return config;
  },
};

const plugins = [withNx];

module.exports = composePlugins(...plugins)(nextConfig);
