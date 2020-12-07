import { useState } from 'react'
import Link from 'next/link'
import css from 'styled-jsx/css'
import { IconContext } from 'react-icons'
import { FaTwitter, FaGithub, FaLinkedin } from 'react-icons/fa'
import { MdCreate, MdSearch, MdHome, MdLocalOffer, MdMoreHoriz, MdClose } from 'react-icons/md'
import blogConfig from '../../blog.config'

// SVG
type Props = {
  className?: string
}

const WantedlySvg: React.FC<Props> = ({ className }) => (
  <svg className={className} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 900 900'><path d='M100 208.6h100l150 362.1L400 450 300 208.6h100l50 120.7 50-120.7h100L500 450l50 120.7 150-362.1h100L600 691.4H500l-50-120.7-50 120.7H300z' /></svg>
)

const HatenaSvg: React.FC<Props> = ({ className }) => (
  <svg className={className} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path d='M20.47 0C22.42 0 24 1.58 24 3.53v16.94c0 1.95-1.58 3.53-3.53 3.53H3.53C1.58 24 0 22.42 0 20.47V3.53C0 1.58 1.58 0 3.53 0h16.94zm-3.705 14.47c-.78 0-1.41.63-1.41 1.41s.63 1.414 1.41 1.414 1.41-.645 1.41-1.425-.63-1.41-1.41-1.41zM8.61 17.247c1.2 0 2.056-.042 2.58-.12.526-.084.976-.222 1.32-.412.45-.232.78-.564 1.02-.99s.36-.915.36-1.48c0-.78-.21-1.403-.63-1.87-.42-.48-.99-.734-1.74-.794.66-.18 1.156-.45 1.456-.81.315-.344.465-.824.465-1.424 0-.48-.103-.885-.3-1.26-.21-.36-.493-.645-.883-.87-.345-.195-.735-.315-1.215-.405-.464-.074-1.29-.12-2.474-.12H5.654v10.486H8.61zm.736-4.185c.705 0 1.185.088 1.44.262.27.18.39.495.39.93 0 .405-.135.69-.42.855-.27.18-.765.254-1.44.254H8.31v-2.297h1.05zm8.656.706v-7.06h-2.46v7.06H18zM8.925 9.08c.71 0 1.185.08 1.432.24.245.16.367.435.367.83 0 .38-.13.646-.39.804-.265.154-.747.232-1.452.232h-.57V9.08h.615z' /></svg>
)

const commonStyle = css`
.icons{
  display: flex;
  flex-direction: row;
  z-index: 100;
}

.icon{
  position: relative;
  margin: .5rem;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  border: 1px solid var(--colorBackgroundDefault);
  background-color: var(--colorTextDefault);
  text-decoration: none;
}

.icon:active{
  width: 1.9rem;
  height: 1.9rem;
}

.icon[aria-expanded='false']{
  display: none;
}

:global(.react-icons),
:global(.homeIconSvg){
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 1.25rem;
  height: 1.25rem;
  fill: var(--colorBAckgroundDefault);
}

@media( min-width: 960px ){
  .icon {
    width: 2.25rem;
    height: 2.25rem;
  }
  .icon:active {
    width: 2.15rem;
    height: 2.15rem;
  }
  :global(.react-icons),
  :global(.homeIconSvg){
    width: 1.5rem;
    height: 1.5rem;
  }
}
`

const homeStyle = css`
.icon {
  display: inline-block;
}
`

const columnStyle = css`
.icons {
  position: fixed;
  right: .5rem;
  bottom: .5rem;
}

@media( min-width: 960px ){
  .icons{
    flex-direction: column;
    left: 91%;
    bottom: 3rem;
  }
}
`

export const HomeIcons: React.FC = () => (
  <IconContext.Provider value={{ className: 'react-icons' }}>
    <div>
      <Link href='/search/'>
        <a className='icon' key='search' aria-label='search posts'>
          <MdSearch />
        </a>
      </Link>
      <Link href='/posts/'>
        <a className='icon' key='posts' aria-label='posts page link'>
          <MdCreate />
        </a>
      </Link>
      <a className='icon github' key='github' href={`https://github.com/${blogConfig.sns.github}`}
        aria-label='github account link' target='_blank' rel='noopener noreferrer'>
        <FaGithub />
      </a>
      <a className='icon linkedin' key='linkedin' href={`https://www.linkedin.com/in/${blogConfig.sns.linkedin}`}
        aria-label='linkedin accountlink' target='_blank' rel='noopener noreferrer'>
        <FaLinkedin />
      </a>
      <a className='icon wantedly' key='wantedly' href={`https://www.wantedly.com/users/${blogConfig.sns.wantedly}`}
        aria-label='wantedly account link' target='_blank' rel='noopener noreferrer'>
        <WantedlySvg className='homeIconSvg' />
      </a>
      <a className='icon twitter' key='twitter' href={`https://twitter.com/${blogConfig.sns.twitter}`}  
        aria-label='twitter account link' target='_blank' rel='noopener noreferrer'>
        <FaTwitter />
      </a>
    </div>
    <style jsx>{commonStyle}</style>
    <style jsx>{homeStyle}</style>
  </IconContext.Provider>
)

export const PostsIcons: React.FC = () => (
  <IconContext.Provider value={{ className: 'react-icons' }}>
    <div className='icons'>
      <Link href='/search/'>
        <a className='icon' key='search' aria-label='search posts'>
          <MdSearch />
        </a>
      </Link>
      <Link href='/tags/'>
        <a className='icon tags' key='tags' aria-label='tags page link'>
          <MdLocalOffer />
        </a>
      </Link>
      <Link href='/'>
        <a className='icon home' key='home' aria-label='home link'>
          <MdHome />
        </a>
      </Link>
    </div>
    <style jsx>{commonStyle}</style>
    <style jsx>{columnStyle}</style>
  </IconContext.Provider>
)  

type PostProps = {
  id: string,
  title: string,
  tags?: string[]
}

export const PostIcons: React.FC<PostProps> = ({ title, id, tags }) => {
  const [more, setMore] = useState(false)
  const tag = tags ? tags.join(',') : 'React, Next.js'
  const twitter = `https://twitter.com/share?text=${title}&hashtags=${tag}&url=${blogConfig.baseUrl}/posts/${id}/`
  const hatena = `https://b.hatena.ne.jp/entry/${blogConfig.baseUrl}/posts/${id}/`
  return (
    <IconContext.Provider value={{ className: 'react-icons' }}>
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
        <a className='icon Hatena' key='hatena' aria-expanded={more} href={ hatena }  
          aria-label='hatena share link' target='_blank' rel='noopener noreferrer'>
          <HatenaSvg className='homeIconSvg' />
        </a>
        <a className='icon twitter' key='twitter' href={ twitter }
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
      <style jsx>{commonStyle}</style>
      <style jsx>{columnStyle}</style>
    </IconContext.Provider>
  )
}  

export const TagsIcons: React.FC = () => (
  <IconContext.Provider value={{ className: 'react-icons' }}>
    <div className='icons'>
      <Link href='/search/'>
        <a className='icon' key='search' aria-label='search posts'>
          <MdSearch />
        </a>
      </Link>
      <Link href='/posts/'>
        <a className='icon posts' key='posts' aria-label='posts page link'>
          <MdCreate />
        </a>
      </Link>
      <Link href='/'>
        <a className='icon home' key='home' aria-label='home link'>
          <MdHome />
        </a>
      </Link>
    </div>
    <style jsx>{commonStyle}</style>
    <style jsx>{columnStyle}</style>
  </IconContext.Provider>
)

export const TagIcons: React.FC = ()  => {
  const [more, setMore] = useState(false)
  return (
    <IconContext.Provider value={{ className: 'react-icons' }}>
      
      <div className='icons'>
        <Link href='/search/'>
          <a className='icon' key='search' aria-label='search posts'>
            <MdSearch />
          </a>
        </Link>
        <Link href='/posts/'>
          <a className='icon posts' key='posts' aria-label='posts page link'>
            <MdCreate />
          </a>
        </Link>
        <Link href='/tags/'>
          <a className='icon tags' key='tags' aria-expanded={more} aria-label='tags page link'>
            <MdLocalOffer />
          </a>
        </Link>
        <Link href='/'>
          <a className='icon home' key='home' aria-expanded={more} aria-label='home link'>
            <MdHome />
          </a>
        </Link>
        <a className='icon close' key='close'  
          aria-expanded={more} onClick={() => setMore(false)} aria-label='close link icons'>
          <MdClose />
        </a>
        <a className='icon more' key='more'
          aria-expanded={!more} onClick={() => setMore(true)} aria-label='expand link icons'>
          <MdMoreHoriz />
        </a>
      </div>
      <style jsx>{commonStyle}</style>
      <style jsx>{columnStyle}</style>
    </IconContext.Provider>
  )
}  

