import React from 'react'
import Link from 'next/link'

import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'

import { HomeIcon, AboutIcon, HistoryIcon, WorksIcon, BlogIcon, ArrowIcon } from '../utils/svgIcon'
import { MyDrawerList } from '../components/MyDrawerList'

const ListItem = React.forwardRef((props, ref) => {
  return (
    <>
      <a href={props.href} onClick={props.onClick} ref={ref}>
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

export function Layout({ children }) {
  const [state, setState] = React.useState({
    left: false,
  })

  // Do Not Touch
  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return
    }
    setState({ ...state, [anchor]: open })
  }

  const HomeDrawerList = () => {
    return (
      <>
        <MyDrawerList>
          <ul className='list'>
            <Link href='/' passHref>
              <ListItem>
                <div className='listItemIcon'>
                  <HomeIcon />
                </div>
                Home
              </ListItem>
            </Link>
            <Link href='/#about' passHref>
              <ListItem>
                <div className='listItemIcon'>
                  <AboutIcon />
                </div>
                About
              </ListItem>
            </Link>
            <Link href='/#history' passHref>
              <ListItem>
                <div className='listItemIcon'>
                  <HistoryIcon />
                </div>
                History
              </ListItem>
            </Link>
            <Link href='/#works' passHref>
              <ListItem>
                <div className='listItemIcon'>
                  <WorksIcon />
                </div>
                Works
              </ListItem>
            </Link>
            <Link href='/posts' passHref>
              <ListItem>
                <div className='listItemIcon'>
                  <BlogIcon />
                </div>
                Blog
              </ListItem>
            </Link>
          </ul>
        </MyDrawerList>
        <style jsx>{`
          .list{
            margin: 0;
            padding: 0;
            position: relative;
            list-style: none;
          }

          .listItemIcon {
            color: #fff;
            display: inline-flex;
            min-width: 56px;
            flex-shrink: 0;
            fill: #FFF;
            vertical-align: middle;
            padding-right: 2rem;
          }
        `}</style>
      </>
    )
  }

  return (
    <React.Fragment key='left'>
      <SwipeableDrawer
        className='swipeableDrawer'
        anchor='left'
        open={state['left']}
        onClose={toggleDrawer('left', false)}
        onOpen={toggleDrawer('left', true)}
      >
        <div
          className='swipeableList'
          role='presentation'
          onClick={toggleDrawer('left', false)}
          onKeyDown={toggleDrawer('left', false)}
        >
          <HomeDrawerList />
        </div>
      </SwipeableDrawer>
      <footer>
        <button aria-label='Open swipeable drawer' onClick={toggleDrawer('left', true)}>
          <ArrowIcon />
        </button>
      </footer>
      <aside>
        <div className='permanentDrawer'><HomeDrawerList /></div>
      </aside>
      <main>
        {children}
      </main>
      <style jsx global>{`
        #__next{
          display: flex;
        }
      `}</style>
      <style jsx>{`
        *{
          --drawerWidth: 250px;
        } 
        
        .swipeableList, .permanentDrawer {
          width: var(--drawerWidth);
        }

        footer{
          width: 100%;
          position: fixed;
          bottom: 0;
          z-index: 100;
        }

        main{
          flex: 1;
        }

        @media ( max-width: 1280px ){
          /* mobile and for swipe */
          .permanentDrawer {
            display: none;
          }
          footer button {
            position: fixed;
            left: .4rem;
            bottom: .4rem;
            height: 3.5rem;
            width: 3.5rem;
            border: 1px solid grey;
            border-radius : 50%;
            background-color: #424242;
            outline: none;
          }

          main{
            width: 100%;
            margin-left: - var(--drawerWidth);
          }
        }

        @media ( min-width: 1280px ){
          /* pc and for permanent */
          .swipeableDrawer, footer button{
            display: none;
          }
          .permanentDrawer{
            height: 100vh;
            background-color: #424242;
            position: fixed;
            z-index: 100;
          }

          main{
            width: calc(100% - var(--drawerWidth));
            margin-left: var(--drawerWidth);
          }
        }

      `}</style>
    </React.Fragment>
  )
}