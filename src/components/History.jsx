import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import NoImage from '../utils/noImage'

const useStyles = makeStyles((theme) => ({
  content: {
    width: '100',
    maxWidth: '1000px',
    margin: '0 auto 10px auto',
    padding: '0 5%',
    flexGrow: 1,
  },
  centeredH1: {
    textAlign: 'center',
  },
  gridContainer: {
    marginBottom: theme.spacing(3),
  },
  contentImg: {
    width: '100%',
    [theme.breakpoints.up('lg')]: {
      // with permanentDrawer
      width: '80%',
    },
  },
}))

export default function History() {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <React.Fragment>
      <section id="history" className={classes.content}>
        <h1 className={classes.centeredH1}>History</h1>
        <h2>Experience</h2>
        <article>
          <Grid container spacing={4} className={classes.gridContainer}>
            <Grid item xs={5} >
              <NoImage />
            </Grid>
            <Grid item xs={7} className={classes.gridItem}>
              <b>Egg company in Miyazaki</b><br />
                2017/04 - 2018/08<br/>
                Production Management
            </Grid>
          </Grid>
        </article>
        <h2>Education</h2>
        <article>
          <Grid container spacing={4} className={classes.gridContainer}>
            <Grid item xs={5}>
              <picture>
                <source srcSet="/assets/weeding700.webp" type="image/webp" className={classes.contentImg} />
                <img src="/assets/weeding700.jpg" alt="photograph of weeding robot" className={classes.contentImg} />
              </picture>
            </Grid>
            <Grid item xs={7}>
              <b>Agricultural Enginnering Lab.</b><br/>
              2015/04 - 2017/03<br/>
              Thesis was about agricultural crop row detecting tech by image processing
            </Grid>
          </Grid>
          <Grid container spacing={4} className={classes.gridContainer}>
            <Grid item xs={5}>
              <picture>
                <source srcSet="/assets/miyazakiUniv.webp" type="image/webp" className={classes.contentImg} />
                <img src="/assets/miyazakiUniv.png" alt="miyazaki university" className={classes.contentImg} />
              </picture>
            </Grid>
            <Grid item xs={7}>
              <b>Faculty of Agriculture <wbr/>in Miyazaki University</b><br/>
                2013/04 - 2017/03<br/>
                Majored Botanics and Agricultural Engineering
            </Grid>
          </Grid>
        </article>
      </section>
    </React.Fragment>
  )
}