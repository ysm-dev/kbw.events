import { defineCollection, defineConfig } from "@content-collections/core"
import { compileMarkdown } from "@content-collections/markdown"
import { visit } from "unist-util-visit"

const posts = defineCollection({
  name: "posts",
  directory: "app",
  include: "**/*.md",
  schema: (z) => ({
    title: z.string().optional(),
  }),
  transform: async (document, context) => {
    const html = await compileMarkdown(context, document, {
      rehypePlugins: [rehypeTargetBlank],
    })
    return {
      ...document,
      html,
    }
  },
})

export default defineConfig({
  collections: [posts],
})

function rehypeTargetBlank() {
  return (tree: any) => {
    visit(tree, "element", (node) => {
      if (node.tagName === "a") {
        node.properties = node.properties || {}
        node.properties.target = "_blank"
        node.properties.rel = "noopener"
      }
    })
  }
}
