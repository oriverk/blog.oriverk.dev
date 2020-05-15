import Grid from '@material-ui/core/Grid'
import NoImage from '../utils/noImage'

export default function Works() {
  return (
    <section id="works" className="content">
      <h2>Works</h2>
      <article>
        <Grid container spacing={2} className="gridContainer">
          <Grid item xs={12} sm={5} className="gridItem">
            <picture>
              <source srcSet="/assets/githubPages1st700.webp" type="image/webp" className="contentImg"/>
              <img src="/assets/githubPages1st700.jpg" alt="screen-shot from 1st Githubpages" className="contentImg"/>
            </picture>
          </Grid>
          <Grid item xs={12} sm={7} className="gridItem">
            <b>GithubPages</b>
            <wbr /> : My 1st GithubPages.
            <br />with Ruby, Jekyll
            <ul>
              <li><a href="https://github.com/oriverk/oriverk.github.io">Github repositry</a></li>
              <li><a href="https://qiita.com/OriverK/items/ce48102c66c9fa97b33e">Qiita: "GithubPages with Jekyll"</a></li>
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
            <wbr /> : to share code with syntax-highlight
            <br />with RubyonRails, PostgreSQL, S3
            <ul>
              <li><a href="https://github.com/oriverk/Codr">Github repositry</a></li>
              <li><a href="https://qiita.com/OriverK/items/df41ec6b57b40a06a64d">Qiita: "Share code beautifully on Twitter"</a></li>
            </ul>
          </Grid>
        </Grid>
        <Grid container spacing={2} className="gridContainer">
          <Grid item xs={12} sm={5} className="gridItem">
            <NoImage />
          </Grid>
          <Grid item xs={12} sm={7} className="gridItem">
            <b>Ticket sales System</b>
            <wbr /> : for the FE exam on Autumn 2018.
            <br />with RubyonRails, PostgreSQL, Heroku
            <ul>
              <li><a href="https://github.com/oriverk/ConcertTicket">Github repositry</a></li>
              <li><a href="https://qiita.com/OriverK/items/4e71ebd81a6ef372dcf9">Post on Qiita</a></li>
              <li><a href="https://www.jitec.ipa.go.jp/1_04hanni_sukiru/mondai_kaitou_2018h30_2/2018h30a_fe_pm_qs.pdf">IPA FE exam</a></li>
            </ul>
          </Grid>
        </Grid>
      </article>
    </section>
  );
}