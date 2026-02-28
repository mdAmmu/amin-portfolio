import type { NextConfig } from "next";
import createMDX from '@next/mdx';

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    // Simplified MDX configuration for Turbopack compatibility
    // Actual markdown rendering is handled by react-markdown
  },
});

export default withMDX(nextConfig);
