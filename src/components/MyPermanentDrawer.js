import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import Hidden from '@material-ui/core/Hidden';
import { List, Divider } from '@material-ui/core';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';

import MyDrawerList from './MyDrawerList';

const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
  profileImgContainer: {
    textAlign: 'center',
    margin: '1rem',
  },
  profileImg: {
    width: `calc(0.5 *  ${drawerWidth}px)`,
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
  
}));

export default function MyPermanentDrawer() {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <React.Fragment>
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
    </React.Fragment>
  );
}