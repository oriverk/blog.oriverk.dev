import Link from 'next/link'

const blogPath = process.env.NEXT_PUBLIC_BLOG_PATH || ''

function isExternal(href: string) {
  if (href.startsWith(blogPath) || href.startsWith('/')) {
    return false
  } else {
    return true
  }
}

interface AnchorProps {
  href: string
  children: string | object
}

export const Anchor: React.VFC<AnchorProps> = (props) => {
  const { href, ...restProps } = props
  
  if (isExternal(href)) {
    return <a target="_blank" rel="noopener noreferrer" {...props} />
  } else {
    return (
      <Link href={href} passHref>
        <a {...restProps}></a>
      </Link>
    )
  }
}