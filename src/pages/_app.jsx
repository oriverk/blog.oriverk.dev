import React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from '../plugins/Theme'
// import '../styles/global.css'

export default function MyApp(props) {
  const { Component, pageProps } = props

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
      <style jsx global>{`
        ::-webkit-scrollbar {
          width: 0;
          height: .5rem;
        }
        /*スクロールバーの動く部分*/
        ::-webkit-scrollbar-thumb {
          background-color: rgb(128, 128, 128);
          border-radius: .3rem;
        }
        *{
          font-family: 'Hiragino Sans', 'Meiryo', sans-serif;
        }
        div, p, a, li, b{
          font-size: 1rem;
        }
      `}</style>
    </React.Fragment>
  )
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
}