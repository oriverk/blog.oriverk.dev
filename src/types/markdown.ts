import type { MDXRemoteSerializeResult } from 'next-mdx-remote';

interface HeadingType {
  level: 'h2' | 'h3';
  text: string;
  id: string;
}

interface FrontMatterType {
  title: string;
  create: string;
  update: string;
  description: string;
  tags: string[];
  headings: HeadingType[];
  image?: string;
  published?: boolean;
  editUrl: string;
}

interface PostType {
  fileName: string;
  frontMatter: FrontMatterType;
  mdxSource: MDXRemoteSerializeResult<Record<string, unknown>>;
}

export type { HeadingType, FrontMatterType, PostType };
