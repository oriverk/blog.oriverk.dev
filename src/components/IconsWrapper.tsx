import { useState } from 'react'
import Link from 'next/link'
import css from 'styled-jsx/css'
import { IconContext } from 'react-icons'
import { FaTwitter, FaGithub, FaLinkedin } from 'react-icons/fa'
import { MdCreate, MdSearch, MdHome, MdLocalOffer, MdMoreHoriz, MdClose } from 'react-icons/md'
import blogConfig from '../../blog.config'

// SVG

type ClassProps = {
  class?: string
}

const QiitaSvg: React.FC<ClassProps> = props => {
  return <svg className={props.class} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 256 256'><path d='M82 .22c-16.13 3.2-28.59 7.83-42 17.52-9.75 7.05-18.97 16.9-25.14 27.26C-12.67 91.27.77 150.39 47 178.94c7.94 4.9 18.89 9.35 28 11.4 12.8 2.86 25.06 3.27 38 1.22 12.11-1.91 21.24-5.63 32-11.34 8.61-4.58 14.17-9.37 21-16.22 45.92-46.07 33.44-125.02-25-154.25-11.78-5.88-23.73-9.73-37-9.53H82zM202 0c8.12 11.71 15.54 19.7 22.19 33 14.31 28.62 18.26 61.85 11.39 93-2.99 13.53-7.27 25.78-13.89 38-1.88 3.48-9.36 13.75-8.82 17 .66 3.95 9.05 10.39 12.13 13.17 9.75 8.82 20.4 21.24 31 28.83V0h-54zM0 201v55h223c-6.76-9.45-22.28-22.3-31-31-2.61-2.6-9.63-10.58-13-10.99-2.52-.3-5.91 2.27-8 3.57-5.46 3.36-11.1 6.47-17 8.99-17.29 7.4-36.15 11.99-55 12.42-4.87.11-6.5-.39-11-.82-23.86-2.31-43.17-7.05-64-19.62L0 201zm255 24l-29 31h30l-1-31z' /></svg>
}

const WantedlySvg: React.FC<ClassProps> = props => {
  return <svg className={props.class} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 900 900'><path d='M100 208.6h100l150 362.1L400 450 300 208.6h100l50 120.7 50-120.7h100L500 450l50 120.7 150-362.1h100L600 691.4H500l-50-120.7-50 120.7H300z' /></svg>
}

const HatenaSvg: React.FC<ClassProps> = props => {
  return <svg className={props.class} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path d='M20.47 0C22.42 0 24 1.58 24 3.53v16.94c0 1.95-1.58 3.53-3.53 3.53H3.53C1.58 24 0 22.42 0 20.47V3.53C0 1.58 1.58 0 3.53 0h16.94zm-3.705 14.47c-.78 0-1.41.63-1.41 1.41s.63 1.414 1.41 1.414 1.41-.645 1.41-1.425-.63-1.41-1.41-1.41zM8.61 17.247c1.2 0 2.056-.042 2.58-.12.526-.084.976-.222 1.32-.412.45-.232.78-.564 1.02-.99s.36-.915.36-1.48c0-.78-.21-1.403-.63-1.87-.42-.48-.99-.734-1.74-.794.66-.18 1.156-.45 1.456-.81.315-.344.465-.824.465-1.424 0-.48-.103-.885-.3-1.26-.21-.36-.493-.645-.883-.87-.345-.195-.735-.315-1.215-.405-.464-.074-1.29-.12-2.474-.12H5.654v10.486H8.61zm.736-4.185c.705 0 1.185.088 1.44.262.27.18.39.495.39.93 0 .405-.135.69-.42.855-.27.18-.765.254-1.44.254H8.31v-2.297h1.05zm8.656.706v-7.06h-2.46v7.06H18zM8.925 9.08c.71 0 1.185.08 1.432.24.245.16.367.435.367.83 0 .38-.13.646-.39.804-.265.154-.747.232-1.452.232h-.57V9.08h.615z' /></svg>
}

const commonStyle = css`
.icons{
  display: flex;
  flex-direction: row;
  z-index: 100;
}

.icon{
  position: relative;
  text-decoration: none;
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  margin: .5rem;
  background-color: #EEE;
  border-radius: 50%;
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
  fill: #424242;
  width: 1.25rem;
  height: 1.25rem;
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
  position: relative;
  display: inline-block;
  text-decoration: none;
  margin: .5rem;
  background-color: #EEE;
  border-radius: 50%;
}
`

const columnStyle = css`
.icons {
  position: fixed;
  bottom: .5rem;
  right: .5rem;
}

@media( min-width: 960px ){
  .icons{
    display: flex;
    flex-direction: column;
    left: 91%;
    bottom: 3rem;
  }
}
`

export const HomeIcons: React.FC = () => {
  return (
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
          <WantedlySvg class='homeIconSvg' />
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
}

export const PostsIcons: React.FC = () => {
  return (
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
}  

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
          <HatenaSvg class='homeIconSvg' />
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

export const TagsIcons: React.FC = () => {
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
}  

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

