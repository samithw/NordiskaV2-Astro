import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  site: 'https://samithw.github.io',
  // Keep local development at /; GitHub Actions builds for the repository URL.
  base: process.env.GITHUB_ACTIONS === 'true' ? '/nordiska2' : '/',
  trailingSlash: 'always',
  devToolbar: { enabled: false },
});
