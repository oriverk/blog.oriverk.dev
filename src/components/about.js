import React from 'react';

export default class About extends React.Component{
  render() {
    return (
      <React.Fragment>
        <section id="about">
          <h1>About</h1>
          <p>My name is Kawano Yudai.</p>
          <p>I graduated from Miyazaki Universiy as Bachelor of Agriculture.</p>
          <p>My mayjor was especially botanics. And I belonged to agriculture mechanics lablatory and studied crop row detecting technique by image processing with C++ and OpenCV.</p>
          <br />
          <p>I worked at Egg company but quited this. After this, I was Australia as working holiday. Then I had a good chance to study Ruby and other tech like database, website system.</p>
          <br />
          <p>I'm very interested in both nature and machinery</p>
          <p>Now I'm studying programming to become web systerm developer.</p>
          <br />
          <p>Additionaly, I like riding roadbike and climbing. </p>
          <br />
          <p>Now I'm seeking job in Japan. So If you get interested in me, please contact me. </p>
        </section>
        <style jsx>{`
          #about { padding: 0 5%;margin-bottom: 5vh;}  
        `}</style>
      </React.Fragment>
    );
  }
}