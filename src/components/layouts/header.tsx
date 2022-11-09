import { styled } from 'goober'
import Link from 'next/link'

import NamedIcon from 'components/named-icon'
import { CottageIcon, TagIcon, SearchIcon } from 'components/icons'

const sitePath = process.env.NEXT_PUBLIC_SITE_PATH || ''

type Props = {
  className?: string
}

const Component = (props: Props) => {
  return (
    <header {...props}>
      <nav>
        <Link href="/">blog</Link>
        <div className="right">
          <Link href="/search">
            <NamedIcon name="Search" variant="none" width={16} height={16} fontSize={3}>
              <SearchIcon label="search posts" size={8} color="var(--color-gray)" />
            </NamedIcon>
          </Link>
          <Link href="/tag">
            <NamedIcon name="Tag" variant="none" width={16} height={16} fontSize={3}>
              <TagIcon label="go to tags page" size={8} color="var(--color-gray)" />
            </NamedIcon>
          </Link>
          <a href={sitePath} target="_blank" rel="noopener noreferrer">
            <NamedIcon name="Home" variant="none" width={16} height={16} fontSize={3}>
              <CottageIcon label="go to home page" size={8} color="var(--color-gray)" />
            </NamedIcon>
          </a>
        </div>
      </nav>
    </header>
  )
}

const StyledComponent = styled(Component)`
  text-align: center;
  font-size: 1.5rem;
  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    padding: 1rem;
    max-width: var(--max-width);
    a {
      color: var(--color-white);
      text-decoration: none;
    }
    a:hover {
      color: var(--color-miku);
      transition: color 0.3s ease;
    }
    .right {
      display: flex;
      a:hover {
        transition: background 0.25s ease;
        background: rgba(0, 0, 0, 0.3);
        border-radius: 0.2rem;
      }
    }
  }
`

const ContainerComponent: React.FC = () => <StyledComponent />

export const Header = ContainerComponent
