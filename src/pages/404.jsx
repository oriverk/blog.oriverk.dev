import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { Layout } from '../components/Layout'

const blog = require('../../blog.json')

export default function Custom404() {
  return (
    <Layout>
      <Head>
        <title>{`404 | ${blog.short_name}`}</title>
        <meta name='title' content={`404 | ${blog.baseName}`} />
        <meta name='description' content={blog.baseDesc} />
        <meta property='og:title' content={`404 | ${blog.baseName}`} />
        <meta property='og:description' content={blog.baseDesc} />
        <meta property='og:image' content={`${blog.baseUrl}/assets/prtsc700.jpg`} />
        <meta property='og:url' content={`${blog.baseUrl}/404`} />
      </Head>
      <div style={{ textAlign: 'center' }}>
        <h1>404 - Page Not Found</h1>
        <p><Link href='/'><a>Please go back to Home.</a></Link></p>
      </div>
    </Layout>
  )
}

