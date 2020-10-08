import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useAmp } from 'next/amp'
import { Layout } from '../components/Layout'
import blogConfig from '../../blog.config'

export const config = {
  amp: 'hybrid'
}

export default function Custom404() {
  const isAmp = useAmp()
  const ogImage = blogConfig.baseUrl + blogConfig.ogImage
  const url = blogConfig.baseUrl + '/404/'
  return (
    <Layout isAmp={isAmp}>
      <Head>
        <title>{`404 | ${blogConfig.shortName}`}</title>
        <meta name='title' content={`404 | ${blogConfig.baseName}`} />
        <meta name='description' content={blogConfig.desc} />
        <meta property='og:title' content={`404 | ${blogConfig.baseName}`} />
        <meta property='og:description' content={blogConfig.desc} />
        <meta property='og:image' content={ogImage} />
        <meta property='og:url' content={ isAmp ? url + '?amp=1' : url} />
      </Head>
      <div style={{ textAlign: 'center' }}>
        <h1>404 - Page Not Found</h1>
        <p><Link href={ isAmp ? '/?amp=1' : '/' }><a>Please go back to Home.</a></Link></p>
      </div>
    </Layout>
  )
}

