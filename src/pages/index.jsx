import React from 'react'
import Head from 'next/head'
import { Layout } from '../components/Layout'
import { Top, About, History, Works } from '../components/HomeContents'

export default function Home() {
  return (
    <>
      <Layout>
        <Head>
          <title>Kawano Yudai's site</title>
          <meta name='title' content="Kawano Yudai's site" />
          <meta name='description' content="My name is Kawano Yudai. I majored Botanics, Agricultural Engineering and studied crop row detection tech by image processing. Now, I'm seeking job as developer in Japan." />
          <meta property='og:title' content="Kawano Yudai's site" />
          <meta property='og:description' content="My name is Kawano Yudai. I majored Botanics, Agricultural Engineering and studied crop row detection tech by image processing. Now, I'm seeking job as developer in Japan." />
          <meta property='og:image' content='./assets/prtsc700.jpg' />
          <meta property='og:url' content='/posts' />
        </Head>
        <Top />
        <About />
        <History />
        <Works />
      </Layout>
    </>
  )
}