import React from 'react'
import Link from 'next/link'
import { SwipeableDrawer } from '@material-ui/core'
import { LeftSwipeDrawerLists } from './DrawerLists'
import { AlgoliaSearch } from './search/AlgoliaSearch'

export function BlogLayout(props) {
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
        {props.children}
      </main>
      <nav className="nav"></nav>
      <style jsx>{`
        /* general */
        .searchButtonContainer{
          text-align:center;
        }

        .searchButton {
          color: #EEE;
          font-size: 1rem;
          width: 80%;
          height: 3rem;
          background-color: #424242;
          border-radius: .5rem;
          border: 1px solid #50CAF9;
        }

        .searchButton:hover, .searchButton:active{
          background-color: #50CAF9;
          color: #424242;
          border:none;
        }

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

        /* nav */
        .nav {
          position: fixed;
          bottom: 0;
          width: 100%;
          display: flex;
          overflow-x: auto;
          z-index: 100;
        }

        @media ( min-width: 960px ){
          /* .swipeableList, .nav{
            display: none;
          } */
          .nav{
            display:none;
          }
        }
      `}</style>
    </React.Fragment>
  )
}