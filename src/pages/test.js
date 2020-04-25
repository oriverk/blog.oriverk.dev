import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import Button from '@material-ui/core/Button';

import MyDrawerList from '../components/myDrawerList';
import { Typography } from '@material-ui/core';

import Drawer from '@material-ui/core/Drawer';

import Container from '@material-ui/core/Container';

import About from '../components/about';
import History from '../components/history';
import Works from '../components/works';

import { List, Divider } from '@material-ui/core';


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
  content: {
    position: 'absolute',
    top: 0,
    flexGrow: 1,
    [theme.breakpoints.up('lg')]: {
      // with permanentDrawer
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    [theme.breakpoints.down('md')]: {
      // with swipeableDrawer
      width: '100%',
      marginLeft: 0,
    }
  },
  container: {
    margin: 0,
    padding: 0,
  },
  topImg: {
    display: 'block',
    height: '100vh',
    width: '100%',
    backgroundColor: 'gray',
    backgroundSize: 'cover',
    backgroundPosition: 'right',
    backgroundImage: 'url("/img/top2.jpg")',
  }
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
            {/* small: fontSize20, normal: 25, large: 35,  */}
            <MenuIcon color="primary" style={{ fontSize: 35 }} />
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
              
              <picture>
                <source srcSet="./img/wheel400.webp" type="image/webp" className={classes.profileImg} />
                  <img src="./img/wheel400.png" alt="avatar"  className={classes.profileImg}/>
                </picture>
            
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
            <MyDrawerList />
          </Drawer>
        </aside>
      </Hidden>
      <main className={classes.content}>
        <section id="top" className={classes.topImg}></section>
        <About />
        <History />
        <Works />
      </main>
      
    </React.Fragment>
  );
}
