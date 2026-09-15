import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: the whole site builds to plain HTML/CSS in `out/`.
  // Host it free on Cloudflare Pages, Netlify, Vercel, or any static host.
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
