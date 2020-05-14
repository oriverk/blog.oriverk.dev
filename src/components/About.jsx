import React from 'react'
import Grid from '@material-ui/core/Grid'

export default function About() {
  return (
    <section id="about" className="content">
      <h2>About</h2>
      <Grid container spacing={4}>
        <Grid item md={12} lg={5}>
          <picture>
            <source srcSet="/assets/LongRidge700.webp" type="image/webp" className="contentImg"/>
            <img src="/assets/LongRidge700.jpg" alt="the secenary from Long-Ridge-Lookout in Adelaide" className="contentImg" />
          </picture>
          <p style={{textAlign: 'center' }}><small>This is in Adelaide, Australia. My selfie is little ...</small></p>
        </Grid>
        <Grid item md={12} lg={7}>
          <p>My name is Kawano Yudai.</p>
          <p>I graduated from Miyazaki Universiy as Bachelor of Agriculture.</p>
          <p>I belonged to agricultural engineering lablatory and studied crop row detecting tech by image processing with C++ and OpenCV.</p>
          <p>After I quited egg company, I stayed at Australia as working holiday. Then I studied Ruby and other tech like database, website system.</p>
          <p>So, I'm interested in both nature and machinery</p>
          <p style={{ color: '#F48FB1' }}><em>Now, I'm seeking job as developer. Please contact me from left drawer.</em></p> 
        </Grid>
      </Grid>
    </section>
  );
}