import Head from 'next/head'
import blogConfig from '../../../blog.config'

type Props = {
  noindex?: boolean,
  pageUrl?: string,
  pageTitle?: string,
  pageDescription?: string,
  pageImage?: string
}

export const CustomHead: React.FC<Props> = ({
  children,
  noindex = false,
  pageUrl,
  pageTitle,
  pageDescription,
  pageImage,
}) => {
  const ogImage = pageImage ? blogConfig.baseUrl + pageImage : blogConfig.baseUrl + blogConfig.ogImage
  return (
    <Head>
      { noindex && ( <meta name="robots" content="noindex" /> )}
      <title>{`${pageTitle} | ${blogConfig.shortName}`}</title>
      <meta name='title' content={`${pageTitle} | ${blogConfig.baseName}`} />
      <meta name='description' content={pageDescription || blogConfig.desc} />
      <meta property='og:title' content={`${pageTitle} | ${blogConfig.baseName}`} />
      <meta property='og:description' content={pageDescription || blogConfig.desc} />
      <meta property='og:image' content={ogImage} />
      <meta property='og:url' content={blogConfig.baseUrl + pageUrl} />
      {children}
    </Head>
  )
}