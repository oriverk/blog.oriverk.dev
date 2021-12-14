import React from 'react'
import { AppProps } from 'next/app'

import GoogleAnalytics from '@src/components/GoogleAnalytics'
import { LocaleProvider } from '../hooks/locale'
import usePageView from '@src/hooks/usePageView'

import { setup } from 'goober'
import { prefix } from 'goober/prefixer'
import { GlobalStyles } from '../styles/goober'

// goober's needs to know how to render the `styled` nodes.
// So to let it know, we run the `setup` function with the
// `createElement` function and prefixer function.
setup(React.createElement, prefix)

export default function MyApp({ Component, pageProps }: AppProps) {  
  usePageView()
  
  return (
    <>
      <GoogleAnalytics />
      <GlobalStyles />
      <LocaleProvider>
      <Component {...pageProps} />
      </LocaleProvider>
    </>
  )
}
