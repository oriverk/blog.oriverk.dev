import React from 'react'
import Head from 'next/head'
import { Layout } from '../components/Layout'
import { Top, About, History, Works } from '../components/HomeContents'

// const manifest = require('../../public/manifest.json')
const blog = require('../../blog.json')

export default function Home() {
  return (
    <>
      <Layout home>
        <Head>
          <title>{blog.baseName}</title>
          <meta name='title' content={blog.baseName} />
          <meta name='description' content={blog.baseDesc} />
          <meta property='og:title' content={blog.baseName} />
          <meta property='og:description' content={blog.baseDesc} />
          <meta property='og:image' content={`${blog.baseUrl}/assets/prtsc700.jpg`} />
          <meta property='og:url' content={blog.baseUrl} />
        </Head>
        <Top />
        <About />
        <History />
        <Works />
      </Layout>
    </>
  )
}