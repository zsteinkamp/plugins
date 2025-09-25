import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      // Basic redirect
      {
        source: '/contribute',
        destination: 'https://buy.stripe.com/fZu9AU8AocAFeq12Embwk00',
        permanent: false,
      },
    ]
  }
};

export default nextConfig;
