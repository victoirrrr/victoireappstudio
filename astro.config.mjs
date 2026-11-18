// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://victoirappstudio.com',
  output: 'static',
  trailingSlash: 'never',
  // the site's own CSS is small: inline it so the first paint waits on no stylesheet requests
  build: { format: 'directory', inlineStylesheets: 'always' },
  image: {
    // Screenshots are 1320x2868. Nothing on the page shows one wider than ~600 css px,
    // so 2x tops out at 1200 and the originals never ship.
    layout: 'constrained',
    responsiveStyles: true,
  },
});
