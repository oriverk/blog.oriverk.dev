// see https://github.com/hashicorp/next-mdx-remote/issues/53#issuecomment-725906664
import slugger from 'github-slugger'

import type { HeadingType } from 'types/markdown'

export function getTableOfContents(mdContent: string): HeadingType[] {
  const regexp = new RegExp(/^(### |## )(.*)\n/, 'gm')
  const headings = [...mdContent.matchAll(regexp)]
  let tableOfContents: HeadingType[] = []

  if (headings.length) {
    tableOfContents = headings.map((heading) => {
      const headingText = heading[2].trim()
      const headingType = heading[1].trim() === '##' ? 'h2' : 'h3'
      const headingLink = slugger.slug(headingText, false)

      return {
        text: headingText,
        id: headingLink,
        level: headingType,
      }
    })
  }

  return tableOfContents
}
