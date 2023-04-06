import { notFound } from 'next/navigation';

import { getPost, getPosts } from '@src/utils/markdown/getContentData'
import { Markdown } from '@src/components/markdown'
import { PostHero } from '@src/components/post-hero'
import type { ResolvingMetadata } from 'next/dist/lib/metadata/types/metadata-interface';

type Props = {
  params: { slug: string | string[] };
  searchParams: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata({ params, searchParams }: Props, parent?: ResolvingMetadata) {
  const { slug } = params;
  const post = await getData({ slug });
  const { frontmatter } = post!
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

async function getData(params: { slug: string | string[] }) {
  const fileName = typeof params.slug === "string"
    ? params.slug
    : params.slug.join("/");
  const post = await getPost(fileName)
  return post
}

export default async function Page({ params }: { params: { slug: string | string[] } }) {
  const post = await getData(params)

  if (!post) {
    notFound()
  }

  const { frontmatter, content } = post

  return (
    <>
      <PostHero {...frontmatter} />
      <div className="flex">
        <Markdown>{content}</Markdown>
      </div>
    </>
  )
}