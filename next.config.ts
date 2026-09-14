import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  // 301 Permanent Redirects per TRD.md Section 7 to preserve legacy SEO rankings
  async redirects() {
    return [
      {
        source: "/product/jiunn-long-double-jersey",
        destination: "/machines/double-jersey/jiunn-long-double-jersey",
        permanent: true,
      },
      {
        source: "/product/jiunn-long-double-jersey/",
        destination: "/machines/double-jersey/jiunn-long-double-jersey",
        permanent: true,
      },
      {
        source: "/product/longjun",
        destination: "/machines/double-jersey/longjun-double-jersey",
        permanent: true,
      },
      {
        source: "/product/longjun/",
        destination: "/machines/double-jersey/longjun-double-jersey",
        permanent: true,
      },
      {
        source: "/product/rongxiang-single-jersey",
        destination: "/machines/single-jersey/rongxiang-single-jersey",
        permanent: true,
      },
      {
        source: "/product/rongxiang-single-jersey/",
        destination: "/machines/single-jersey/rongxiang-single-jersey",
        permanent: true,
      },
      {
        source: "/product/shanli-double-jersey",
        destination: "/machines/double-jersey/shanli-double-jersey",
        permanent: true,
      },
      {
        source: "/product/shanli-double-jersey/",
        destination: "/machines/double-jersey/shanli-double-jersey",
        permanent: true,
      },
      {
        source: "/product/wjm-double-jersey",
        destination: "/machines/double-jersey/wjm-double-jersey",
        permanent: true,
      },
      {
        source: "/product/wjm-double-jersey/",
        destination: "/machines/double-jersey/wjm-double-jersey",
        permanent: true,
      },
      {
        source: "/product/xiangying-double-jersey",
        destination: "/machines/double-jersey/xiangying-double-jersey",
        permanent: true,
      },
      {
        source: "/product/xiangying-double-jersey/",
        destination: "/machines/double-jersey/xiangying-double-jersey",
        permanent: true,
      },
      {
        source: "/about-us-3",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/about-us-3/",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/contact-us",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/contact-us/",
        destination: "/contact",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
