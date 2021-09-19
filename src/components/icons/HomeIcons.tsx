import Link from 'next/link'
import { useRouter } from 'next/router'
import css from 'styled-jsx/css'
// import { MdCreate, MdSearch } from 'react-icons/md'
// import { FaTwitter, FaGithub, FaLinkedin } from 'react-icons/fa'

import blogConfig from 'blog.config'
import { WantedlySvg } from './index'
import { useThemeContext } from '../../hooks/theme'
import { getNextLocale } from '../../hooks/locale'

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

.icon.toggleLocaleIcon {
  text-decoration: none;
  font-size: 1rem;
  font-weight: bold;
  color: var(--colorBackgroundDefault);
}

.icon:active{
  width: 1.9rem;
  height: 1.9rem;
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
}
`

export const HomeIcons: React.VFC = () => {
  const { asPath, locale, locales } = useRouter()
  const nextLocale = getNextLocale(locale, locales)
  const { theme, toggleTheme } = useThemeContext()

  function handleOnClick() {
    localStorage.setItem('locale', nextLocale)
  }

  return (
    <>
      <div className='icons'>
        <Link href={asPath} locale={nextLocale} prefetch={false}>
          <a onClick={() => handleOnClick()} className='icon toggleLocaleIcon'>{locale}</a>
        </Link>
        <button className='icon' key='theme' onClick={()=> toggleTheme(theme)} aria-label='change theme'>
          {theme === 'light' ? '🌞' : '🌙'}   
        </button>
        {/* <Link href='/search/' locale={locale}>
          <a className='icon' key='search' aria-label='search posts'>
            <MdSearch />
          </a>
        </Link>
        <Link href='/posts/' locale={locale}>
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
        </a> */}
      </div>
      <style jsx>{style}</style>
    </>
  )
}