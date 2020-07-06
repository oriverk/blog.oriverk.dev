import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { SwipeableDrawer } from '@material-ui/core'
import { PermanentDrawerLists, SwipeDrawerLists } from './DrawerLists'

export function Layout(props) {
  const [state, setState] = React.useState({
    left: false
  })

  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydonw' && (event.key === 'Tag' || event.key === 'Shift')) {
      return
    }
    setState({ ...state, [anchor]: open })
  }

  // drawer width is defined at _app.jsx
  return (
    <React.Fragment key='left'>
      <Head>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
      </Head>
      <SwipeableDrawer anchor='left' open={state['left']}
        onClose={toggleDrawer('left', false)} onOpen={toggleDrawer('left', true)}
      >
        <div className='swipeableList' role='presentation'
          onClick={toggleDrawer('left', false)} onKeyDown={toggleDrawer('left', false)}
        >
          <SwipeDrawerLists />
        </div>
      </SwipeableDrawer>
      <aside>
        <div className='permanentDrawer'><PermanentDrawerLists home={props.home} posts={props.posts} /></div>
      </aside>
      <main>
        {props.children}
      </main>
      <nav className="nav">
        <a href="#" className="nav__link" aria-label='Open Drawer' onClick={toggleDrawer('left', true)}>
          <i className="material-icons nav__icon">dashboard</i>
          <span className="nav__text">Tool</span>
        </a>
        <Link href='/' passHref>
          <MaterialButton href='/hoge' icon='person' text='Home' key='home' />
        </Link>
        <Link href='/posts' passHref>
          <MaterialButton href='/posts' icon='create' text='Blog' key='blog' />
        </Link>
        <Link href='/tags' passHref>
          <MaterialButton href='/tags' icon='local_offer' text='Tags' key='tags' />
        </Link>
      </nav>
      <style jsx>{`
        /* general */
        .permanentDrawer {
        /* mobile and for swipe */
          display: none;
        }

        .swipeableList {
          width: var(--drawerWidth);
          background-color: #424242;
          height: 100vh;
        }

        main{
          flex: 1;
          width: 100%;
          margin-left: - var(--drawerWidth);
        }

        /* nav */
        .nav {
          position: fixed;
          bottom: 0;
          width: 100%;
          height: var(--bottomNavHeight);
          box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
          background-color: #424242;
          display: flex;
          overflow-x: auto;
          z-index: 100;
        }

        .nav__link {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          flex-grow: 1;
          min-width: 50px;
          overflow: hidden;
          white-space: nowrap;
          font-family: sans-serif;
          font-size: 13px;
          color: #EEE;
          text-decoration: none;
          -webkit-tap-highlight-color: transparent;
          transition: background-color 0.1s ease-in-out;
        }

        .nav__link:hover {
          background-color: #666;
        }

        .nav__link--active {
          color: #009578;
        }

        .nav__icon {
          font-size: 18px;
        }

        @media ( min-width: 960px ){
          .swipeableList, .nav{
            display: none;
          }

          /* pc and for permanent */
          .permanentDrawer{
            width: var(--drawerWidth);
            display: block;
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

const MaterialButton = React.forwardRef((props, ref) => {
  return (
    <React.Fragment>
      <a href={props.href} key={props.key} ref={ref} className='nav__link'>
        <i className="material-icons nav__icon">{props.icon}</i>
        <span className="nav__text">{props.text}</span>
      </a>
      <style jsx>{`
        /* google fonts */
        /* nav */
        .nav__link {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          flex-grow: 1;
          min-width: 50px;
          overflow: hidden;
          white-space: nowrap;
          font-family: sans-serif;
          font-size: 13px;
          color: #EEE;
          text-decoration: none;
          -webkit-tap-highlight-color: transparent;
          transition: background-color 0.1s ease-in-out;
        }

        .nav__link:hover {
          background-color: #666;
        }

        .nav__link--active {
          color: #009578;
        }

        .nav__icon {
          font-size: 18px;
        }
      `}</style>
    </React.Fragment>
  )
})
