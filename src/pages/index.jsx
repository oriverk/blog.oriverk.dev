import React from 'react'
import Head from 'next/head'
import { Layout } from '../components/Layout'
import { Top, About, History, Works } from '../components/HomeContents'
import blogConfig from '../../blog.config'

export default function Home() {
  return (
    <>
      <Layout home>
        <Head>
          <title>{blogConfig.baseName}</title>
          <meta name='title' content={blogConfig.baseName} />
          <meta name='description' content={blogConfig.desc} />
          <meta property='og:title' content={blogConfig.baseName} />
          <meta property='og:description' content={blogConfig.desc} />
          <meta property='og:image' content={`${blogConfig.baseUrl}/assets/prtsc700.jpg`} />
          <meta property='og:url' content={blogConfig.baseUrl} />
        </Head>
        <Top />
        <About />
        <History />
        <Works />
      </Layout>
    </>
  )
}