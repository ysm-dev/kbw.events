import { defineCollection, defineConfig } from "@content-collections/core"
import { compileMarkdown } from "@content-collections/markdown"

const posts = defineCollection({
  name: "posts",
  directory: "app",
  include: "**/*.md",
  schema: (z) => ({
    title: z.string().optional(),
    summary: z.string().optional(),
  }),
  transform: async (document, context) => {
    const html = await compileMarkdown(context, document)
    return {
      ...document,
      html,
    }
  },
})

export default defineConfig({
  collections: [posts],
})
