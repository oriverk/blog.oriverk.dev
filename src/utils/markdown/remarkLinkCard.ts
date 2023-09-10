// @ts-nocheck
import type { Plugin, Transformer } from 'unified'
import type { Node, Parent } from 'unist'
import type { Paragraph, Link, Resource } from "mdast";

import { visit } from 'unist-util-visit'
import { is } from 'unist-util-is'
import { isParent, isLink, isParagraph } from './isMdastNode'

interface LinkCard extends Parent, Resource {
  type: "linkCard",
  meta: {
    url: string;
    title: string;
    description: string;
    og: string | undefined;
    icon: string | undefined;
  }
}

function isLinkCard(node: Node): node is LinkCard {
  if (!isParagraph(node)) {
    return false;
  }

  if (node.children.length !== 1) {
    return false;
  }

  const singleChild = node.children[0];

  if (
    !(
      isLink(singleChild) &&
      singleChild.children[0].type == "text" &&
      singleChild.url.startsWith("http")
    )
  ) {
    return false;
  }

  return true;
}

type Options = Record<string, any>

export const remarkLinkCard: Plugin = (options: Options = {}) => {
  return (tree: Node) => { 
    visit(tree, (node: Node, index: number, parent: Parent) => {
      if (is(node, { type: 'link' })) {
        const { url } = node
        const isInternalLink = url.startsWith('/')
        if (isInternalLink) {
          const linkCard = {
            type: 'element',
            tagName: 'LinkCard',
            properties: { url },
            children: node.children,
          }
          parent.children[index] = linkCard
        }
      }
    })
  }
}