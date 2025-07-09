// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import playformInline from "@playform/inline";
import netlify from "@astrojs/netlify";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
    site: "https://get-inside-colombia.netlify.app", 
    base: "/",
    integrations: [
        mdx(),
        playformInline({ Critters: true }),
        icon({
            include: {
                tabler: ["*"] 
            }
        })
    ],
    output: "server",
    adapter: netlify({
        // Use the default function mode instead of edge for better compatibility
        edgeMiddleware: false,
    }),
    vite: {
        plugins: [tailwindcss()],
    },
});
