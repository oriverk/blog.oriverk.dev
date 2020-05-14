import React from 'react'
import Layout from '../components/Layout'

import Top from '../components/Top'
import About from '../components/About'
import History from '../components/History'
import Works from '../components/Works'

export default function Home() {
  return (
    <>
      <Layout>
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
        h2 {
          text-align: center;
        }
        .gridContainer {
          margin-bottom: 3rem;
        }
        .contentImg {
          width: 95%;
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
      `}</style>
    </>
  )
}