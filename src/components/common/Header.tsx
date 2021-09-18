import Link from 'next/link'
import { useRouter } from 'next/router'
import css from 'styled-jsx/css'

import { useThemeContext } from '../../hooks/theme'
import { getNextLocale } from '../../hooks/locale'

const style = css`
.header {
  position: relative;
  width: 100%;
  height: 30vh;
}

.icons {
  display: flex;
  position: absolute;
  right: 0;
  text-align: right;
  padding-right: 3%;
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

.icon.toggleLocaleIcon {
  text-decoration: none;
  text-align: center;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  font-weight: bold;
  color: var(--colorBackgroundDefault);
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

export const Header: React.VFC = () => {
  const { locale, locales, asPath } = useRouter()
  const nextLocale = getNextLocale(locale, locales)
  const { theme, toggleTheme } = useThemeContext()

  function handleOnClick() {
    localStorage.setItem('locale', nextLocale)
  }

  return (
    <>
      <header>
        <div className='icons'>
          <Link href={asPath} locale={nextLocale} prefetch={false}>
            <a onClick={() => handleOnClick()} className='icon toggleLocaleIcon'>{locale}</a>
          </Link>
          <button className='icon toggle' key='theme' onClick={() => toggleTheme(theme)} aria-label='change theme'>
            {theme === 'light' ? '🌞' : '🌙'}
          </button>
        </div>
      </header>
      <style jsx>{style}</style>
    </>
  )
}