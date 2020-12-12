import blogConfig from 'blog.config'
import { useState } from 'react'
import Link from 'next/link'
import { IconContext } from 'react-icons'
import { HatenaSvg } from './index'
import { FaTwitter } from 'react-icons/fa'
import { MdCreate, MdSearch, MdHome, MdLocalOffer, MdMoreHoriz, MdClose } from 'react-icons/md'
import { commonStyle, columnStyle } from './iconsStyle'

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
        <a className='icon Hatena' key='hatena' aria-expanded={more} href={hatena}
          aria-label='hatena share link' target='_blank' rel='noopener noreferrer'>
          <HatenaSvg className='homeIconSvg' />
        </a>
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
      <style jsx>{commonStyle}</style>
      <style jsx>{columnStyle}</style>
    </IconContext.Provider>
  )
}  