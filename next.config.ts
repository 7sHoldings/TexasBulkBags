import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep nodemailer out of the bundle so its dynamic requires work at runtime.
  serverExternalPackages: ["nodemailer"],
};

export default nextConfig;
