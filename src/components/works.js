import React from 'react';
import NoImage from '../utils/noImage';

export default function Works() {
  return (
    <React.Fragment>
      <section id="works">
        <h1>Works</h1>
        <article>
          <div className="card">
            <picture>
              <source srcSet="/img/githubpages1st.webp" type="image/webp" />
              <img src="/img/githubpages1st.jpg" alt="screen-shot from 1st Githubpages" />
            </picture>
            <h3>GithubPages( 1st )</h3>
            <h4>with Ruby, Jekyll</h4>
            <p>This is 1st GithubPages for me.</p>
            <ul>
              <li>References:
                <ul>
                  <li><a href="https://github.com/oriverk/oriverk.github.io">Github</a></li>
                  <li><a href="https://qiita.com/OriverK/items/ce48102c66c9fa97b33e">Post on Qiita: "Let's build GithubPages with Jekyll"</a></li>
                </ul>
              </li>
            </ul>
          </div>
          <div className="card">
            <picture>
              <source srcSet="/img/codr.webp" type="image/webp" />
              <img src="/img/codr.jpg" alt="screen-shot from this webpage" />
            </picture>
            <h3>Coder0</h3>
            <h4>with RubyonRails, PostgreSQL, AWS S3</h4>
            <p>application which enable to share code with syntax-highlight on Twitter</p>
            <ul>
              <li>References:
                <ul>
                  <li><a href="https://github.com/oriverk/Codr">Github</a></li>
                  <li><a href="https://qiita.com/OriverK/items/df41ec6b57b40a06a64d">Post on Qiita "I wanna share code beautifully on Twitter"</a></li>
                </ul>
              </li>
            </ul>
          </div>
          <div className="card">
            <NoImage />
            <h3>Tichet sales System</h3>
            <h4>with RubyonRails, PostgreSQL, Heroku</h4>
            <p>I made this with based on the FE exam by IPA on Autumn, 2018. </p>
            <ul>
              <li>References: 
                <ul>
                  <li><a href="https://github.com/oriverk/ConcertTicket">Github</a></li>
                  <li><a href="https://qiita.com/OriverK/items/4e71ebd81a6ef372dcf9">Post on Qiita: "I made the ticket sales system"</a></li>
                  <li><a href="https://www.jitec.ipa.go.jp/1_04hanni_sukiru/mondai_kaitou_2018h30_2/2018h30a_fe_pm_qs.pdf">The exam page</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </article>
      </section>
    </React.Fragment>
  );
}