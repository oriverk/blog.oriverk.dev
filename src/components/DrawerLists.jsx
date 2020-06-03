import React from 'react'
import Link from 'next/link'
import {
  GithubIcon, LinkedInIcon, QiitaIcon, TwitterIcon, WantedlyIcon,HomeIcon, AboutIcon, HistoryIcon, WorksIcon, BlogIcon
} from '../utils/svgIcon'

export const Divider = () => {
  return (
    <>
      <hr />
      <style jsx>{`
        hr {
          border: none;
          height: 1px;
          margin: 0;
          flex-shrink: 0;
          background-color: rgba(255, 255, 255, 0.12);
        }  
      `}</style>
    </>
  )
}

const ListItem = React.forwardRef((props, ref) => {
  return (
    <>
      <a href={props.href} key={props.key} onClick={props.onClick} ref={ref}>
        <div role="button">{props.children}</div>
      </a>
      <style jsx>{`
        div{
          transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
          padding: .5rem 1rem;
          width: 100%;
          justify-content: flex-start;
          user-select: none;
        }
        div:hover {
          text-decoration: none;
          background-color: rgba(255, 255, 255, 0.08);
        }
      `}</style>
    </>
  )
})

const IconButton = (props) => {
  return (
    <>
      <a href={props.href} aria-label={props.label} target='_blank' rel='noopener noreferrer'>
        {props.children}
      </a>
      <style jsx>{`
        a {
          display: inline-block;
          transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
          border-radius: 50%;
          fill: #50CAF9;
          float: left;
        }
        a:hover{
          background-color: rgba(255,255,255,0.08);
        }
      `}</style>
    </>
  )
}

export const DrawerLists = (props) => {
  return (
    <React.Fragment>
      <div className='profileImgContainer'>
        <picture>
          <source srcSet='/assets/human192x192.webp' type='image/webp' className='profileImg' />
          <img src='/assets/human192x192.png' alt='avatar' className='profileImg' />
        </picture>
      </div>
      <Divider />
      <div className='list'>
        {!props.home && (
          <Link href='/' key='home' passHref>
            <ListItem>
              <div className='listItemIcon'><HomeIcon /></div>
              <span>Home</span>
            </ListItem>
          </Link>
        )}
        <Link href='#about' key='about' passHref>
          <ListItem>
            <div className='listItemIcon'><AboutIcon /></div>
            <span>About</span>
          </ListItem>
        </Link>
        <Link href='#history' key='history' passHref>
          <ListItem>
            <div className='listItemIcon'><HistoryIcon /></div>
            <span>History</span>
          </ListItem>
        </Link>
        <Link href='#works' key='works' passHref>
          <ListItem>
            <div className='listItemIcon'><WorksIcon /></div>
            <span>Works</span>
          </ListItem>
        </Link>
        {!props.posts && (
          <Link href='/posts' key='blog' passHref>
            <ListItem>
              <div className='listItemIcon'><BlogIcon /></div>
              <span>Blog</span>
            </ListItem>
          </Link>
        )}
      </div>
      <Divider />
      <div>
        <IconButton href='https://github.com/oriverk' label='Github' ><GithubIcon /></IconButton>
        <IconButton href='https://qiita.com/OriverK' label='Qiita'><QiitaIcon /></IconButton>
        <IconButton href='https://www.wantedly.com/users/40069986' label='Wantedly'><WantedlyIcon /></IconButton>
        <IconButton href='https://www.linkedin.com/in/yudai-k/' label='LinkedIn'><LinkedInIcon /></IconButton>
        <IconButton href='https://twitter.com/not_you_die' label='Twitter'><TwitterIcon /></IconButton>
      </div>
      <style jsx>{`
        .profileImgContainer {
          text-align: center;
          margin: 1rem;
        }

        .profileImg {
          width: 80%;
          border-radius: 50%;
        }

        .list {
          margin: 0;
          padding: 0;
          position: relative;
          display: flex;
          flex-direction: column;
          color: #EEE;
        }

        .list span {
          color: #EEE;
        }

        .listItemIcon {
          color: #FFF;
          display: inline-flex;
          vertical-align: middle;
          padding-right: 2rem;
        }
      `}</style>
    </React.Fragment>
  )
}