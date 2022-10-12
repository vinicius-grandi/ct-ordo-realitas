const path = require('path');
const withTM = require('next-transpile-modules')(['@ct-ordo-realitas/app']);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
}

module.exports = withTM(nextConfig);
