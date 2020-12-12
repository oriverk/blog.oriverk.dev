import blogConfig from 'blog.config'
import Link from 'next/link'
import { IconContext } from 'react-icons'
import { WantedlySvg } from './index'
import { FaTwitter, FaGithub, FaLinkedin } from 'react-icons/fa'
import { MdCreate, MdSearch } from 'react-icons/md'
import { homeStyle, commonStyle } from './iconsStyle'

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