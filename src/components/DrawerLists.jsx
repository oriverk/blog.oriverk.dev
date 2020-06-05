import React from 'react'
import Link from 'next/link'
import { IconButton, Divider } from '../utils/utils'
import {
  GithubIcon, LinkedInIcon, QiitaIcon, TwitterIcon, WantedlyIcon,HomeIcon, AboutIcon, HistoryIcon, WorksIcon, BlogIcon
} from '../utils/svgIcon'

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
          height: 4rem;
          justify-content: flex-start;
          user-select: none;
        }
        div:hover {
          text-decoration: none;
          background-color: rgba(255, 255, 255, 0.08);
        }
        @media ( min-width: 1280px){
          div {
            height: 4.75rem;
          }
        }
      `}</style>
    </>
  )
})

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
        <Link href='/#about' key='about' passHref>
          <ListItem>
            <div className='listItemIcon'><AboutIcon /></div>
            <span>About</span>
          </ListItem>
        </Link>
        <Link href='/#history' key='history' passHref>
          <ListItem>
            <div className='listItemIcon'><HistoryIcon /></div>
            <span>History</span>
          </ListItem>
        </Link>
        <Link href='/#works' key='works' passHref>
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
          margin: 1rem;
          border-radius: 50%;
        }

        .profileImg {
          margin: 0 auto;
          width: 80%;
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
          display: inline-flex;
          vertical-align: middle;
          padding-right: 2rem;
        }
      `}</style>
    </React.Fragment>
  )
}