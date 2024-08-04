import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import dotenv from "dotenv";
dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: process.env.VITE_BACKEND_URI,
        changeOrigin: true,
        secure: false,
      },
    },
  },
  plugins: [react()],
});
