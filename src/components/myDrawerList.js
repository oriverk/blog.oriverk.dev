import React from 'react';

import { List, ListItem, ListItemIcon, ListItemText, Divider } from '@material-ui/core';

import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';
import WorkIcon from '@material-ui/icons/Work';
import CodeIcon from '@material-ui/icons/Code';
import CreateIcon from '@material-ui/icons/Create';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import TwitterIcon from '@material-ui/icons/Twitter';

export default class MyDrawerList extends React.Component {
  render() {
    return (
      <React.Fragment>
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
      </React.Fragment>
    );
  }
}