import { useState } from 'react'
import Link from 'next/link'
import css from 'styled-jsx/css'
import { IconContext } from 'react-icons'
import { MdCreate, MdSearch, MdHome, MdLocalOffer, MdMoreHoriz, MdClose } from 'react-icons/md'

const style = css`
.icons{
  display: flex;
  flex-direction: row;
  z-index: var(--zIndexIcons);
  position: fixed;
  right: .5rem;
  bottom: .5rem;
}

.icon{
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
.icon[aria-expanded='false']{
  display: none;
}

:global(.react-icons) {
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
  .icons{
    flex-direction: column;
    left: 91%;
    bottom: 3rem;
  }

  .icon {
    width: 2.25rem;
    height: 2.25rem;
  }
  .icon:active {
    width: 2.15rem;
    height: 2.15rem;
  }

  :global(.react-icons) {
    width: 1.5rem;
    height: 1.5rem;
  }
}
`

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
      <style jsx>{style}</style>
    </IconContext.Provider>
  )
} 