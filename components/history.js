import React from 'react';

export default class History extends React.Component {
  render() {
    return (
      <React.Fragment>
        <section id="history">
          <h1>History</h1>
          <h2>Experience</h2>
          <article>
            <div className="card">
              <picture>
                <source srcSet="/egg.webp" type="image/webp" />
                <img src="/egg.png" alt="drawing of egg" />
              </picture>
              <h3>Egg company in Miyazaki, Japan</h3>
              <h4>Production Management</h4>
              <p>2017/04 - 2018/08</p>
            </div>
          </article>
          <h2>Education</h2>
          <article>
            <div className="card">
              <picture>
                <source srcSet="/weeding.webp" type="image/webp" />
                <img src="/weeding.jpg" alt="photograph of weeding robot" />
              </picture>
              <h3>Agricultural Production System Enginnering Lab.</h3>
              <h4>studied agricultural crop row detection tech with image processing</h4>
              <p>2015/04 - 2017/03</p>
            </div>
            <div className="card">
              <picture>
                <source srcSet="/miyazakiUniv.webp" type="image/webp"/>
                <img src="/miyazakiUniV.png" alt="logo of miyazaki university" />
              </picture>
              <h3>Miyazaki University - faculty of Agriculture</h3>
              <h4>Major in Botanics, Agricultural Engineering</h4>
              <p>2013/04 - 2017/03</p>
            </div>
          </article>
        </section>
        <style jsx>{`
          #history { padding: 0 5%;margin-bottom: 5vh;}  
        `}</style>
      </React.Fragment>
    );
  }
}