import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Enable fast refresh and optimize for dev speed      // Remove dev-only Babel plugins for prod
      babel: {
        plugins: [],
        presets: [],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    // Pre-bundle common dependencies for faster dev startup
    include: [
      'react',
      'react-dom',
      'gsap',
      'framer-motion',
      'lodash',
      'clsx',
      'i18next',
      'react-i18next',
    ],
    esbuildOptions: {
      // Use esbuild for even faster dependency pre-bundling
      target: 'esnext',
    },
  },
  esbuild: {
    // Use the fastest possible target for local dev
    target: 'esnext',
    legalComments: 'none',
  },
  build: {
    // Use esbuild for minification for speed
    minify: 'esbuild',
    target: 'esnext',
    cssTarget: 'chrome90',
    sourcemap: false,
    chunkSizeWarningLimit: 1200,
  },
  server: {
    // Enable filesystem strict mode for faster HMR
    fs: {
      strict: true,
    },
    // Reduce polling interval for faster file change detection
    watch: {
      usePolling: false,
      interval: 100,
    },
  },
  cacheDir: 'node_modules/.vite_cache',
});
