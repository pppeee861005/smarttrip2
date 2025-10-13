import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias ?? {}),
    };
    return config;
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' https://cdn.platform.openai.com https://js.intercomcdn.com blob:",
              "style-src 'self' 'unsafe-inline' https://cdn.platform.openai.com",
              "img-src 'self' blob: data: https://cdn.platform.openai.com",
              "font-src 'self' https://cdn.platform.openai.com",
              "connect-src 'self' https://api.openai.com https://cdn.platform.openai.com wss://api.openai.com https://files.service.openai.com https://platform.openai.com",
              "frame-src 'self' https://cdn.platform.openai.com https://intercom-sheets.com https://platform.openai.com",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join("; "),
          },
        ],
      },
    ];
  },
  transpilePackages: ['@openai/chatkit-react'],
  // Enable compression and optimization for production
  compress: true,
  poweredByHeader: false,
};

export default nextConfig;
