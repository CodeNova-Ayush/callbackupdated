import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    '/**': ['./prisma/dev.db', './prisma/**'],
  },
};

export default nextConfig;
