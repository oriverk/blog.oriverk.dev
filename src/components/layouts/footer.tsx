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
          This site is built with&nbsp;
          <a href={nextjs} target="_blank" rel="noopener noreferrer">
            Next.js
          </a>&nbsp;
          and hosting on&nbsp;
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > div {
    margin: 0 auto;
    text-align: center;
    font-size: 1rem;
    color: var(--color-gray);

    small {
      font-size: 1rem;
    }

    p {
      margin: 0.5rem 0 0;
    }
  }
`

const ContainerComponent: React.VFC = () => <StyledComponent />

export const Footer = ContainerComponent
