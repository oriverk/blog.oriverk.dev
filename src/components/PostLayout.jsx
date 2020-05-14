import React from 'react'
import Link from 'next/link'

import { makeStyles, useTheme } from '@material-ui/core/styles'
import Hidden from '@material-ui/core/Hidden'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow'
import { List, ListItem, ListItemIcon, ListItemText, Divider } from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home'
import CreateIcon from '@material-ui/icons/Create'

import MyDrawerList from '../components/MyDrawerList'

const drawerWidth = 250

const useStyles = makeStyles((theme) => ({
  
  contents: {
    position: 'absolute',
    top: 0,
    flexGrow: 1,
    [theme.breakpoints.down('md')]: {
      // with swipeableDrawer
      width: '100%',
      marginBottom: `59px`,
      paddingBottom: '10px',
      marginLeft: 0,
    },
    [theme.breakpoints.up('lg')]: {
      // with permanentDrawer
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
}))

function PostLayout({ children }) {
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
          <Link href="/">
            <ListItem button>
              <ListItemIcon><HomeIcon /></ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
          </Link>
          <Link href="/posts">
            <ListItem button>
              <ListItemIcon><CreateIcon /></ListItemIcon>
              <ListItemText primary="Blog" />
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
            className="swipeableList"
            role="presentation"
            onClick={toggleDrawer('left', false)}
            onKeyDown={toggleDrawer('left', false)}
          >
            <PostDrawerList />
          </div>
        </SwipeableDrawer>
        <footer className={classes.footer}>
          <IconButton
            aria-label="Open swipeable temporary drawer"
            onClick={toggleDrawer('left', true)}
          >
            <DoubleArrowIcon color="secondary" style={{ fontSize: 35 }} />
          </IconButton>
        </footer>
      </Hidden>
      <Hidden mdDown>
        <aside>
          <Drawer
            className="permanentDrawer"
            variant="permanent"
            anchor="left"
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
          background-color: grey;
        }
      `}</style>
    </React.Fragment>
  )
}

export default PostLayout