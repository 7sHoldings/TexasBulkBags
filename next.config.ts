import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep nodemailer out of the bundle so its dynamic requires work at runtime.
  serverExternalPackages: ["nodemailer"],
  // Allow a higher-quality variant for the logo.
  images: {
    qualities: [75, 95],
  },
};

export default nextConfig;
