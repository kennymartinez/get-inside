// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import playformInline from "@playform/inline";
import netlify from "@astrojs/netlify";
import tailwindcss from "@tailwindcss/vite";

import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
    site: "https://astro-hyperdrive.netlify.app",
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
    output: "static",
    devToolbar: {
        enabled: false,
    },
    adapter: netlify(),
    vite: {
        plugins: [tailwindcss()],
    },
});
