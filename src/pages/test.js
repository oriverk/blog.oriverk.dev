import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import { List, ListItem, ListItemIcon, ListItemText, Divider } from '@material-ui/core';

import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';
import WorkIcon from '@material-ui/icons/Work';
import CodeIcon from '@material-ui/icons/Code';
import CreateIcon from '@material-ui/icons/Create';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import TwitterIcon from '@material-ui/icons/Twitter';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export default function SwipeableTemporaryDrawer() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem button key="About">
          <ListItemIcon><PermContactCalendarIcon /></ListItemIcon>
          <ListItemText primary="About" />
        </ListItem>
        <ListItem button key="History">
          <ListItemIcon><WorkIcon /></ListItemIcon>
          <ListItemText primary="History" />
        </ListItem>
        <ListItem button key="Works">
          <ListItemIcon><CodeIcon /></ListItemIcon>
          <ListItemText primary="Works" />
        </ListItem>
        <ListItem button key="Blog">
          <ListItemIcon><CreateIcon /></ListItemIcon>
          <ListItemText primary="Blog" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button>
          <ListItemIcon><GitHubIcon /></ListItemIcon>
        </ListItem>
        <ListItem button>
          <ListItemIcon><LinkedInIcon /></ListItemIcon>
        </ListItem>
        <ListItem button>
          <ListItemIcon><TwitterIcon /></ListItemIcon>
        </ListItem>
      </List>
    </div>
  );

  return (
    <div>
      {
        <React.Fragment key='left'>
          <Button onClick={toggleDrawer('left', true)}>left</Button>
          <SwipeableDrawer
            anchor='left'
            open={state['left']}
            onClose={toggleDrawer('left', false)}
            onOpen={toggleDrawer('left', true)}
          >
            {list('left')}
          </SwipeableDrawer>
        </React.Fragment>
      }
    </div>
  );
}
