import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    /**
     * This is collection for content-wind theme
     * Create `content.config.ts` in project root to overwrite this
     */
    content: defineCollection({
      type: 'page',
      source: '**',
      schema: z.object({
        layout: z.string(),
      }),
    }),

    articles: defineCollection({
      type: 'page',
      source: 'articles/**',
      schema: z.object({
        layout: z.string().optional(),
        title: z.string().optional(),
        description: z.string().optional(),
        seo: z
          .object({
            description: z.string().optional(),
            updatedAt: z.string().optional(),
            image: z.string().optional(),
          })
          .optional(),
      }).passthrough(),
    }),
  },
})
