import React from 'react'
import Link from 'next/link'

import { makeStyles, useTheme } from '@material-ui/core/styles'
import Hidden from '@material-ui/core/Hidden'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import Drawer from '@material-ui/core/Drawer'
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow'
import { List, ListItem, ListItemIcon, ListItemText, Divider } from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home'
import CreateIcon from '@material-ui/icons/Create'

import { MyDrawerList } from '../components/MyDrawerList'

const drawerWidth = 250

const useStyles = makeStyles((theme) => ({
  permanentDrawerPaper: {
    width: drawerWidth,
  },
  contents: { 
    flexGrow: 1,
    // width: '100%',
    [theme.breakpoints.down('md')]: {
      // with swipeableDrawer
      width: '100%',
    },
    [theme.breakpoints.up('lg')]: {
      // with permanentDrawer
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
}))

export function PostLayout({ children }) {
  const classes = useStyles()
  const theme = useTheme()
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

  const PostDrawerList = () => {
    return (
      <MyDrawerList>
        <List>
          <Link href='/'>
            <ListItem button>
              <ListItemIcon><HomeIcon /></ListItemIcon>
              <ListItemText primary='Home' />
            </ListItem>
          </Link>
          <Link href='/posts'>
            <ListItem button>
              <ListItemIcon><CreateIcon /></ListItemIcon>
              <ListItemText primary='Blog' />
            </ListItem>
          </Link>
        </List>
        <Divider />
        <List>
          <div style={{textAlign: 'center'}}><p>underConstruction</p></div>
        </List>
      </MyDrawerList>
    )
  }

  return (
    <React.Fragment key='left'>
      <Hidden lgUp>
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
            <PostDrawerList />
          </div>
        </SwipeableDrawer>
        <footer>
          <button aria-label='Open swipeable temporary drawer' onClick={toggleDrawer('left', true)}>
            <DoubleArrowIcon color='secondary' style={{ fontSize: 34 }} />
          </button>
        </footer>
      </Hidden>
      <Hidden mdDown>
        <aside>
          <Drawer
            className='permanentDrawer'
            variant='permanent'
            anchor='left'
            classes={{
              paper: classes.permanentDrawerPaper,
            }}
          >
            <PostDrawerList />
          </Drawer>
        </aside>
      </Hidden>
      <main className={classes.contents}>
        {children}
      </main>
      <style jsx>{`
        *{
          --drawerWidth: 250px;
        }
        .swipeableList, .permanentDrawer {
          width: var(--drawerWidth);
        }
        .permanentDrawer {
          flex-shrink: 1;
        }
        footer{
          width: 100%;
          position: fixed;
          bottom: 0;
          z-index: 100;
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
      `}</style>
    </React.Fragment>
  )
}