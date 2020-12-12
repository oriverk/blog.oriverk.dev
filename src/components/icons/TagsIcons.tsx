import Link from 'next/link'
import { IconContext } from 'react-icons'
import { MdCreate, MdSearch, MdHome } from 'react-icons/md'
import { commonStyle, columnStyle } from './iconsStyle'

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