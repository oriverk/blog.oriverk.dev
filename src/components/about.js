import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

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
  aboutTop: {
    textAlign: 'center',
  },
  aboutImg: {
    width: '100%',
  },
}));

export default function About() {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <React.Fragment>
      <section id="about" className={classes.content}>
        <h1 className={classes.centeredH1}>About</h1>
        <Grid container spacing={4}>
          <Grid item md={12} lg={5} className={classes.aboutTop}>
            <picture>
              <source srcSet="/img/LongRidgeLookout.webp" type="image/webp" className={classes.aboutImg}/>
              <img src="/img/LongRidgeLookout.jpg" alt="the secenary from Long-Ridge-Lookout in Adelaide" className={classes.aboutImg} />
            </picture>
            <p><small>Here is in Adelaide, Australia. My selfie is little ...</small></p>
          </Grid>
          <Grid item md={12} lg={7}>
            <p>My name is Kawano Yudai.</p>
            <p>I graduated from Miyazaki Universiy as Bachelor of Agriculture.</p>
            <p>I belonged to agricultural engineering lablatory and studied crop row detecting tech by image processing with C++ and OpenCV.</p>
            <p>After I quited first job in egg company, I was in Australia as working holiday. Then I studied Ruby and other tech like database, website system.</p>
            <p>So, I'm very interested in both nature and machinery</p>
            <p><em>Now, I'm seeking job as web system developer. Please contact me.</em></p> 
          </Grid>
        </Grid>
      </section>
    </React.Fragment>
  );
}