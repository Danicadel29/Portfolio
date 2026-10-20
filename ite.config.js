import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
    base: "/",

    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, "index.html"),
                projets: resolve(__dirname, "projets.html"),
                dataplays: resolve(__dirname, "dataplays.html"),
                see: resolve(__dirname, "see.html"),
                celestia: resolve(__dirname, "celestia.html"),
                souffle: resolve(__dirname, "souffle.html")
            }
        }
    }
});