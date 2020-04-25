import React from 'react';

import { List, ListItem, ListItemIcon, ListItemText, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';
import WorkIcon from '@material-ui/icons/Work';
import CodeIcon from '@material-ui/icons/Code';
import CreateIcon from '@material-ui/icons/Create';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import TwitterIcon from '@material-ui/icons/Twitter';
import QiitaIcon from '../utils/qiitaSvg.js';
import WantedlyIcon from '../utils/wantedlySvg.js';

const useStyles = makeStyles({
  links: {
    color: 'black',
    textDecoration: 'none',
  },
  thirdParty: {
    textDecoration: 'none',
    target: '_blank',
    rel: 'noopener noreferrer',
  }
});

export default function MyDrawerList() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <List>
        <a href="#about" className={classes.links}>
          <ListItem button>
            <ListItemIcon><PermContactCalendarIcon /></ListItemIcon>
            <ListItemText primary="About"/>
          </ListItem>
        </a>
        <a href="#history" className={classes.links}>
          <ListItem button key="History">
            <ListItemIcon><WorkIcon /></ListItemIcon>
            <ListItemText primary="History" />
          </ListItem>
        </a>
        <a href="#works" className={classes.links}>
          <ListItem button key="Works">
            <ListItemIcon><CodeIcon /></ListItemIcon>
            <ListItemText primary="Works" />
          </ListItem>
        </a>
        {/* <a href="#" className={classes.links}> */}
          <ListItem button key="Blog">
            <ListItemIcon><CreateIcon /></ListItemIcon>
            <ListItemText primary="Blog" />
          </ListItem>
        {/* </a> */}
      </List>
      <Divider />
      <List>
        <a href="https://github.com/oriverk" target="_blanck" rel="noopner noreferrer" className={classes.links}>
          <ListItem button>
              <ListItemIcon><GitHubIcon /></ListItemIcon>
          </ListItem>
        </a>
        <a href="https://qiita.com/OriverK" target="_blanck" rel="noopner noreferrer" className={classes.links}>
          <ListItem button>
              <ListItemIcon><QiitaIcon /></ListItemIcon>
          </ListItem>
        </a>
        <a href="https://www.wantedly.com/users/40069986" target="_blanck" rel="noopner noreferrer" className={classes.links}>
          <ListItem button>
              <ListItemIcon><WantedlyIcon /></ListItemIcon>
          </ListItem>
        </a>
        <a href="https://www.linkedin.com/in/yudai-k/" target="_blanck" rel="noopner noreferrer" className={classes.links}>
          <ListItem button>
            <ListItemIcon><LinkedInIcon /></ListItemIcon>
          </ListItem>
        </a>
        <a href="https://twitter.com/not_you_die" target="_blank" rel="noopener noreferrer" className={classes.links}>
          <ListItem button>
            <ListItemIcon><TwitterIcon /></ListItemIcon>
          </ListItem>
          </a>
      </List>
    </React.Fragment>
  );
}