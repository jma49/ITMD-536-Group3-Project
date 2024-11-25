import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Next.js configuration options
  env: {
    API_KEY: process.env.API_KEY, // Explicitly declare environment variable
  },
  webpack: (config, { isServer }) => {
    // Exclude Cypress test files from client-side builds
    if (!isServer) {
      config.module.rules.push({
        test: /\.cy\.(js|ts|tsx)$/, // Match Cypress test file extensions
        use: 'ignore-loader', // Use ignore-loader to skip these files
      });
    }
    return config; // Return the modified config
  },
};

export default nextConfig;
