import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import { createMarkdownProcessor } from '@astrojs/markdown-remark'
import type { APIContext } from 'astro'

export async function GET(context: APIContext) {
  const processor = await createMarkdownProcessor()

  const articles = await getCollection('articles')
  const recettes = await getCollection('recettes')
  const allPosts = [...articles, ...recettes].sort(
    (a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
  )

  const items = await Promise.all(
    allPosts.map(async (post) => {
      const link = post.data.path || `/${post.collection}/${post.slug}/`
      const rendered = await processor.render(post.body || '')

      // Replace relative image paths with absolute URLs
      const siteUrl = context.site!.toString().replace(/\/$/, '')
      const htmlContent = rendered.code.replace(
        /src="\.\/([^"]*)"/g,
        `src="${siteUrl}${link}$1"`
      )

      return {
        title: post.data.title,
        pubDate: new Date(post.data.date + 'T12:00:00Z'),
        link,
        description: stripMarkdown(post.body || '').slice(0, 200),
        content: htmlContent,
      }
    })
  )

  return rss({
    title: 'Ronan Amicel',
    description: 'Site personnel de Ronan Amicel',
    site: context.site!,
    items,
  })
}

function stripMarkdown(text: string): string {
  return text
    .replace(/<[^>]*>/g, '')
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[#*_`~>]/g, '')
    .split('\n')
    .filter((l) => l.trim())
    .join(' ')
}
