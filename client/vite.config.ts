import path from "path";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
console.log(path.resolve(__dirname, "./src"))
export default defineConfig({
    plugins: [tailwindcss()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
});
