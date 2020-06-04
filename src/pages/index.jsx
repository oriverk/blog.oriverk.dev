import React from 'react'
import Head from 'next/head'
import { Layout } from '../components/Layout'
import { Top, About, History, Works } from '../components/HomeContents'

const manifest = require('../../public/manifest.json')

export default function Home() {
  return (
    <>
      <Layout home>
        <Head>
          <title>{manifest.name}</title>
          <meta name='title' content={manifest.name} />
          <meta name='description' content={manifest.description} />
          <meta property='og:title' content={manifest.name} />
          <meta property='og:description' content={manifest.description} />
          <meta property='og:image' content={`${manifest.vercel}/assets/prtsc700.jpg`} />
          <meta property='og:url' content={`${manifest.vercel}`} />
        </Head>
        <Top />
        <About />
        <History />
        <Works />
      </Layout>
    </>
  )
}