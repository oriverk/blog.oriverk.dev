import React from 'react'
import Head from 'next/head'
import { Layout } from '../components/Layout'
import { About, History, Works } from '../components/HomeContents'
import blogConfig from '../../blog.config'
import { useAmp } from 'next/amp'

export const config = {
  amp: 'hybrid'
}

export default function () {
  const isAmp = useAmp()
  const ogImage = blogConfig.baseUrl + blogConfig.ogImage
  return (
    <>
      <Layout isAmp={isAmp}>
        <Head >
          <title>{blogConfig.baseName}</title>
          <meta name='title' content={blogConfig.baseName} />
          <meta name='description' content={blogConfig.desc} />
          <meta property='og:title' content={blogConfig.baseName} />
          <meta property='og:description' content={blogConfig.desc} />
          <meta property='og:image' content={ogImage} />
          <meta property='og:url' content={blogConfig.baseUrl} />
        </Head>
        {/* <Top /> */}
        <About />
        <History />
        <Works />
      </Layout>
    </>
  )
}