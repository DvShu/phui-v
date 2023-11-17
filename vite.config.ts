import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import * as path from "path";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    dts({
      copyDtsFiles: false,
    }),
  ],
  build: {
    outDir: "lib",
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      formats: ["es"],
      fileName: () => {
        return "index.js";
      },
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ["vue", "ph-utils/lib/validator", "ph-utils/lib/index"],
    },
  },
});
