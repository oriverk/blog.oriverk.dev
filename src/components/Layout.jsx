import React from 'react';
import Head from 'next/head'
import styles from './Layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'

import { makeStyles, useTheme } from '@material-ui/core/styles';

import Hidden from '@material-ui/core/Hidden';
// import { List, Divider } from '@material-ui/core';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';

// import React from 'react';

import { List, ListItem, ListItemIcon, ListItemText, Divider } from '@material-ui/core';
// import { makeStyles } from '@material-ui/core/styles';

// import IconButton from '@material-ui/core/IconButton';

import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';
import WorkIcon from '@material-ui/icons/Work';
import CodeIcon from '@material-ui/icons/Code';
import CreateIcon from '@material-ui/icons/Create';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import TwitterIcon from '@material-ui/icons/Twitter';
import QiitaIcon from '../utils/qiitaSvg.js';
import WantedlyIcon from '../utils/wantedlySvg.js';

// import MyDrawerList from '../components/MyDrawerList';

const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
  footer: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    zIndex: 100,
    backgroundColor: 'grey',
  },
  profileImgContainer: {
    textAlign: 'center',
    margin: '1rem',
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
  },
  permanentDrawerPaper: {
    width: drawerWidth,
  },
  link: {
    color: 'white',
    textDecoration: 'none',
  },
  third: {
    marginTop: '1rem',
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


function Layout({ children, home }) {
  const classes = useStyles();
  const theme = useTheme();
  const [state, setState] = React.useState({
    left: false,
  });

  // Do Not Touch
  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const MyProfileImg = () => {
    return (
      <React.Fragment>
        <div className={classes.profileImgContainer}>
          <picture>
            <source srcSet="/favicon/android-chrome-192x192.webp" type="image/webp" className={classes.profileImg} />
            <img src="/assets/wheel192.png" alt="avatar" className={classes.profileImg} />
          </picture>
        </div>
      </React.Fragment>
    );
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
            className={classes.swipeableList}
            role="presentation"
            onClick={toggleDrawer('left', false)}
            onKeyDown={toggleDrawer('left', false)}
          >
            <List>
              <MyProfileImg />
            </List>
            <Divider />
            <List>
              {home && (
                <>
                  <a href="#about" className={classes.link}>
                    <ListItem button>
                      <ListItemIcon><PermContactCalendarIcon /></ListItemIcon>
                      <ListItemText primary="About" />
                    </ListItem>
                  </a>
                  <a href="#history" className={classes.link}>
                    <ListItem button>
                      <ListItemIcon><WorkIcon /></ListItemIcon>
                      <ListItemText primary="History" />
                    </ListItem>
                  </a>
                  <a href="#works" className={classes.link}>
                    <ListItem button>
                      <ListItemIcon><CodeIcon /></ListItemIcon>
                      <ListItemText primary="Works" />
                    </ListItem>
                  </a>
                </>
              )}
              <a href="/posts" className={classes.link}>
                <ListItem button>
                  <ListItemIcon><CreateIcon /></ListItemIcon>
                  <ListItemText primary="Blog" />
                </ListItem>
              </a>

            </List>
            <Divider />
            <div className={classes.third}>
              <IconButton href="https://github.com/oriverk" target="_blank" rel="noopener noreferrer" color="secondary" alt="github"><GitHubIcon /></IconButton>
              <IconButton href="https://qiita.com/OriverK" target="_blank" rel="noopener noreferrer" color="secondary"><QiitaIcon /></IconButton>
              <IconButton href="https://www.wantedly.com/users/40069986" target="_blank" rel="noopener noreferrer" color="secondary"><WantedlyIcon /></IconButton>
              <IconButton href="https://www.linkedin.com/in/yudai-k/" target="_blank" rel="noopener noreferrer" color="secondary"><LinkedInIcon /></IconButton>
              <IconButton href="https://twitter.com/not_you_die" target="_blank" rel="noopener noreferrer" color="secondary"><TwitterIcon /></IconButton>
            </div>
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
            className={classes.permanentDrawer}
            variant="permanent"
            anchor="left"
            classes={{
              paper: classes.permanentDrawerPaper,
            }}
          >
            <List>
              <MyProfileImg />
            </List>
            <Divider />
            <List>
              {home && (
                <>
                  <a href="#about" className={classes.link}>
                    <ListItem button>
                      <ListItemIcon><PermContactCalendarIcon /></ListItemIcon>
                      <ListItemText primary="About" />
                    </ListItem>
                  </a>
                  <a href="#history" className={classes.link}>
                    <ListItem button>
                      <ListItemIcon><WorkIcon /></ListItemIcon>
                      <ListItemText primary="History" />
                    </ListItem>
                  </a>
                  <a href="#works" className={classes.link}>
                    <ListItem button>
                      <ListItemIcon><CodeIcon /></ListItemIcon>
                      <ListItemText primary="Works" />
                    </ListItem>
                  </a>
                </>
              )}
              <a href="/posts" className={classes.link}>
                <ListItem button>
                  <ListItemIcon><CreateIcon /></ListItemIcon>
                  <ListItemText primary="Blog" />
                </ListItem>
              </a>

            </List>
            <Divider />
            <div className={classes.third}>
              <IconButton href="https://github.com/oriverk" target="_blank" rel="noopener noreferrer" color="secondary" alt="github"><GitHubIcon /></IconButton>
              <IconButton href="https://qiita.com/OriverK" target="_blank" rel="noopener noreferrer" color="secondary"><QiitaIcon /></IconButton>
              <IconButton href="https://www.wantedly.com/users/40069986" target="_blank" rel="noopener noreferrer" color="secondary"><WantedlyIcon /></IconButton>
              <IconButton href="https://www.linkedin.com/in/yudai-k/" target="_blank" rel="noopener noreferrer" color="secondary"><LinkedInIcon /></IconButton>
              <IconButton href="https://twitter.com/not_you_die" target="_blank" rel="noopener noreferrer" color="secondary"><TwitterIcon /></IconButton>
            </div>
          </Drawer>
        </aside>
      </Hidden>
      <main className={classes.contents}>
        {children}
      </main>
    </React.Fragment>
  )
}

export default Layout