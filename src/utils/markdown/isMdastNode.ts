
import type { Node, Parent, Literal } from "unist";
import type { Paragraph, Text, Link } from "mdast";

// reference:
// [unified を使って Markdown を拡張する](https://zenn.dev/januswel/articles/745787422d425b01e0c1#%E3%83%A1%E3%83%83%E3%82%BB%E3%83%BC%E3%82%B8%E8%A8%98%E6%B3%95%E3%81%A7%E6%9B%B8%E3%81%8B%E3%82%8C%E3%81%A6%E3%81%84%E3%82%8B%E3%81%A8%E3%81%93%E3%82%8D%E3%82%92%E6%8E%A2%E3%81%99)

function isObject(target: unknown): target is { [key: string]: unknown } {
  return typeof target === "object" && target !== null;
}

// https://github.com/syntax-tree/unist#node
export function isNode(node: unknown): node is Node {
  return isObject(node) && "type" in node;
}

// https://github.com/syntax-tree/unist#parent
export function isParent(node: unknown): node is Parent {
  return isObject(node) && Array.isArray(node.children);
}

// https://github.com/syntax-tree/unist#literal
export function isLiteral(node: unknown): node is Literal {
  return isObject(node) && "value" in node;
}

// https://github.com/syntax-tree/mdast#paragraph
export function isParagraph(node: unknown): node is Paragraph {
  return isNode(node) && node.type === "paragraph";
}

// https://github.com/syntax-tree/mdast#text
export function isText(node: unknown): node is Text {
  return (
    isLiteral(node) && node.type === "text" && typeof node.value === "string"
  );
}

export function isLink(node: unknown): node is Link {
  return isNode(node) && node.type === "link";
}