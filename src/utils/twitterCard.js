import React from 'react';
import { Head } from 'next/document';

export default function TwitterCard() {
  return (
    <React.Fragment>
      <Head>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@no_you_die" />
        <meta name="twitter:title" content="OriverK's website" />
        <meta name="twitter:description" content="portfolio with React + Next.js" />
        <meta name="twitter:image" content="./image/prtsc.webp" />
      </Head>
    </React.Fragment>
  );
}