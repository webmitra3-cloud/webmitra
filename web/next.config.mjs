/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async rewrites() {
    return [
      {
        source: "/healthz",
        destination: "/api/healthz",
      },
    ];
  },
  env: {
    NEXT_PUBLIC_WHATSAPP_NUMBER:
      process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || process.env.VITE_WHATSAPP_NUMBER || "",
  },
};

export default nextConfig;
