import Link from 'next/link'
import css from 'styled-jsx/css'
import { Layout } from '../../components/Layout'
import { CustomImg } from '../../components/general/Image'
import { getSortedPostsData } from '../../lib/posts'
import { PostsIcons } from '../../components/IconsWrapper'
import { Date } from '../../components/general/Date'
import { GetStaticProps } from 'next'
import { CustomHead } from '../../components/general/Head'

export const getStaticProps: GetStaticProps = async () => {
  const postsData = getSortedPostsData()
  return {
    props: {
      postsData,
    },
  }
}

const style = css`
.content {
  width: 97%;
  margin: 0 auto 1rem;
  padding: 3%;
}

.posts {
  display: grid;
  gap: 1rem;
}

.postCard{
  padding-bottom: .7rem;
  background-color: #424242;
  border-radius: .5rem;
  max-width: 35rem;
  height: 100%;
  border: 1px solid rgba(0,0,0,0);
}
.postCard:hover{
  border: 1px solid #50CAF9;
}

.postLink{
  display: block;
  color: #EEE;
  text-decoration: none;
}

.imgOuter{
  position: relative;
  width: 100%;
}
.imgOuter:before{
  content: '';
  display: block;
  /* 3:2 */
  padding-top: 66%;
}

.postDesc{
  padding: .5rem;
}

h2{
  margin: .5rem auto 0;
  font-size: 1.15rem;
}

.tag{
  text-decoration: none;
  display: inline-block;
  font-size: .9rem;
  border-radius: 2rem;
  border: 1px solid #50CAF9;
  padding: 0.1rem .8rem;
  margin: 0.5rem .5rem 0;
  color: #EEE;
}
.tag:hover, .tag:active{
  background-color: #424242;
}

@media( min-width: 760px ){
  .content{
    width: 90%;
  }
  .posts {
    display: grid;
    gap: 1.5rem;
    grid-template-columns: repeat(auto-fit, minmax(22rem, 1fr));
  }
  .postCard{
    padding-bottom: 1rem;
  }
  h2{
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

const Component = ({ postsData }: Props) => {
  return (
    <>
      <Layout>
        <CustomHead pageUrl='posts' pageTitle='Posts' pageDescription='Posts index' />
        <article className='content'>
        <PostsIcons />
          <h1>Blog Posts</h1>
          <div className='posts'>
            {postsData.map(({ id, title, create, update, tags, image }) => (
              <div className='postCard' key={id}>
                {/* <Link href='/posts/[id]' as={`/posts/${id}`} key={id}> */}
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
      </Layout>
      <style jsx>{style}</style>
    </>
  )
}

export default Component