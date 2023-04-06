import { getPosts } from "@src/utils/markdown/getContentData"
import { PostCards } from "@src/components/post-cards";
import { sharedMetadata } from "./shared-metadata";

export const metadata = sharedMetadata;

async function getData() {
  const { posts } = await getPosts();
  const data = posts.map(({ frontmatter, fileName }) => {
    const { published, editUrl, image, ...rest } = frontmatter
    return {
      frontmatter: rest,
      fileName,
    }
  })
  return data;
}

export default async function Page() {
  const posts = await getData();
  
  return (
    <>
      <h1 className="mb-4 text-center text-2xl 2xl:text-3xl">Posts Index</h1>
      <PostCards posts={posts} />
    </>
  )
}