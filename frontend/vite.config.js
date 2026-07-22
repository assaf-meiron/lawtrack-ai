import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// The API base is read at runtime from VITE_API_BASE (see src/api.js);
// defaults to http://localhost:8000. The backend enables CORS for :5173.
export default defineConfig({
  plugins: [react()],
  server: { port: 5173, host: "localhost" },
});
