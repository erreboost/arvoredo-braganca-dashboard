import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react()],
  build: {
    outDir: "dist",
    assetsDir: "assets",
  },
  define: {
    __VITE_REACT_APP_ESRI_API_KEY__: JSON.stringify(env.VITE_VERCEL_ENV),
  },
  }
})