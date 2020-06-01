import React from 'react'
import Link from 'next/link'
import { Layout } from '../components/Layout'

export default function Custom404() {
  return (
    <Layout>
      <div style={{ textAlign: 'center' }}>
        <h1>404 - Page Not Found</h1>
        <p><Link href=''><a>Please go back to Home.</a></Link></p>
      </div>
    </Layout>
  )
}

