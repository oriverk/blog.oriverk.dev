import Link from 'next/link'
import css from 'styled-jsx/css'
import { Layout } from '../../components/Layout'
import { CustomImg } from '../../components/common/Image'
import { getSortedPostsData } from '../../lib/posts'
import { PostsIcons } from '../../components/icons/index'
import { Date } from '../../components/common/Date'
import { GetStaticProps } from 'next'
import { CustomHead } from '../../components/common/Head'

export const getStaticProps: GetStaticProps = async () => {
  const postsData = getSortedPostsData()
  return {
    props: {
      postsData,
    },
  }
}

export const postCardStyle = css`
.content {
  padding: 3%;
}

h1 {
    text-align: center;
  }

.posts {
  display: grid;
  gap: 1rem;
}

.postCard {
  display: flex;
  flex-direction: column;
  max-width: 40rem;
  box-shadow: 0px 8px 16px -2px rgba(10,10,10,0.1), 2px 3px 3px 0 rgba(66,66,66,0.1);
  border-radius: .5rem;
  background-color: var(--colorBackgroundPaper);
  transition: background-color var(--transitionTimeFunc);
}
.postCard:hover, .postCard:active {
  box-shadow: none;
  transition: box-shadow var(--transitionTimeFunc);
}

.postLink {
  flex-grow: 1;
  border-radius: .5rem .5rem 0 0;
  border: 1.5px solid rgba(0,0,0,0);
  border-bottom: 1.5px solid var(--colorTextDefault);
  text-decoration: none;
  color: var(--colorTextDefault);
  transition: color var(--transitionTimeFunc);
}
.postLink:hover {
  border: 1.5px solid var(--colorTextLink);
  border-bottom: 1.5px solid var(--colorTextLink);
  filter: brightness(92%);
}

.imgOuter {
  position: relative;
  width: 100%;
}

.imgOuter:before {
  display: block;
  content: '';
  padding-top: 66%;
}

:global(.cardImg) {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  height: 100%;
  border-radius: .5rem .5rem 0 0;
}

.postDesc {
  padding: .5rem;
}

h2 {
  margin: .5rem auto 0;
  font-size: 1.15rem;
}

.tags {
  margin: .5rem 0;
}

.tag{
  display: inline-block;
  margin: .4rem .5rem;
  padding: .1rem .8rem;
  border: 1px solid var(--colorTextDefault);
  border-radius: 2rem;
  text-decoration: none;
  font-size: .9rem;
  color: var(--colorTextDefault);
}
.tag:hover, .tag:active {
  border: 1px solid var(--colorTextLink);
  filter: brightness(92%);
}

@media( min-width: 760px ){
  .posts {
    display: grid;
    gap: 1.5rem;
    grid-template-columns: repeat(auto-fit, minmax(22rem, 1fr));
  }
  
  h2 {
    font-size: 1.25rem;
  }
}
`

type Props = {
  postsData: {
    id: string
    title: string
    create: string
    update?: string
    tags?: string[]
    image?: string
  }[]
}

const Component: React.FC<Props> = ({ postsData }: Props) => (
  <Layout>
    <CustomHead pageUrl='posts' pageTitle='Posts' pageDescription='Posts index' />
    <article className='content'>
    <PostsIcons />
      <h1>Blog Posts</h1>
      <div className='posts'>
        {postsData.map(({ id, title, create, update, tags, image }) => (
          <div className='postCard' key={id}>
            <Link key={id} href={ `/posts/${id}/`}>
              <a className='postLink'>
                <div className='imgOuter'>
                  <CustomImg src={image || '/assets/home/sunrise.jpg'} alt={title} className='cardImg' />
                </div>
                <div className='postDesc'>
                  {update ? (
                    <div>updated on <Date dateString={update} /></div>
                  ) : (
                      <div>posted on <Date dateString={create} /></div>
                    )}
                  <h2>{title}</h2>
                </div>
              </a>
            </Link>
            <div className='tags'>
              {tags.map((tag) => (
                <Link key={tag} href={ `/tags/${tag}/`}>
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

export default Component