import React from 'react'
import { GithubIcon, LinkedInIcon, QiitaIcon, TwitterIcon, WantedlyIcon } from '../utils/svgIcon.jsx'

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

export const Divider = () => {
  return (
    <>
      <hr className='divider' />
      <style jsx>{`
        .divider {
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

export function MyDrawerList(props) {
  return (
    <React.Fragment>
      <div className='profileImgContainer'>
        <picture>
          <source srcSet='/assets/human192x192.webp' type='image/webp' className='profileImg' />
          <img src='/assets/human192x192.png' alt='avatar' className='profileImg' />
        </picture>
      </div>
      <Divider />
      {props.children}
      <Divider />
      <div className='third'>
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
        .profileImg{
          width: 80%;
        }
      `}</style>
    </React.Fragment>
  )
}