/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  i18n: {
    locales: ["en", "fr", "nl", "de", "es", "it", "pt"],
    defaultLocale: "en",
  },
};

module.exports = nextConfig;
