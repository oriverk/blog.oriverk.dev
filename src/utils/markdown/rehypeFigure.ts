// @ts-nocheck
import type { Plugin } from 'unified'
import { visit } from 'unist-util-visit'
import { is } from 'unist-util-is'

type Options = Record<string, any>

export const rehypeFigure: Plugin = (options: Options = {}) => {
  return (tree: any) => {
    visit(tree, (node: any) => {
      if (is(node, { tagName: 'p' })) {
        if (node.children.length === 1 && is(node.children[0], { tagName: 'img' })) {
          node.tagName = 'figure'

          node.children[0].properties.loading = 'lazy'
          node.children[0].properties.decoding = 'async'

          if (node.children[0].properties.title) {
            node.children.push({
              type: 'element',
              tagName: 'figcaption',
              properties: {},
              children: [
                {
                  type: 'text',
                  value: node.children[0].properties.title,
                },
              ],
            })
          }
        }
      }
    })
  }
}
