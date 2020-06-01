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
      <style jsx global>{`
        .content {
          width: 100%;
          max-width: 1000px;
          margin: 0 auto 3rem;
          padding: 0 5%;
          flex-grow: 1;
        }

        article {
          margin-bottom: 1rem;
        }
        
        h2, h3 {
          text-align: center;
        }

        .gridContainer:not(:last-child){
          margin: 2rem auto;
          border-bottom: 1px solid grey;
        }

        .gridItem{
          margin-bottom: .5rem;
        }

        .contentImg {
          width: 100%;
        }
        
        ul {
          margin-top: 7px;
          margin-bottom: 0px;
          padding-left: 20px;
        }
      `}</style>
    </>
  )
}