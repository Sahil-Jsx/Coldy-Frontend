import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react-swc'
import path from "path";
// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: 5173,
  },
  resolve: {
    alias: {
      "@img": path.resolve(__dirname, "./src/assets/imgs"),
      // "@font": path.resolve(__dirname, "./src/assets/fonts"),
      // "@css": path.resolve(__dirname, "./src/assets/css"),
      "@svg": path.resolve(__dirname, "./src/assets/svgs"),
    },
  },
  plugins: [react()],
});
