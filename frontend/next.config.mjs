/** @type {import('next').NextConfig} */

import withPWA from "next-pwa";

const pwaConfig = {
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "local",
};

const nextConfig = {
};

export default withPWA({
  ...nextConfig,
  ...pwaConfig,
});
