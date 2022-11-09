import NextHeadSeo from 'next-head-seo'

export type CustomSeoProps = {
  path: string
  title?: string
  description?: string
  ogImagePath?: string
  noindex?: boolean
  noTitleTemplate?: boolean
}

const blogPath = process.env.NEXT_PUBLIC_BLOG_PATH || ''

export const CustomSeo: React.FC<CustomSeoProps> = (props) => {
  const domain = blogPath.replace('https://', '')

  const {
    path,
    title = domain,
    description = 'description',
    ogImagePath = '/assets/sugarloaf-adelaide.png',
    noindex,
    noTitleTemplate,
  } = props

  const pageUrl = blogPath + path
  const ogImageUrl = blogPath + ogImagePath

  return (
    <NextHeadSeo
      title={noTitleTemplate ? title : `${title} | ${domain}`}
      canonical={pageUrl}
      description={description}
      robots={noindex ? 'noindex, nofollow' : undefined}
      og={{
        title,
        description,
        url: pageUrl,
        image: ogImageUrl,
        type: 'article',
        siteName: domain,
      }}
      twitter={{
        card: 'summary_large_image',
      }}
    />
  )
}
