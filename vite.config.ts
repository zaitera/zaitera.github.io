import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// Plugin to replace environment variables in HTML during build
const htmlEnvReplace = () => {
  return {
    name: 'html-env-replace',
    transformIndexHtml(html: string) {
      return html.replace(
        /%VITE_GA_MEASUREMENT_ID%/g,
        process.env.VITE_GA_MEASUREMENT_ID || ''
      );
    },
  };
};

export default defineConfig({
  plugins: [
    react(),
    htmlEnvReplace(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist"),
    emptyOutDir: true,
    rollupOptions: {
      external: [],
      output: {
        assetFileNames: (assetInfo) => {
          // Keep JSON data files in src/data/ path structure
          if (assetInfo.name?.endsWith('.json') && assetInfo.name?.includes('data/')) {
            return 'src/data/[name][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        }
      }
    }
  },
  assetsInclude: ['**/*.json'], // Include JSON files as assets
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
