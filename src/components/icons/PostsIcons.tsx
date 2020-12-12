import blogConfig from 'blog.config'
import Link from 'next/link'
import css from 'styled-jsx/css'
import { IconContext } from 'react-icons'
import { FaTwitter, FaGithub, FaLinkedin } from 'react-icons/fa'
import { MdCreate, MdSearch, MdHome, MdLocalOffer, MdMoreHoriz, MdClose } from 'react-icons/md'
import { commonStyle, columnStyle } from './iconsStyle'

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