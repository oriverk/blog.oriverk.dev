import React from 'react'
import Head from 'next/head'
import Layout from '../components/Layout'
import Top from '../components/Top'
import About from '../components/About'
import History from '../components/History'
import Works from '../components/Works'

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
        #works{
          margin-bottom: 3.5rem;
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
        a {
          color: #F48FB1; 
          text-decoration: none;
        }
        #about p{
          margin: 0 auto .5rem;
        }
      `}</style>
    </>
  )
}