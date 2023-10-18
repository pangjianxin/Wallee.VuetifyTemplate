// Plugins
import vue from "@vitejs/plugin-vue";
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
import VueRouter from "unplugin-vue-router/vite";
import ViteFonts from "unplugin-fonts/vite";
import AutoImport from "unplugin-auto-import/vite";
import Layouts from "vite-plugin-vue-layouts";
import { VueRouterAutoImports } from "unplugin-vue-router";
// Utilities
import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VueRouter({
      routesFolder: "src/views",
      extensions: [".vue"],
      exclude: ["src/views/**/components"],
      dts: "./typed-router.d.ts",
    }),
    vue({
      template: { transformAssetUrls },
    }),
    // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
    vuetify({
      autoImport: true,
      styles: {
        configFile: "src/styles/settings.scss",
      },
    }),
    AutoImport({
      dts: true,
      imports: ["vue", "@vueuse/core", "pinia", VueRouterAutoImports],
      vueTemplate: true,
    }),
    Layouts({
      layoutsDirs: "src/layouts",
      defaultLayout: "default",
    }),
    ViteFonts({
      google: {
        families: [
          {
            name: "Roboto",
            styles: "wght@100;300;400;500;700;900",
          },
        ],
      },
    }),
  ],
  define: { "process.env": {} },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
    extensions: [".js", ".json", ".jsx", ".mjs", ".ts", ".tsx", ".vue"],
  },
  server: {
    port: 3001,
  },
});
