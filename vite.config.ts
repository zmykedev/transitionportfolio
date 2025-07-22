import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

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
      'react/jsx-runtime',
      'gsap',
      'gsap/dist/gsap',
      '@gsap/react',
      'framer-motion',
      'lodash',
      'clsx',
      'i18next',
      'react-i18next',
      'jotai',
      'usehooks-ts',
    ],
    esbuildOptions: {
      // Use esbuild for even faster dependency pre-bundling
      target: 'esnext',
      // Define global variables to avoid runtime checks
      define: {
        global: 'globalThis',
      },
    },
    // Force include dependencies that might be missed
    force: false,
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
    rollupOptions: {
      output: {
        // Create smaller chunks for better caching
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'animation-vendor': ['gsap', 'framer-motion'],
          'ui-vendor': ['clsx', 'usehooks-ts'],
          'i18n-vendor': ['i18next', 'react-i18next', 'jotai'],
        },
        // Optimize asset file names for better caching
        assetFileNames: assetInfo => {
          const info = assetInfo.name!.split('.');
          const ext = info[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
            return `assets/images/[name]-[hash][extname]`;
          }
          if (/woff2?|eot|ttf|otf/i.test(ext)) {
            return `assets/fonts/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      },
    },
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Preload modules for better performance
    modulePreload: {
      polyfill: true,
    },
    // Enable asset inlining for small files
    assetsInlineLimit: 4096,
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
