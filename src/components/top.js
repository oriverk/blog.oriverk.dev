import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import NoImage from '../utils/noImage';

const useStyles = makeStyles((theme) => ({
  topImg: {
    display: 'block',
    height: '100vh',
    width: '100%',
    backgroundColor: 'gray',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundImage: 'url("/img/adelaide2.jpg")',
  },
  top: {
    color: 'black',
    height: '100vh',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.3)',
    textAlign: 'center',
    borderBottom: '2px double rgb(0,0,0)',
    [theme.breakpoints.down('md')]: {},
    [theme.breakpoints.up('lg')]: {
    },
  },
  topTitle: {
    fontWeight: 'bold',
    fontSize: '4rem',
  },
  topSubtitle: {
    fontSize: '2rem',
  },
}));

export default function Top() {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <React.Fragment>
      <section id="top" className={classes.topImg}>
        <div className={classes.top}>
          <div className={classes.topTitle}>Kawano <wbr />Yudai</div>
          <div className={classes.topSubtitle}>B.Agr. / JobSeeker</div>
        </div>
      </section>
    </React.Fragment>
  );
}