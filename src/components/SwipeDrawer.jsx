import React from 'react'
import { SwipeableDrawer } from '@material-ui/core';
import { ArrowIcon } from '../utils/svgIcon'
import { DrawerLists } from './DrawerLists'



export function SwipeDrawer() {
  // const [state, setState] = React.useState({ left: false, })
  //   const toggleDrawer = (anchor, open) => (event) => {
  //     if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
  //       return
  //     }
  //     setState({ ...state, [anchor]: open })
  //   }
  return (
    <React.Fragment>
      <SwipeableDrawer
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
          <DrawerLists home={home} posts={posts} />
        </div>
      </SwipeableDrawer>
      <style jsx>{`
        .swipeableList, .permanentDrawer {
          width: var(--drawerWidth);
          background-color: #424242;
          height: 100vh;
        }
        @media ( min-width: 1280px){
          .swipeableList {
            display: none;
          }
        }
      `}</style>
    </React.Fragment>
  )
}

export const SwipeButton = () => {
  return (
    <React.Fragment>
      <button aria-label='Open drawer' onClick={toggleDrawer('left', true)}>
        <ArrowIcon />
      </button>
      <style jsx>{`
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
        @media ( min-width: 1280px){
          button{
            display: none;
          }
        }
      `}</style>
    </React.Fragment>
    )
}