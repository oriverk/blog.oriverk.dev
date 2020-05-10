import Head from 'next/head'
import Layout from '../components/Layout'
import utilStyles from '../styles/utils.module.css'

import Top from '../components/Top'
import About from '../components/About'
import History from '../components/History'
import Works from '../components/Works'

export default function Home() {
  return (
    <Layout home>
      <Top />
      <About />
      <History />
      <Works />
    </Layout>
  )
}