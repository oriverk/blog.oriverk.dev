import React from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import { List, Divider } from '@material-ui/core';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';

import MyDrawerList from '../components/MyDrawerList';
import Top from '../components/Top'
import About from '../components/About';
import History from '../components/History';
import Works from '../components/Works';

import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';

const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  header: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    zIndex: 100,
    backgroundColor: 'grey',
  },
  profileImgContainer: {
    textAlign: 'center',
  },
  profileImg: {
    width: `calc(0.5 *  ${drawerWidth}px)`,
  },
  swipeableList: {
    width: drawerWidth,
  },
  permanentDrawer: {
    width: drawerWidth,
    flexShrink: 1,
    backgroundColor: 'grey',
    color: 'white',
  },
  permanentDrawerPaper: {
    width: drawerWidth,
  },
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
}));

export default function SwipeableTemporaryDrawer() {
  const classes = useStyles();
  const theme = useTheme();
  const [state, setState] = React.useState({
    left: false,
  });

  // toggleDrawerは弄ると壊れる
  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  return (
    <React.Fragment key='left'>
      <Hidden lgUp>
        <header className={classes.header}>
          <IconButton
            aria-label="Open swipeable temporary drawer"
            onClick={toggleDrawer('left', true)}
          >
            <DoubleArrowIcon color="secondary" style={{ fontSize: 35 }} />
          </IconButton>
        </header>
      </Hidden>
      <Hidden lgUp>
        <SwipeableDrawer
          anchor='left'
          open={state['left']}
          onClose={toggleDrawer('left', false)}
          onOpen={toggleDrawer('left', true)}
        >
          <div
            className={classes.swipeableList}
            role="presentation"
            onClick={toggleDrawer('left', false)}
            onKeyDown={toggleDrawer('left', false)}
          >
            <List>
              <div className={classes.profileImgContainer}>
                <picture>
                  <source srcSet="/favicon/android-chrome-192x192.webp" type="image/webp" className={classes.profileImg} />
                  <img src="/assets/wheel192.png" alt="avatar" className={classes.profileImg} />
                </picture>
              </div>
            </List>
            <Divider />
            <MyDrawerList />
          </div>
        </SwipeableDrawer>
      </Hidden>
      <Hidden mdDown>
        <aside>
          <Drawer
            className={classes.permanentDrawer}
            variant="permanent"
            anchor="left"
            classes={{
              paper: classes.permanentDrawerPaper,
            }}
          >
            <List>
              <div className={classes.profileImgContainer}>
                <picture>
                  <source srcSet="./favicon/android-chrome-192x192.webp" type="image/webp" className={classes.profileImg} />
                  <img src="/assets/wheel192.png" alt="avatar" className={classes.profileImg} />
                </picture>
              </div>
            </List>
            <Divider />
            <MyDrawerList />
          </Drawer>
        </aside>
      </Hidden>
      <main className={classes.contents}>
        <Top />
        <About />
        <History />
        <Works />
      </main>
    </React.Fragment>
  );
}
