import blogConfig from 'blog.config'
import { useContext } from 'react'
import Link from 'next/link'
import css from 'styled-jsx/css'
import { ThemeContext } from '../../hooks/theme'
import { IconContext } from 'react-icons'
import { WantedlySvg } from './index'
import { FaTwitter, FaGithub, FaLinkedin } from 'react-icons/fa'
import { MdCreate, MdSearch } from 'react-icons/md'

const style = css`
.icons {
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
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
.icon:active{
  width: 1.9rem;
  height: 1.9rem;
}

:global(.react-icons),
:global(.wantedlySvg) {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 1.25rem;
  height: 1.25rem;
  fill: var(--colorBackgroundDefault);
  transition: fill var(--transitionTimeFunc);
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

export const HomeIcons: React.FC = () => {
  const { theme, toggleTheme } = useContext(ThemeContext)
  return (
    <IconContext.Provider value={{ className: 'react-icons' }}>
      <div className='icons'>
        <button className='icon' key='theme' onClick={()=> toggleTheme()} aria-label='change theme'>
          {theme === 'light' ? '🌞' : '🌙'}   
        </button>
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
          <WantedlySvg className='wantedlySvg' />
        </a>
        <a className='icon twitter' key='twitter' href={`https://twitter.com/${blogConfig.sns.twitter}`}
          aria-label='twitter account link' target='_blank' rel='noopener noreferrer'>
          <FaTwitter />
        </a>
      </div>
      <style jsx>{style}</style>
    </IconContext.Provider>
  )
}