import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { List, ListItem, ListItemIcon, ListItemText, Divider } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

{/* About, History, Works, Post */}
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import WorkIcon from '@material-ui/icons/Work';
import DeveloperModeIcon from '@material-ui/icons/DeveloperMode';
import BorderColorIcon from '@material-ui/icons/BorderColor';

import MailIcon from '@material-ui/icons/Mail';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import TwitterIcon from '@material-ui/icons/Twitter';

const drawerWidth = 300;

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

export default function MyPermanentDrawerLeft() {
  const classes = useStyles();
  const ThirdParty = [
    ['Gihub', <GitHubIcon />],
    ['Qiita', <MailIcon />],
    ['Wantedly', <MailIcon />],
    ['LinkedIn', <LinkedInIcon />],
    ['Twitter', <TwitterIcon />],
  ];

  return (
    <React.Fragment>
      {/* <MyHeader /> */}
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        <List>
          <ListItem key='Profile'>
            <picture>
              <source srcSet="/wheel400.webp" type="image/webp" />
              <img src="/wheel400.png" alt="wheel" />
            </picture>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button key='About'>
            <Typography variant="h5" noWrap>
              Kawano<wbr />Yudai
            </Typography>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button key='About'>
            <ListItemIcon><PermIdentityIcon /></ListItemIcon>
            <ListItemText primary='About' />
          </ListItem>
          <ListItem button key='History'>
            <ListItemIcon><WorkIcon /></ListItemIcon>
            <ListItemText primary='History' />
          </ListItem>
          <ListItem button key='Works'>
            <ListItemIcon><DeveloperModeIcon /></ListItemIcon>
            <ListItemText primary='Works' />
          </ListItem>
          <ListItem button key='Posts'>
            <ListItemIcon><BorderColorIcon /></ListItemIcon>
            <ListItemText primary='Posts( under construction...' />
          </ListItem>
        </List>
        <Divider />
        <List id="thirt-party">
          <ListItem button key='Github'>
            <ListItemIcon><GitHubIcon /></ListItemIcon>
          </ListItem>
          <ListItem button key='Qiita'>
            <ListItemIcon><MailIcon /></ListItemIcon>
          </ListItem>
          {/* <ListItem button key='Wantedly'>
            <ListItemIcon><MailIcon /></ListItemIcon>
          </ListItem> */}
          <ListItem button key='LinkedIn'>
            <ListItemIcon><LinkedInIcon /></ListItemIcon>
          </ListItem>
          {/* <ListItem button key='Twitter'>
            <ListItemIcon><TwitterIcon /></ListItemIcon>
          </ListItem> */}
        </List>
      </Drawer>
      <style jsx>{`
        picture, source, img { width: 200px;}
        `}
      </style>
    </React.Fragment>
  );
}
