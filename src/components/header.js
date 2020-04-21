import React from 'react';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import TwitterIcon from '@material-ui/icons/Twitter';

export default class HederLink extends React.Component{
  render() {
    return (
      <React.Fragment>
        <nav>
          <h2><a href="#about">About</a></h2>
          <h2><a href="#history">History</a></h2>
          <h2><a href="#works">Works</a></h2>
          <h2><a href="#blog">Blog</a></h2>
        </nav>
        <div className="icon">
          <a href="https://github.com/oriverk" target="_blank" rel="noopener noreferrer"><GitHubIcon /></a>
          <a href="https://www.linkedin.com/in/yudai-k/" target="_blank" rel="noopener noreferrer"><LinkedInIcon /></a>
          <a href="https://twitter.com/not_you_die" target="_blank" rel="noopener noreferrer"><TwitterIcon /></a>
        </div>
        <style jsx>{`
          a { display: inline-block;}
          .icon a{ margin: 0 .5rem;}
          `}</style>
      </React.Fragment>
    );
  }
}