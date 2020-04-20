import React from 'react';

export default class About extends React.Component{
  render() {
    return (
      <React.Fragment>
        <section id="about">
          <h1>About</h1>
          <p>My name is Kawano Yudai.</p>
          <p>I graduated from Miyazaki Universiy as Bacher of Agriculture.</p>
          <p>My mayjor was Agriculture, especially botanics.</p>
          <p>I belonged to agriculture mechanics lablatory and studied crop row detecting technique by image processing with C++ and OpenCV. The C++ was my first language because I hadn't study conputer science before. </p>
          <br />
          <p>After graduation, I worked at Egg company but quited this and went to Australia as working holiday. Then I had a good chance to study Ruby and other tech like database, website system.</p>
          <br />
          <p>I'm very interested in nature, machinery, and any technique which connect computer with something like human, nature, agriculture.</p>
          <p>Now I'm studying programming to become web systerm developer.</p>
          <br />
          <p>Additionaly, I like riding roadbike and climbing. </p>
          <br />
          <p>I'm seeking job in Japan. So If you get interested in me, please see my github, linkedin, and others. </p>
        </section>
        <style jsx>{`
          #about { padding: 0 5%;margin-bottom: 5vh;}  
        `}</style>
      </React.Fragment>
    );
  }
}