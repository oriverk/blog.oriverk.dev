import { styled } from 'goober'

interface Props {
  className?: string
}

const year = new Date().getFullYear()
const nextjs = 'https://nextjs.org/'
const vercel = 'https://vercel.com/'

const Component: React.VFC<Props> = (props) => {
  return (
    <footer {...props}>
      <div>
        <small>@{year} Kawano Yudai.</small>
        <br />
        <p>
          This site is built with{' '}
          <a href={nextjs} target="_blank" rel="noopener noreferrer">
            Next.js
          </a>{' '}
          and hosting on{' '}
          <a href={vercel} target="_blank" rel="noopener noreferrer">
            Vercel
          </a>
          .
        </p>
      </div>
    </footer>
  )
}

const StyledComponent = styled(Component)`
  padding: 1rem;
  text-align: center;
  & > div {
    margin: 0 auto;
    max-width: var(--max-width);
    font-size: 1rem;
    color: var(--color-gray);
    small {
      font-size: 1rem;
    }
    p {
      margin-top: 0.5rem;
    }
  }
`

const ContainerComponent: React.VFC = () => <StyledComponent />

export const Footer = ContainerComponent
