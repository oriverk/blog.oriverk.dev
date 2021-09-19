import { GetStaticProps, GetStaticPaths } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'

import { Layout } from '../../components/Layout'
import { CustomHead } from '../../components/common/Head'
import { Date } from '../../components/common/Date'
// import { TagIcons } from '../../components/icons/index'
import { getTagsLocales, getTagPosts } from '../../lib/posts'

import { PostDataType } from '../../types/posts'
import { postCardStyle } from '../posts/index'

export const getStaticPaths: GetStaticPaths = async ({ locales, defaultLocale }) => {
  const paths = getTagsLocales(locales as string[])
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params, locale, locales, defaultLocale }) => {
  const tag = params.tag as string
  const postsData = getTagPosts(tag, locale)
  return {
    props: {
      tag,
      postsData,
    },
  }
}

type TagPostsProps = {
  tag: string,
  postsData: Omit<PostDataType, 'content'>[]
}

const Component: React.VFC<TagPostsProps> = ({ tag, postsData }) => {
  const { locale } = useRouter()
  return (
    <Layout>
      <CustomHead pageUrl={`/${locale}/tags/${tag}/`} pageTitle={`${tag} Posts`} pageDescription={`${tag} Posts`} />
      {/* <TagIcons /> */}
      <article className='content'>
        <h1>{`${tag} Posts`}</h1>
        <div className='posts'>
          {postsData.map(({ id, title, create, update, tags, image }) => (
            <div className='postCard' key={id}>
              <Link href={ `/posts/${id}/`} locale={locale}>
                <a className='postLink'>
                  <div className='imgOuter'>
                    <Image layout="fill" src={image || '/assets/home/sunrise.jpg'} alt={title} className='cardImg' />
                  </div>
                  <div className='postDesc'>
                    {update ? (
                      <div>updated on <Date dateString={update} locale={locale} /></div>
                      ) : (
                        <div>posted on <Date dateString={create} locale={locale} /></div>
                        )}
                    <h2>{title}</h2>
                  </div>
                </a>
              </Link>
              <div className='tags'>
                {tags.map((tag) => (
                  <Link href={ `/tags/${tag}/`} locale={locale} key={tag}>
                    <a className='tag' key={tag}>{tag}</a>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </article>
      <style jsx>{postCardStyle}</style>
    </Layout>
  )
}

export default Component