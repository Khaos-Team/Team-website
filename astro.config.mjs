import { defineConfig } from 'astro/config';
import tailwind from '@tailwindcss/vite';
import vue from '@astrojs/vue';

// https://astro.build/config
export default defineConfig({
  site: 'https://khaos.io',
  server: {
    host: true,
    port: 4321,
  },
  integrations: [vue()],
  markdown: {
    shikiConfig: {
      theme: 'one-dark-pro',
      wrap: true,
    },
  },
  vite: {
    plugins: [tailwind()],
  },
  output: 'static',
});
