import createMDX from "@next/mdx";

const withMDX = createMDX({
  extension: /\.mdx?$/,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx"],
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      {
        source: "/call",
        destination:
          "https://www.adsthatconvert.co/?utm_source=x&utm_medium=profile",
        permanent: true,
      },
      {
        source: "/results/dialmycalls",
        destination: "/results/b2b-saas-leads",
        permanent: true,
      },
      {
        source: "/glossary",
        destination: "/saas-glossary",
        permanent: true,
      },
      {
        source: "/tools/a-b-test-calculator-for-statistical-significance",
        destination: "/tools/ab-testing-significance-calculator",
        permanent: true,
      },
      {
        source: "/ppc-keyword-concatenation-tool",
        destination: "/tools/ppc-keyword-concatenation-tool",
        permanent: true,
      },
      {
        source: "/dialmycalls",
        destination: "/results/b2b-saas-leads",
        permanent: true,
      },
      {
        source: "/amtech",
        destination: "/results/amtech",
        permanent: true,
      },
      {
        source: "/how-this-b2b-saas-2x-their-sign-ups-with-ideal-clients",
        destination: "/results/b2b-saas-leads",
        permanent: true,
      },
      {
        source: "/subscribe",
        destination: "https://grow.adsthatconvert.co/subscribe",
        permanent: true,
      },
      {
        source: "/sample-page",
        destination: "https://www.adsthatconvert.co/",
        permanent: true,
      },
      {
        source: "/landing-pages",
        destination: "https://www.adsthatconvert.co/",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*\\.(svg|jpg|jpeg|png|webp|avif|ico)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default withMDX(nextConfig);
