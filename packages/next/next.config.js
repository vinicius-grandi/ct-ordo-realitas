const path = require('path');
const withTM = require('next-transpile-modules')(['@ct-ordo-realitas/app']);
const { i18n } = require('./next-i18next.config');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  i18n,
}

module.exports = withTM(nextConfig);
