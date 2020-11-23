import { useState } from 'react'
import css from 'styled-jsx/css'
import { SwipeableDrawer } from '@material-ui/core'
import { LeftSwipeDrawer } from './DrawerLists'
import { AlgoliaSearch } from './search/AlgoliaSearch'

const style = css`
.swipeableList {
  width: var(--swipeDrawerWidth);
  max-width: 450px;
  height: 100vh;
  padding: 1.5rem;
  overflow: scroll;
  background-color: #424242;
}

main{
  width: 100%;
}

`

export const SearchLayout: React.FC = ({ children }) => {
  const [state, setState] = useState({
    left: false,
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
  return (
    <>
      {/* <SwipeableDrawer anchor='left' open={state['left']}
        onClose={toggleDrawer('left', false)} onOpen={toggleDrawer('left', true)}
      >
        <div className='swipeableList' role='presentation'
          onClick={toggleDrawer('left', false)} onKeyDown={toggleDrawer('left', false)}
        >
          <LeftSwipeDrawer />
        </div>
      </SwipeableDrawer> */}
      <main>
        {children}
      </main>
      <style jsx>{style}</style>
    </>
  )
}