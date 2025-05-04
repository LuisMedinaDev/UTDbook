// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import node from "@astrojs/node";
import clerk from "@clerk/astro";
import { dark } from "@clerk/themes";
import { esES } from '@clerk/localizations';

export default defineConfig({
  experimental: {
    session: true
  },
    vite: {
        plugins: [tailwindcss()],
      },
      output: "server",
      integrations: [clerk({
        localization: esES,
        appearance: {
          baseTheme: dark,
        }
})],
       adapter: node({ mode: "standalone" })
});
