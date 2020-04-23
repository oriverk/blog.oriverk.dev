import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import { AppBar, Toolbar } from '@material-ui/core';
import { List, ListItem, ListItemIcon, ListItemText, Divider } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import MyHeader from '../components/header';
import MyPermanentDrawerLeft from '../components/PermanentDrawerLeft'
import SwipeableTemporaryDrawwer from '../components/SwipeableTemporaryDrawer'

import About from "../components/about";
import History from "../components/history";
import Works from "../components/works";

import Hidden from '@material-ui/core/Hidden';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

export default function Index() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <MyHeader />
      <aside>
        <Hidden mdDown>
        <MyPermanentDrawerLeft />
        </Hidden>
        <Hidden lgUp>
        <SwipeableTemporaryDrawwer />
        </Hidden>
      </aside>
      <div></div>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <About />
        <History />
        <Works />
      </main>
    </div>
  );
}
