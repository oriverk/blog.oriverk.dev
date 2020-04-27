import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import NoImage from '../utils/noImage';

const useStyles = makeStyles((theme) => ({
  topContainer: {
    display: 'block',
    height: '100vh',
    width: '100%',
    position: 'relative',
    backgroundColor: 'gray',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundImage: 'url("/img/adelaide2.jpg")',
  },
  topTitleContainer: {
    color: 'white',
    padding:'5%',
    textAlign: 'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderBottom: '2px double rgb(255,255,255)',
    borderRadius: '2px',
    [theme.breakpoints.down('md')]: {},
    [theme.breakpoints.up('lg')]: {
    },
  },
  topTitle: {
    fontWeight: 'bold',
    fontSize: '4rem',
    [theme.breakpoints.down('md')]: {
      fontSize: '3rem',
    },
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
      <section id="top" className={classes.topContainer}>
        <div className={classes.topTitleContainer}>
          <div className={classes.topTitle}>Kawano <wbr />Yudai</div>
          <div className={classes.topSubtitle}>B.Agr. /<wbr />JobSeeker</div>
        </div>
      </section>
    </React.Fragment>
  );
}