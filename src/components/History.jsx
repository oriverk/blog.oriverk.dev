import Grid from '@material-ui/core/Grid'
import NoImage from '../utils/noImage'

export default function History() {
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