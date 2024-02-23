/** @type {import('next').NextConfig} */

// import withPWA from "next-pwa";

// const pwaConfig = {
//   dest: "public",
//   register: true,
//   skipWaiting: true,
// };

// const nextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "pbs.twimg.com",
//         port: "",
//         pathname: "/**",
//       },
//     ],
//   },
//   reactStrictMode: true,
// };

// export default withPWA({
//   ...nextConfig,
//   ...pwaConfig,
// });

const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true
})

module.exports = withPWA({
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pbs.twimg.com',
        port: '',
        pathname: '/**'
      }
    ]
  }
})
