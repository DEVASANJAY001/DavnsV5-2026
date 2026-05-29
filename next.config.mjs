/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    config.watchOptions = {
      ...config.watchOptions,
      ignored: [
        '**/node_modules',
        'C:\\pagefile.sys',
        'C:\\swapfile.sys',
        'C:\\hiberfil.sys',
        'C:\\DumpStack.log.tmp'
      ],
    };
    return config;
  },
}

export default nextConfig
