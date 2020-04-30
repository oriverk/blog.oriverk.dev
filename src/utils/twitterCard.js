import React from 'react';
import { Head } from 'next/document';

export default function TwitterCard() {
  return (
    <React.Fragment>
      <Head>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@no_you_die" />
        <meta name="twitter:title" content="YudaiOriverK" />
        <meta name="twitter:description" content="{{ site.description }}/ {{site.sub-description}}" />
        <meta name="twitter:image" content="https://oriverk.github.io/assets/images/og-image.jpg" />
      </Head>
    </React.Fragment>
  );
}