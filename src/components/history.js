import React from 'react';

export default function History() {
  return (
    <React.Fragment>
      <section id="history">
        <h1>History</h1>
        <h2>Experience</h2>
        <article>
          <div className="card">
            <picture>
              <source srcSet="/img/egg.webp" type="image/webp" />
              <img src="/img/egg.png" alt="egg" />
            </picture>
            <div className="content">
              <h3>Egg company in Miyazaki, Japan</h3>
              <h4>Production Management</h4>
              <p>2017/04 - 2018/08</p>
            </div>
          </div>
        </article>
        <h2>Education</h2>
        <article>
          <div className="card">
            <picture>
              <source srcSet="/img/weeding.webp" type="image/webp" />
              <img src="/img/weeding.jpg" alt="photograph of weeding robot" />
            </picture>
            <div className="content">
              <h3>Agricultural Production System Enginnering Lab.</h3>
              <h4>studied agricultural crop row detection tech with image processing</h4>
              <p>2015/04 - 2017/03</p>
            </div>
          </div>
          <div className="card">
            <picture>
              <source srcSet="/img/miyazakiUniv.webp" type="image/webp"/>
              <img src="/img/miyazakiUniV.png" alt="logo of miyazaki university" />
            </picture>
            <div className="content">
              <h3>Miyazaki University - faculty of Agriculture</h3>
              <h4>Major in Botanics, Agricultural Engineering</h4>
              <p>2013/04 - 2017/03</p>
            </div>
          </div>
        </article>
      </section>
    </React.Fragment>
  );
}