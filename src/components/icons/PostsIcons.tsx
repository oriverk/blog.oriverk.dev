import Link from 'next/link'
import css from 'styled-jsx/css'
// import { MdSearch, MdHome, MdLocalOffer } from 'react-icons/md'

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
}
`

export const PostsIcons: React.VFC = () => (
  <>
    <div className='icons'>
      {/* <Link href='/search/'>
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
      </Link> */}
    </div>
    <style jsx>{style}</style>
  </>
)