import React from 'react';

export default class Header extends React.Component{
  render() {
    return (
      <React.Fragment>
        <nav>
          <h2><a href="#about">About</a></h2>
          <h2><a href="#history">History</a></h2>
          <h2><a href="#works">Works</a></h2>
          <h2><a href="#blog">Blog</a></h2>
        </nav>
        <style jsx>{`
          a {
            display: block;
          }
        `}</style>
      </React.Fragment>
    );
  }
}