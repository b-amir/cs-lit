/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.mjs");

import withBundleAnalyzerBase from '@next/bundle-analyzer';
const withBundleAnalyzer = withBundleAnalyzerBase({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import("next").NextConfig} */
const config = {
  output: 'standalone',
  reactStrictMode: true,
  ...withBundleAnalyzer({}),

  /**
   * If you have `experimental: { appDir: true }` set, then you must comment the below `i18n` config
   * out.
   *
   * @see https://github.com/vercel/next.js/issues/41980
   */
  images: {
    // domains: [
    //   "avatars.githubusercontent.com",
    //   "cdn.discordapp.com",
    //   "lh3.googleusercontent.com",
    //   "*.googleusercontent.com",
    // ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.discordapp.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.googleusercontent.com',
        port: '',
        pathname: '/**',
      },

    ],
  },
  typescript: {
    // ignore some type errors for now.
    ignoreBuildErrors: true,
  },
  pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'],


  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
};
export default config;
