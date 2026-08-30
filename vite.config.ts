import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { imagetools } from "vite-imagetools";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(() => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  // imagetools generates the width variants referenced by "?w=...&as=picture"
  // imports, so a phone can fetch an image sized for its screen instead of the
  // full 1920px file.
  plugins: [react(), imagetools()],
  build: {
    rollupOptions: {
      output: {
        // The app shipped as one 482 KB chunk, so any change to any page
        // invalidated the whole thing and every visitor re-downloaded the
        // dependencies too. Splitting by library keeps those cached across
        // deploys, and pulls the map stack off the critical path.
        manualChunks(id) {
          if (!id.includes("node_modules")) return;
          // react-simple-maps drags in d3 and topojson and is used by one
          // component, which is itself only rendered after mount.
          if (/react-simple-maps|d3-|topojson/.test(id)) return "maps";
          if (id.includes("framer-motion")) return "motion";
          if (id.includes("react-router")) return "router";
          if (id.includes("@radix-ui") || id.includes("cmdk") || id.includes("vaul")) return "ui";
          // react, react-dom and scheduler must stay in one chunk together.
          if (/[\/]node_modules[\/](react|react-dom|scheduler)[\/]/.test(id)) return "react";
          return "vendor";
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime", "@tanstack/react-query", "@tanstack/query-core"],
  },
}));
