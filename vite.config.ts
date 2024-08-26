import fs from "fs/promises";
import svgr from "@svgr/rollup";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  resolve: {
    alias: {
      assets: "/src/assets",
      components: "/src/components",
      config: "/src/config",
      context: "/src/context",
      hooks: "/src/hooks",
      pages: "/src/pages",
      routes: "/src/routes",
      services: "/src/services",
      layouts: "/src/layouts",
      utils: "/src/utils",
      type: "/src/types",
      store: "/src/store",
      theme: "/src/theme",
    },
  },
  esbuild: {
    loader: "tsx",
    include: /src\/.*\.tsx?$/,
    exclude: [],
  },
  optimizeDeps: {
    esbuildOptions: {
      plugins: [
        {
          name: "load-js-files-as-tsx",
          setup(build) {
            build.onLoad({ filter: /src\\.*\.js$/ }, async (args) => ({
              loader: "jsx",
              contents: await fs.readFile(args.path, "utf8"),
            }));
          },
        },
      ],
    },
  },
  server: {
    port: 5180,
    proxy: {
      "/api/v1": {
        target: "http://localhost:5000/api/v1",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api\/v1/, ""),
      },
    },
  },

  plugins: [svgr(), react()],
});
