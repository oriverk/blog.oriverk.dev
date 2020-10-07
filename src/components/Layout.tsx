import React from 'react'
import { SwipeableDrawer } from '@material-ui/core'
import { LeftSwipeDrawer } from './DrawerLists'
import { AlgoliaSearch } from './search/AlgoliaSearch'
// import { Top } from './HomeContents'

type Props = {
  children: React.ReactNode
  isAmp?: boolean
}

export function Layout({ children, isAmp }: Props) {
  const [state, setState] = React.useState({
    left: false,
    right: false
  })

  type Anchor = 'left' | 'right'
  
  const toggleDrawer = (anchor: Anchor, open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent,
  ) => {
    if (
      event &&
      event.type === 'keydonw' &&
      ((event as React.KeyboardEvent).key === 'Tag' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return
    }
    setState({ ...state, [anchor]: open })
  }

  // drawer width is defined at _app.jsx
  if (isAmp) {
    return (
      <React.Fragment>
        <main>
          {/* <Top isAmp /> */}
          {children}
        </main>
        <style jsx>{`
          main{
            flex: 1;
            width: 100%;
          }
        `}</style>
      </React.Fragment>
    )
  }

  return (
    <React.Fragment>
      <SwipeableDrawer anchor='left' open={state['left']}
        onClose={toggleDrawer('left', false)} onOpen={toggleDrawer('left', true)}
      >
        <div className='swipeableList' role='presentation'
          onClick={toggleDrawer('left', false)} onKeyDown={toggleDrawer('left', false)}
        >
          <LeftSwipeDrawer />
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
        {/* <Top isAmp={false} openSearch={toggleDrawer('right', true)} /> */}
        {children}
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
      `}</style>
    </React.Fragment>
  )
}