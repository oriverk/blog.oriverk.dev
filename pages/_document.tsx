import React from 'react'
import { Html, Head, Main, NextScript } from 'next/document'

const CustomDocument: React.FC = () => (
  <Html lang="ja-JP">
    <Head />
    <body className="bg-slate-900 text-slate-50">
      <Main />
      <NextScript />
    </body>
  </Html>
)

export default CustomDocument
