import { defineConfig } from 'astro/config'
import remarkSmartypants from 'remark-smartypants'

export default defineConfig({
  site: 'https://ronan.amicel.net',
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
  markdown: {
    remarkPlugins: [remarkSmartypants],
    shikiConfig: {
      theme: 'github-light',
    },
  },
})
