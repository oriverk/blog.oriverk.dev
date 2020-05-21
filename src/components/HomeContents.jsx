import React from 'react'
import css from 'styled-jsx/css'
import Grid from '@material-ui/core/Grid'
import NoImage from '../utils/noImage'

const TopStyles = css`
  .topContainer {
          height: 100vh;
          position: relative;
          background-color: #212121;
          background-size: cover;
          background-position: center;
          background-image: url("/assets/adelaide2.webp");
        }
        .topTitleContainer {
          color: white;
          padding: 5%;
          text-align: center;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background-color: rgba(0,0,0,0.3);
          border-bottom: 2px double rgb(255,255,255);
          border-radius: 2px;
        }
        .topTitle {
          font-weight: 500;
          font-size: 4rem;
        }
        .topSubtitle {
          font-size: 2rem
        }
`

export function Top() {
  return (
    <React.Fragment>
      <section id="top" className="topContainer">
        <div className="topTitleContainer">
          <div className="topTitle">Kawano <wbr />Yudai</div>
          <div className="topSubtitle">B.Agr. /<wbr />JobSeeker</div>
        </div>
      </section>
      <style jsx>{TopStyles}</style>
    </React.Fragment>
  )
}

export function About() {
  return (
    <section id="about" className="content">
      <h2>About</h2>
      <Grid container spacing={4}>
        <Grid item md={12} lg={5}>
          <picture>
            <source srcSet="/assets/LongRidge700.webp" type="image/webp" className="contentImg" />
            <img src="/assets/LongRidge700.jpg" alt="the secenary from Long-Ridge-Lookout in Adelaide" className="contentImg" />
          </picture>
          <p style={{ textAlign: 'center' }}><small>This is in Adelaide, Australia. My selfie is little</small></p>
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

export function Works() {
  return (
    <section id="works" className="content">
      <h2>Works</h2>
      <article>
        <Grid container spacing={2} className="gridContainer">
          <Grid item xs={12} sm={5} className="gridItem">
            <picture>
              <source srcSet="/assets/githubPages1st700.webp" type="image/webp" className="contentImg" />
              <img src="/assets/githubPages1st700.jpg" alt="screen-shot from 1st Githubpages" className="contentImg" />
            </picture>
          </Grid>
          <Grid item xs={12} sm={7} className="gridItem">
            <b>GithubPages</b>
            <br /> :My 1st GithubPages.
            <br />with Ruby, Jekyll
            <ul>
              <li><a href="https://github.com/oriverk/oriverk.github.io" target="_blank" rel="noopener noreferrer" >Github repositry</a></li>
              <li><a href="https://qiita.com/OriverK/items/ce48102c66c9fa97b33e" target="_blank" rel="noopener noreferrer" >Qiita: "GithubPages with Jekyll"</a></li>
            </ul>
          </Grid>
        </Grid>
        <Grid container spacing={2} className="gridContainer">
          <Grid item xs={12} sm={5} className="gridItem">
            <picture>
              <source srcSet="/assets/codr700.webp" type="image/webp" className="contentImg" />
              <img src="/assets/codr700.jpg" alt="screen-shot from this webpage" className="contentImg" />
            </picture>
          </Grid>
          <Grid item xs={12} sm={7} className="gridItem">
            <b>Coder0</b>
            <br /> :to share code with syntax-highlight
            <br />with RubyonRails, PostgreSQL, S3
            <ul>
              <li><a href="https://github.com/oriverk/Codr" target="_blank" rel="noopener noreferrer" >Github repositry</a></li>
              <li><a href="https://qiita.com/OriverK/items/df41ec6b57b40a06a64d" target="_blank" rel="noopener noreferrer" >Qiita: "Share code beautifully on Twitter"</a></li>
            </ul>
          </Grid>
        </Grid>
        <Grid container spacing={2} className="gridContainer">
          <Grid item xs={12} sm={5} className="gridItem">
            <NoImage />
          </Grid>
          <Grid item xs={12} sm={7} className="gridItem">
            <b>Ticket sales System</b>
            <br /> :from the 2018 Autumn FE exam
            <br />with RubyonRails, PostgreSQL, Heroku
            <ul>
              <li><a href="https://github.com/oriverk/ConcertTicket" target="_blank" rel="noopener noreferrer" >Github repositry</a></li>
              <li><a href="https://qiita.com/OriverK/items/4e71ebd81a6ef372dcf9" target="_blank" rel="noopener noreferrer" >Post on Qiita</a></li>
              <li><a href="https://www.jitec.ipa.go.jp/1_04hanni_sukiru/mondai_kaitou_2018h30_2/2018h30a_fe_pm_qs.pdf">IPA FE exam</a></li>
            </ul>
          </Grid>
        </Grid>
      </article>
    </section>
  );
}

export function History() {
  return (
    <section id="history" className="content">
      <h2>History</h2>
      <article>
        <h3>Experience</h3>
        <Grid container spacing={2} className="gridContainer">
          <Grid item xs={12} sm={5} >
            <NoImage />
          </Grid>
          <Grid item xs={12} sm={7}>
            <small>2017/04 - 2018/08 : </small>
            <br /><b>Egg company in Miyazaki</b>
            <br />Production Management
          </Grid>
        </Grid>
      </article>
      <article>
        <h3>Education</h3>
        <Grid container spacing={2} className="gridContainer">
          <Grid item xs={12} sm={5} className="gridItem">
            <picture>
              <source srcSet="/assets/weeding700.webp" type="image/webp" className="contentImg" />
              <img src="/assets/weeding700.jpg" alt="photograph of weeding robot" className="contentImg" />
            </picture>
          </Grid>
          <Grid item xs={12} sm={7} className="gridItem">
            <small>2015/04 - 2017/03 :</small>
            <br /><b>Agricultural Enginnering Lab.</b>
            <br />Agricultural crop row detecting tech by image processing
          </Grid>
        </Grid>
        <Grid container spacing={2} className="gridContainer">
          <Grid item xs={12} sm={5} className="gridItem">
            <picture>
              <source srcSet="/assets/miyazakiUniv.webp" type="image/webp" className="contentImg" />
              <img src="/assets/miyazakiUniv.jpg" alt="miyazaki university" className="contentImg" />
            </picture>
          </Grid>
          <Grid item xs={12} sm={7} className="gridItem">
            <small>2013/04 - 2017/03 :</small>
            <br /><b>Faculty of Agriculture <wbr />in Miyazaki University</b>
            <br />Majored Botanics and Agricultural Engineering
          </Grid>
        </Grid>
      </article>
    </section>
  )
}