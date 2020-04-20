import React from 'react';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import TwitterIcon from '@material-ui/icons/Twitter';

export default class HederLink extends React.Component{
  render() {
    return (
      <React.Fragment>
        <div>
          <a href="https://github.com/oriverk" target="_blank" rel="noopener noreferrer"><GitHubIcon></GitHubIcon></a>
          <a href="https://www.linkedin.com/in/yudai-k/" target="_blank" rel="noopener noreferrer"><LinkedInIcon></LinkedInIcon></a>
          <a href="https://twitter.com/not_you_die" target="_blank" rel="noopener noreferrer"><TwitterIcon></TwitterIcon></a>
        </div>
      </React.Fragment>
    );
  }
}