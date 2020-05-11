import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import NoImage from '../utils/noImage'

const useStyles = makeStyles((theme) => ({
  content: {
    width: '100%',
    maxWidth: '1000px',
    margin: '0 auto 10px auto',
    padding: '5%',
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
  links: {
    marginTop: '7px',
    marginBottom: '0px',
    paddingLeft: '20px',
  },
  link: {
    color: '#F48FB1', 
    textDecoration: 'none',
  }
}));

export default function Works() {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <React.Fragment>
      <section id="works" className={classes.content}>
        <h1 className={classes.centeredH1}>Works</h1>
        <article>
          <Grid container spacing={3} className={classes.gridContainer}>
            <Grid item xs={5}>
              <picture>
                <source srcSet="/assets/githubPages1st700.webp" type="image/webp" className={classes.contentImg}/>
                <img src="/assets/githubPages1st700.jpg" alt="screen-shot from 1st Githubpages" className={classes.contentImg}/>
              </picture>
            </Grid>
            <Grid item xs={7}>
              <b>GithubPages</b><br/>
                : My 1st GithubPages.<br/>
                with Ruby, Jekyll
              <ul className={classes.links}>
                <li><a className={classes.link} href="https://github.com/oriverk/oriverk.github.io">Github repositry</a></li>
                <li><a className={classes.link} href="https://qiita.com/OriverK/items/ce48102c66c9fa97b33e">Qiita: "GithubPages with Jekyll"</a></li>
              </ul>
            </Grid>
          </Grid>
          <Grid container spacing={2} className={classes.gridContainer}>
            <Grid item xs={5}>
              <picture>
                <source srcSet="/assets/codr700.webp" type="image/webp" className={classes.contentImg} />
                <img src="/assets/codr700.jpg" alt="screen-shot from this webpage" className={classes.contentImg} />
              </picture>
            </Grid>
            <Grid item xs={7}>
              <b>Coder0</b><br/>
                : enable to share code with syntax-highlight<br/>
                with RubyonRails, PostgreSQL, S3
              <ul className={classes.links}>
                <li><a className={classes.link} href="https://github.com/oriverk/Codr">Github repositry</a></li>
                <li><a className={classes.link} href="https://qiita.com/OriverK/items/df41ec6b57b40a06a64d">Qiita: "Share code beautifully on Twitter"</a></li>
              </ul>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={5}>
              <NoImage />
            </Grid>
            <Grid item xs={7}>
              <b>Ticket sales System</b><br/>
                : based on the FE exam on Autumn 2018.<br/>
                with RubyonRails, PostgreSQL, Heroku
              <ul className={classes.links}>
                <li><a className={classes.link} href="https://github.com/oriverk/ConcertTicket">Github repositry</a></li>
                <li><a className={classes.link} href="https://qiita.com/OriverK/items/4e71ebd81a6ef372dcf9">Post on Qiita</a></li>
                <li><a className={classes.link} href="https://www.jitec.ipa.go.jp/1_04hanni_sukiru/mondai_kaitou_2018h30_2/2018h30a_fe_pm_qs.pdf">IPA FE exam</a></li>
              </ul>
            </Grid>
          </Grid>
        </article>
      </section>
    </React.Fragment>
  );
}