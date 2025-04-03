import MonacoWebpackPlugin from 'monaco-editor-webpack-plugin';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    // Utiliser le plugin uniquement côté client
    if (!isServer) {
      config.plugins.push(
        new MonacoWebpackPlugin({
          languages: ['javascript', 'typescript', 'html', 'css', 'json'],
          filename: 'static/[name].worker.js',
        })
      );
    }
    return config;
  },
};

export default nextConfig;
