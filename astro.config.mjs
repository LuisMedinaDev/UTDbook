import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import clerk from "@clerk/astro";
import { dark } from "@clerk/themes";
import { esES } from '@clerk/localizations';
import vercel from '@astrojs/vercel';

export default defineConfig({
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

       adapter: vercel(),
});
