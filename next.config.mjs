import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();
const isStatic = process.env.STATIC_EXPORT === 'true';

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  // Static-export build for LAMP/Apache hosting under `/mvdocs`.
  // Enabled by `STATIC_EXPORT=true` (see `pnpm build:static`).
  // Search bar is hidden in static mode (no backend); the Fumadocs search
  // API route is stashed out of the way by `scripts/build-static.mjs`.
  ...(isStatic && {
    output: 'export',
    basePath: '/mvdocs',
    images: { unoptimized: true },
    trailingSlash: true,
  }),
};

export default withMDX(config);
