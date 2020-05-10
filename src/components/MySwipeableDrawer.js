import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { List, Divider } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';

import MyDrawerList from './MyDrawerList.js';

const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
  swipeableList: {
    width: drawerWidth,
  },
  profileImgContainer: {
    textAlign: 'center',
    margin: '1rem',
  },
  profileImg: {
    width: `calc(0.5 *  ${drawerWidth}px)`,
  },
  footer: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    zIndex: 100,
    backgroundColor: 'grey',
  },
}));

export default function MySwipeableDrawer() {
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
    <React.Fragment>
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
      <footer className={classes.footer}>
          <IconButton
            aria-label="Open swipeable temporary drawer"
            onClick={toggleDrawer('left', true)}
          >
            <DoubleArrowIcon color="secondary" style={{ fontSize: 35 }} />
          </IconButton>
      </footer>
    </React.Fragment>
  );
}