import React from 'react';

import { List, ListItem, ListItemIcon, ListItemText, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import IconButton from '@material-ui/core/IconButton';

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
  link: {
    color: 'white',
    textDecoration: 'none',
  },
});

export default function MyDrawerList() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <List>
        <a href="#about" className={classes.link}>
          <ListItem button>
            <ListItemIcon><PermContactCalendarIcon /></ListItemIcon>
            <ListItemText primary="About"/>
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
        <a href="#" className={classes.link}>
          <ListItem button>
            <ListItemIcon><CreateIcon /></ListItemIcon>
            <ListItemText primary="Blog" />
          </ListItem>
        </a>
      </List>
      <Divider />
      <div className="third">
        <IconButton href="https://github.com/oriverk" target="_blank" rel="noopener noreferrer" color="secondary" alt="github"><GitHubIcon /></IconButton>
        <IconButton href="https://qiita.com/OriverK" target="_blank" rel="noopener noreferrer" color="secondary"><QiitaIcon /></IconButton>
        <IconButton href="https://www.wantedly.com/users/40069986" target="_blank" rel="noopener noreferrer" color="secondary"><WantedlyIcon /></IconButton>
        <IconButton href="https://www.linkedin.com/in/yudai-k/" target="_blank" rel="noopener noreferrer" color="secondary"><LinkedInIcon /></IconButton>
        <IconButton href="https://twitter.com/not_you_die" target="_blank" rel="noopener noreferrer" color="secondary"><TwitterIcon /></IconButton>
      </div>
    </React.Fragment>
  );
}