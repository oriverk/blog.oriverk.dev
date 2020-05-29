import { Github, LinkedIn, Qiita, Twitter, Wantedly, Home, Human, Cv, Page, Pen, Arrow } from './svg.jsx'

function SvgIcon(props) {
  return (
    <>
      <div>
        <svg>
          {props.children}
        </svg>
      </div>
      <style jsx>{`
        div {
          flex: 0 0 auto;
          padding: 12px;
          overflow: visible;
          font-size: 1.5rem;
          text-align: center;
          transition: 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
          border-radius: 50%;
        }
        svg {
          width: 1em;
          height: 1em;
          display: inline-block;
          font-size: 1.5rem;
          transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
          flex-shrink: 0;
          user-select: none;
        }
      `}</style>
    </>
  )
}

// Tech SNS SvgIcon
export const GithubIcon = () => {
  return <SvgIcon><Github /></SvgIcon>
}

export const LinkedInIcon = () => {
  return <SvgIcon><LinkedIn /></SvgIcon>
}

export const QiitaIcon = () => {
  return <SvgIcon><Qiita /></SvgIcon>
}

export const TwitterIcon = () => {
  return <SvgIcon><Twitter /></SvgIcon>
}

export const WantedlyIcon = () => {
  return <SvgIcon><Wantedly /></SvgIcon>
}

// General Website SvgIcon
export const HomeIcon = () => {
  return <SvgIcon><Home /></SvgIcon>
}

export const AboutIcon = () => {
  return <SvgIcon><Human /></SvgIcon>
}

export const HistoryIcon = () => {
  return <SvgIcon><Cv /></SvgIcon>
}

export const WorksIcon = () => {
  return <SvgIcon><Page /></SvgIcon>
}

export const BlogIcon = () => {
  return <SvgIcon><Pen /></SvgIcon>
}

// Symbol
export const ArrowIcon = () => {
  return <SvgIcon><Arrow /></SvgIcon>
}
