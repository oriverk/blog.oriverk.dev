import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Zoom from '@material-ui/core/Zoom';

import IconButton from '@material-ui/core/IconButton';


const useStyles = makeStyles((theme) => ({
  scroll: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(5),
    zIndex: 100,
  },
}));

export default function MyScrollTop() {
  const classes = useStyles();
 
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = () => {
    const anchor = document.querySelector('#back-to-top-anchor');
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} className={classes.scroll}>
        <Fab color="secondary" size="large">
          <KeyboardArrowUpIcon />
        </Fab>
      </div>
    </Zoom>
  );
}