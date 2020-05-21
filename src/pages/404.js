import React from 'react'
import Link from 'next/link'
import { Layout } from '../components/Layout'

export default function Portfolio() {
  return (
    <Layout home>
      <div style={{ textAlign: 'center' }}>
        <h1>404 - Page Not Found</h1>
        <p><Link href='/'><a style={{textDecoration:'none', color: '#F48FB1'}}>Please go back to Home.</a></Link></p>
      </div>
    </Layout>
  )
}

