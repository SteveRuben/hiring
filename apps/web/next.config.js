/* const withTM = require("next-transpile-modules")(["ui"]);

module.exports = withTM({
  reactStrictMode: true,
});
 */
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Add error handling options
  onError: (err) => {
    console.error('Next.js build error:', err);
  },
  // Disable automatic static optimization for error pages if needed
  experimental: {
    sri: true,
  }
}

module.exports = nextConfig