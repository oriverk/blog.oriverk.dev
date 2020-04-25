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

const drawerWidth = 250;


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  swipeableList: {
    width: drawerWidth,
  },
  permanentDrawer: {
    width: drawerWidth,
    flexShrink: 0,
    backgroundColor: 'grey',
    color: 'white',
  },
  permanentDrawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    [theme.breakpoints.up('lg')]: {
      // with permanentDrawer
      marginLeft: drawerWidth,
    },
    [theme.breakpoints.down('md')]: {
      // with permanentDrawer
      marginLeft: -drawerWidth,
    }
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
      <header>
        <Hidden lgUp>
          <IconButton
            color="inherit"
            aria-label="Open swipeable temporary drawer"
            onClick={toggleDrawer('left', true)}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
      </header>
      <Hidden lgUp>
        <SwipeableDrawer
          anchor='left'
          open={state['left']}
          onClose={toggleDrawer('left', false)}
          onOpen={toggleDrawer('left', true)}
        >
          <div
            className={clsx(classes.swipeableList)}
            role="presentation"
            onClick={toggleDrawer('left', false)}
            onKeyDown={toggleDrawer('left', false)}
          >
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
      <main className={clsx(classes.content)}>
        <Typography paragraph>
          0123456789ABCDEF-------------------------++++++++++++++++++++++++++hhhhhhhhhhhhhhhhhhhhhhooooooooooooooooooooooooogggggggggggggggggggggggggeeeeeeeeeeeeeeeeeeeeeeeeeeee
        </Typography>
      </main>
    </React.Fragment>
  );
}
