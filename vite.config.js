import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Must match the GitHub repository name for project Pages (user.github.io/<repo>/).
export default defineConfig({
  plugins: [react()],
  base: "/seating/",
});
