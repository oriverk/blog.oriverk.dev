import type { Metadata, ResolvingMetadata } from 'next/dist/lib/metadata/types/metadata-interface';
import { notFound } from 'next/navigation';

import { getPost, getPosts } from '@src/utils/markdown/getContentData'
import { Markdown } from '@src/components/markdown'
import { PostHero } from '@src/components/post-hero'

type Params = {
  slug: string | string[];
}
type Props = {
  params: Params;
  searchParams: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata({ params, searchParams }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const { slug } = params;
  const fileName = typeof slug === "string"
    ? slug
    : Array.isArray(slug) ? slug.join("/") : JSON.stringify(slug);
  
  const post = await getPost(fileName)
  if (!post?.frontmatter) {
    return {}
  }

  const { frontmatter } = post
  const { title, tags } = frontmatter
  const keywords = tags.length ? tags : (await parent)?.keywords || [];

  return {
    title,
    keywords,
  }
}

export async function generateStaticParams() {
  const { posts } = await getPosts();
  const params = posts.map(({ fileName }) => {
    return {
      slug: fileName.split("/")
    }
  })
  return params
}

async function getData(params: Params) {
  const { slug } = params;
  const fileName = typeof slug === "string"
    ? slug
    : Array.isArray(slug) ? slug.join("/") : JSON.stringify(slug);
  const post = await getPost(fileName)
  return post
}

export default async function Page({ params }: { params: Params }) {
  const post = await getData(params)

  if (!post) {
    notFound()
  }

  const { frontmatter, content } = post

  return (
    <>
      <PostHero {...frontmatter} className="mb-8" />
      <div className="flex">
        <Markdown>{content}</Markdown>
      </div>
    </>
  )
}