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
      {
        source: "/uploads/:path*",
        destination: "/api/uploads/:path*",
      },
    ];
  },
  env: {
    NEXT_PUBLIC_API_URL:
      process.env.NEXT_PUBLIC_API_URL ||
      process.env.VITE_API_URL ||
      process.env.NEXT_PUBLIC_API_BASE_URL ||
      process.env.VITE_API_BASE_URL ||
      "",
    NEXT_PUBLIC_WHATSAPP_NUMBER:
      process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || process.env.VITE_WHATSAPP_NUMBER || "",
  },
};

export default nextConfig;
