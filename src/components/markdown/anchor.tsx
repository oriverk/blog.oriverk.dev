import Link from 'next/link'

const blogPath = process.env.NEXT_PUBLIC_BLOG_PATH || ''

function isExternal(href: string) {
  return !(href.startsWith(blogPath) || href.startsWith("/"))
}

export interface Props {
  href: string
  children: string | object
}

export const Anchor: React.FC<Props> = (props) => {
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