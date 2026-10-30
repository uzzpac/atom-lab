import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// base نسبی: روی GitHub Pages با هر نام مخزن کار می‌کند
export default defineConfig({ base: "./", plugins: [react()], test: { environment: "node" } });
