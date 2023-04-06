import type { Plugin } from 'unified'
import { visit } from 'unist-util-visit'
import { is } from 'unist-util-is'

type Options = Record<string, any>

export const rehypeAnchor: Plugin = (options: Options = {}) => {
  return (tree: any) => {
    visit(tree, (node: any) => {
      if (is(node, { tagName: 'a' })) {
        let props: any = node.properties || (node.properties = {})

        props.target = '_blank'
        props.rel = 'noopener noreferrer'
      }
    })
  }
}
