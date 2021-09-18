import { useState } from 'react'
import Link from 'next/link'
import css from 'styled-jsx/css'
import { FaTwitter } from 'react-icons/fa'
import { MdCreate, MdSearch, MdHome, MdLocalOffer, MdMoreHoriz, MdClose } from 'react-icons/md'

import blogConfig from 'blog.config'

const style = css`
.icons {
  display: flex;
  flex-direction: row;
  z-index: var(--zIndexIcons);
  position: fixed;
  right: .5rem;
  bottom: .5rem;
}

.icon {
  position: relative;
  margin: .5rem;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  border: 1px solid var(--colorBackgroundDefault);
  background-color: var(--colorTextDefault);
  transition: all var(--transitionTimeFunc);
  text-decoration: none;
}
.icon:active {
  width: 1.9rem;
  height: 1.9rem;
}
.icon[aria-expanded='false'] {
  display: none;
}

@media( min-width: 960px ){
  .icons {
    flex-direction: column;
    left: 91%;
    bottom: 3rem;
  }

  .icon {
    width: 2.25rem;
    height: 2.25rem;
  }
  .icon:active {
    width: 2.15rem;
    height: 2.15rem;
  }
}
`

type PostProps = {
  id: string,
  title: string,
  tags?: string[]
}

export const PostIcons: React.VFC<PostProps> = ({ title, id, tags }) => {
  const [more, setMore] = useState(false)
  const tag = tags ? tags.join(',') : 'React, Next.js'
  const twitter = `https://twitter.com/share?text=${title}&hashtags=${tag}&url=${blogConfig.baseUrl}/posts/${id}/`
  return (
    <>
      <div className='icons'>
        <Link href='/search/'>
          <a className='icon' key='search' aria-label='search posts'>
            <MdSearch />
          </a>
        </Link>
        <Link href='/tags/'>
          <a className='icon tags' key='tags' aria-expanded={more} aria-label='tags page link'>
            <MdLocalOffer />
          </a>
        </Link>
        <Link href='/posts/'>
          <a className='icon posts' key='posts' aria-label='posts page link'>
            <MdCreate />
          </a>
        </Link>
        <Link href='/'>
          <a className='icon home' key='home' aria-expanded={more} aria-label='home link'>
            <MdHome />
          </a>
        </Link>
        <a className='icon twitter' key='twitter' href={twitter}
          aria-label='twitter share link' target='_blank' rel='noopener noreferrer'>
          <FaTwitter />
        </a>
        <a className='icon close' key='close' aria-label='close link icons'
          onClick={() => setMore(false)} aria-expanded={more} >
          <MdClose />
        </a>
        <a className='icon more' key='more' aria-label='expand link icons'
          onClick={() => setMore(true)} aria-expanded={!more} >
          <MdMoreHoriz />
        </a>
      </div>
      <style jsx>{style}</style>
    </>
  )
}  