import { useState } from 'react'
import Link from 'next/link'
import { IconContext } from 'react-icons'
import { MdCreate, MdSearch, MdHome, MdLocalOffer, MdMoreHoriz, MdClose } from 'react-icons/md'
import { commonStyle, columnStyle } from './iconsStyle'

export const TagIcons: React.FC = () => {
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