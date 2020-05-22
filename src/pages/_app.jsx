import React from 'react'
import Head from 'next/head'
import PropTypes from 'prop-types'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from '../plugins/Theme'

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
      <Head>
        <meta charSet='utf-8' />
        <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
        <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width' />
        <meta name='format-detection' content='email=no,telephone=no,address=no' />
        <link rel='apple-touch-icon' sizes='180x180' href='/assets/human512x512.png' />
        <link rel='icon' type='image/png' sizes='32x32' href='/favicon/favicon-32x32.png' />
        <link rel='icon' type='image/png' sizes='16x16' href='/favicon/favicon-16x16.png' />
        <link rel='manifest' href='./manifest.json' />
      </Head>
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
          color: #FFF;
          font-size: 1rem;
        }
        a{
          color: #50CAF9;
          text-decoration: none;
        }
      `}</style>
    </React.Fragment>
  )
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
}