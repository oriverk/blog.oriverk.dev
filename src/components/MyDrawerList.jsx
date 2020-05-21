import React from 'react'

import { List, Divider } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import GitHubIcon from '@material-ui/icons/GitHub'
import LinkedInIcon from '@material-ui/icons/LinkedIn'
import TwitterIcon from '@material-ui/icons/Twitter'
import { QiitaIcon, WantedlyIcon } from '../utils/customSvg'

export function MyDrawerList({children}) {
  return (
    <React.Fragment>
      <div className='profileImgContainer'>
        <picture>
          <source srcSet='/assets/human192x192.webp' type='image/webp' className='profileImg' />
          <img src='/assets/human192x192.png' alt='avatar' className='profileImg' />
        </picture>
      </div>
      <Divider />
      {/* <List>
        <Link href='/'>
          <ListItem button>
            <ListItemIcon><HomeIcon /></ListItemIcon>
            <ListItemText primary='Home' />
          </ListItem>
        </Link>
        <Link href='./#about'>
          <ListItem button>
            <ListItemIcon><PermContactCalendarIcon /></ListItemIcon>
            <ListItemText primary='About' />
          </ListItem>
        </Link>
        <Link href='./#history'>
          <ListItem button>
            <ListItemIcon><WorkIcon /></ListItemIcon>
            <ListItemText primary='History' />
          </ListItem>
        </Link>
        <Link href='./#works'>
          <ListItem button>
            <ListItemIcon><CodeIcon /></ListItemIcon>
            <ListItemText primary='Works' />
          </ListItem>
        </Link>
        <Link href='/posts'>
          <ListItem button>
            <ListItemIcon><CreateIcon /></ListItemIcon>
            <ListItemText primary='Blog' />
          </ListItem>
        </Link>
      </List> */}
      {children}
      <Divider />
      <div className='third'>
        <IconButton href='https://github.com/oriverk' target='_blank' rel='noopener noreferrer' color='secondary' alt='Github'><GitHubIcon /></IconButton>
        <IconButton href='https://qiita.com/OriverK' target='_blank' rel='noopener noreferrer' color='secondary' alt='Qiita'><QiitaIcon /></IconButton>
        <IconButton href='https://www.wantedly.com/users/40069986' target='_blank' rel='noopener noreferrer' color='secondary' alt='Wantedly'><WantedlyIcon /></IconButton>
        <IconButton href='https://www.linkedin.com/in/yudai-k/' target='_blank' rel='noopener noreferrer' color='secondary' alt='LinkedIn'><LinkedInIcon /></IconButton>
        <IconButton href='https://twitter.com/not_you_die' target='_blank' rel='noopener noreferrer' color='secondary' alt='Twitter'><TwitterIcon /></IconButton>
      </div>
      <style jsx>{`
        .profileImgContainer {
          text-align: center;
          margin: 1rem;
        }
        .profileImg{
          width: 80%;
        }
        .third {
          margin-top: 1rem;
        }
        div{
          fill: #50CAF9;
        }
      `}</style>
    </React.Fragment>
  )
}