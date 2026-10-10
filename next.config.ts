import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/courses/tet", destination: "/courses/ap-tet", permanent: true },
      { source: "/courses/dsc", destination: "/courses/ap-dsc", permanent: true },
      { source: "/exams/tet/:path*", destination: "/exams/ap-tet/:path*", permanent: true },
      { source: "/exams/dsc/:path*", destination: "/exams/ap-dsc/:path*", permanent: true },
      { source: "/papers/tet/:path*", destination: "/papers/ap-tet/:path*", permanent: true },
      { source: "/papers/dsc/:path*", destination: "/papers/ap-dsc/:path*", permanent: true },
    ];
  },
};

export default nextConfig;
