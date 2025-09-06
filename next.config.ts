import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "cfsoedqtdrmqptfcudra.supabase.co", // ganti sesuai domain supabase kamu
    ],
  },
};

export default nextConfig;
