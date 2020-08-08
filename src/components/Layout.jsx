import React from 'react'
import Link from 'next/link'
import { SwipeableDrawer } from '@material-ui/core'
import { LeftSwipeDrawerLists } from './DrawerLists'
import { AlgoliaSearch } from './search/AlgoliaSearch'

import { Top } from './HomeContents'

export function Layout(props) {
  const [state, setState] = React.useState({
    left: false,
    right: false
  })
  
  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydonw' && (event.key === 'Tag' || event.key === 'Shift')) {
      return
    }
    setState({ ...state, [anchor]: open })
  }

  // drawer width is defined at _app.jsx
  return (
    <React.Fragment>
      <SwipeableDrawer anchor='left' open={state['left']}
        onClose={toggleDrawer('left', false)} onOpen={toggleDrawer('left', true)}
      >
        <div className='swipeableList' role='presentation'
          onClick={toggleDrawer('left', false)} onKeyDown={toggleDrawer('left', false)}
        >
          <LeftSwipeDrawerLists />
        </div>
      </SwipeableDrawer>
      <SwipeableDrawer anchor='right' open={state['right']}
        onClose={toggleDrawer('right', false)} onOpen={toggleDrawer('right', true)}
      >
        <div className='swipeableList' role='presentation'>
          <AlgoliaSearch />
        </div>
      </SwipeableDrawer>
      <main>
        <Top openSearch={toggleDrawer('right', true)} />
        {props.children}
      </main>
      <style jsx>{`
        /* general */
        .swipeableList {
          width: var(--swipeDrawerWidth);
          max-width: 450px;
          height: 100vh;
          padding: 1.5rem;
          overflow: scroll;
          background-color: #424242;
        }

        main{
          flex: 1;
          width: 100%;
        }

        {/* @media ( min-width: 960px ){
          .swipeableList, .nav{
            display: none;
          }
        } */}
      `}</style>
    </React.Fragment>
  )
}