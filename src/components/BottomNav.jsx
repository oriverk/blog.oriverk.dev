import React from 'react'
import Link from 'next/link'

export function BottomNav() {
  return (
    <React.Fragment>
      <nav className="nav">
        <Link href='#' passHref>
          <MaterialButton href='#' icon='dashboard' text='dashboard' key='menu' />
        </Link>
        <Link href='/hoge' passHref>
          <MaterialButton href='/hoge' icon='person' text='Home' key='home' />
        </Link>
        <Link href='/posts' passHref>
          <MaterialButton href='/posts' icon='create' text='Blog' key='blog' />
        </Link>
        <Link href='/tags' passHref>
          <MaterialButton href='/tags' icon='local_offer' text='Tags' key='tags' />
        </Link>
        {/* <a href="#" className="nav__link">
          <i className="material-icons nav__icon">lock</i>
          <span className="nav__text">Privacy</span>
        </a> */}
      </nav>
      <style jsx>{`
        /* nav */
        .nav {
          position: fixed;
          bottom: 0;
          width: 100%;
          height: 55px;
          box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
          background-color: #424242;
          display: flex;
          overflow-x: auto;
          z-index: 100;
        }
        @media (min-width: 960px){
          .nav {
            display: none;
          }
        }
      `}</style>
    </React.Fragment>
  )
}

const MaterialButton = React.forwardRef((props) => {
  return (
    <React.Fragment>
      <a href={props.href} key={props.key} ref={props.ref} className='nav__link'>
        <i className="material-icons nav__icon">{props.icon}</i>
        <span className="nav__text">{props.text}</span>
      </a>
      <style jsx>{`
        /* google fonts */
        @font-face {
          font-family: 'Material Icons';
          font-style: normal;
          font-weight: 400;
          src: url(https://fonts.gstatic.com/s/materialicons/v53/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2) format('woff2');
        }

        .material-icons {
          font-family: 'Material Icons';
          font-weight: normal;
          font-style: normal;
          font-size: 24px;
          line-height: 1;
          letter-spacing: normal;
          text-transform: none;
          display: inline-block;
          white-space: nowrap;
          word-wrap: normal;
          direction: ltr;
          -webkit-font-feature-settings: 'liga';
          -webkit-font-smoothing: antialiased;
        }
        /* nav */
        .nav__link {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          flex-grow: 1;
          min-width: 50px;
          overflow: hidden;
          white-space: nowrap;
          font-family: sans-serif;
          font-size: 13px;
          color: #EEE;
          text-decoration: none;
          -webkit-tap-highlight-color: transparent;
          transition: background-color 0.1s ease-in-out;
        }

        .nav__link:hover {
          background-color: #666;
        }

        .nav__link--active {
          color: #009578;
        }

        .nav__icon {
          font-size: 18px;
        }
      `}</style>
    </React.Fragment>
  )
})