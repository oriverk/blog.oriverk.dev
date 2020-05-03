import React from 'react';

export default function OGP() {
  return (
    <React.Fragment>
      <meta content="KawanoYudai's website" name="title" />
      <meta content="My name is Kawano Yudai. I majored Botanics, Agricultural Engineering and studied crop row detection tech by image processing. Now, I'm seeking job as developer in Japan." name="description" />
      <meta content="developer, ruby, react" name='keywords' />
      {/* when page is article, content= is "article" */}
      {/* <meta property="og:type" content="website" /> */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content="website with React + Next.js" />
      <meta property="og:description" content="My name is Kawano Yudai. I majored Botanics, Agricultural Engineering and studied crop row detection tech by image processing. Now, I'm seeking job as developer in Japan." />
      <meta property="og:image" content="./assets/prtsc700.jpg" />
      <meta property="og:url" content="/" />
      <meta property="og:site_name" content="Kawano Yudai's website" />
      <meta property="og:locale" content="ja_JP" />
      <meta content="summary_large_image" name="twitter:card" />
      <meta content="@not_you_die" name="twitter:site" />
    </React.Fragment>
  );
}