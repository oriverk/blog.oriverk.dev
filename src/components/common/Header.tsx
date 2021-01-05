import css from 'styled-jsx/css'

import { useThemeContext } from '../../hooks/theme'

const style = css`
.header {
  position: relative;
  width: 100%;
  height: 30vh;
}

.icons {
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

export const Header: React.FC = () => {
  const { theme, toggleTheme } = useThemeContext()
  return (
    <>
      <header>
        <div className='icons'>
          <button className='icon' key='theme' onClick={() => toggleTheme(theme)} aria-label='change theme'>
            {theme === 'light' ? '🌞' : '🌙'}
          </button>
        </div>
      </header>
      <style jsx>{style}</style>
    </>
  )
}