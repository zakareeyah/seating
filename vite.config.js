import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import sri from "vite-plugin-sri-gen";

// Must match the GitHub repository name for project Pages (user.github.io/<repo>/).
export default defineConfig({
  plugins: [
    react(),
    sri({
      algorithm: "sha384",
      crossorigin: "anonymous",
      skipResources: ["https://fonts.googleapis.com/*", "*.gstatic.com/*"],
    }),
  ],
  base: "/seating/",
});
