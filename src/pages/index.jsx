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
          {/* <meta property='og:image' content='./assets/prtsc700.jpg' /> */}
          <meta property='og:url' content='/posts' />
        </Head>
        <Top />
        <About />
        <History />
        <Works />
      </Layout>
      <style jsx global>{`
        .topContainer {
          height: 100vh;
          position: relative;
          background-color: #212121;
          background-size: cover;
          background-position: center;
          background-image: url('/assets/adelaide2.webp');
        }
        .topTitleContainer {
          color: white;
          padding: 5%;
          text-align: center;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background-color: rgba(0,0,0,0.3);
          border-bottom: 2px double rgb(255,255,255);
          border-radius: 2px;
        }
        .topTitle {
          font-weight: 500;
          font-size: 4rem;
        }
        .topSubtitle {
          font-size: 2rem
        }

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
      
        #about p{
          margin: 0 auto .5rem;
        }
      `}</style>
    </>
  )
}