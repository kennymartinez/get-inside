// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import playformInline from "@playform/inline";
import netlify from "@astrojs/netlify";
import tailwindcss from "@tailwindcss/vite";

import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
    site: "https://get-inside-colombia.netlify.app", // Update with your actual Netlify URL
    base: "/",
    integrations: [
        mdx(),
        playformInline({ Critters: true }),
        icon({
            include: {
                tabler: ["*"] // Include all Tabler icons
            }
        })
    ],
    output: "server", // Changed from "static" to support API routes
    devToolbar: {
        enabled: false,
    },
    adapter: netlify(),
    vite: {
        plugins: [tailwindcss()],
    },
});
