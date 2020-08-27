import fs from 'fs'
import path from 'path'
import unified from 'unified'
import matter from 'gray-matter' // front matter parser
import remark from 'remark'
import html from 'remark-html' // plugin to serialize Markdown as HTML.
import katex from 'remark-html-katex' // plugin to transform inlineMath and math nodes with KaTeX for remark-html.
import math from 'remark-math' //plugins to support math! use $$ \n\n $$
import highlight from 'remark-highlight.js' // plugin to highlight code blocks with highlight.js (via lowlight)
import toc from 'remark-toc' // plugin to generate a table of contents.
import breaks from 'remark-breaks' // plugin to add break support, without needing spaces.
import toMdast from 'remark-parse' // parses markdown ton mdast
import remark2rehype from 'remark-rehype'
import toHast from 'mdast-util-to-hast'
import vfile from 'vfile'
import inspect from 'unist-util-inspect' // utility to inspect nodes
import slug from 'remark-slug' // plugin to add anchors headings using GitHub’s algorithm.
import squeeze from 'remark-squeeze-paragraphs' // plugin to remove empty (or whitespace only) paragraphs.
import remarkMdx from 'remark-mdx'
import link2heading from 'remark-autolink-headings' // plugin to automatically add links to headings. this must be included after `remark-slug`
import raw from 'rehype-raw' // rehype plugin to parse the tree again (and raw nodes). 
import frontmatter from 'remark-frontmatter'
import toHtml from 'hast-util-to-html'

const docsDirectory = path.join(process.cwd(), 'src/docs')

// posts/index.tsx
export function getSortedPostsData() {
  const fileNames = fs.readdirSync(docsDirectory)
  const allPostsData = fileNames.map(fileName => {
    const id = fileName.replace(/\.md$/, '')
    const fullPath = path.join(docsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const matterResult = matter(fileContents)
    const tags = matterResult.data.tags.map((tag) => (tag.toLowerCase())).sort()
    return {
      id,
      ...matterResult.data,
      tags,
    }
  })
  return allPostsData.sort((a, b) => {
    if (a.create < b.create) {
      return 1
    } else {
      return -1
    }
  })
}

// posts/[id].tsx
export function getAllPostIds() {
  const fileNames = fs.readdirSync(docsDirectory)
  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.md$/, '')
      }
    }
  })
}

const alignHeading = () => {
  return tree => {
    const heading = tree.children.filter(child => child.type === 'heading')
    const min = Math.min(...heading.map(h => h.depth))
    if (min === 1) {
      heading.forEach(node => {
        node.depth = node.depth + 1
      })
    }
  }
}

const processor = unified()
  .use(toMdast)
  .use(frontmatter, [{type: 'yaml', marker: '-'}])
  .use(math)
  .use(katex)
  .use(alignHeading)
  .use(slug)
  .use(squeeze)
  .use(breaks)
  .use(highlight)
  
function parseFile2Ast (file) {
  const ast = processor.parse(file)
  return processor.runSync(ast, file)
}

function perseAst2Hast (ast) {
  return toHast(ast, { allowDangerousHtml: true,})
}

function parseFrontmatter (ast) {
  const frontmatter = ast.children.find(
  (child) => child.type === 'yaml' | 'toml'
  )
  const parsed = yaml.parseCode(frontmatter.value)
  console.log('parse frontmatter')
  console.log(parsed)
  return parsed
}

const parseCode = (code) => {
  const file = vfile()

  file.contents = code

  const ast = parseFile2Ast(file)
  const frontmatter = parseFrontmatter(ast)  
  const hast = parseFile2Hast(ast)

  return {
    ast: hast,
    frontmatter,
  }
}


// posts/[id].tsx
export async function getPostData(id) {
  // ↑async is for remark.
  const fullPath = path.join(docsDirectory, `${id}.md`)
  // const fileContents = fs.readFileSync(fullPath, 'utf8')
  // const matterResult = matter(fileContents)
  // const tags = matterResult.data.tags.map((tag) => (tag.toLowerCase())).sort()

  // const processor = await remark()
  //   .use(remarkMdx)
  //   .use(toMdast)
  //   .use(squeeze)
  //   .use(alignHeading)
  //   .use(slug)
  //   .use(link2heading, {
  //     // content: { type: 'text', value: '#' },
  //     behavior: 'wrap',
  //     linkProperties: { ariaHidden: true, tabIndex: -1, class: "heading-link" },
  //   }) // Note that this module must be included after `remark-slug`.
  //   .use(breaks)
  //   .use(math)
  //   .use(katex)
  //   .use(highlight)
  //   .use(html, { sanitize: false })
  //   .process(matterResult.content)
    
  // // const contentHtml = processor.toString()
  // const contentHtml = processor.toString()

  const parsedCode = parseCode(fullPath)
  const frontmatter = parsedCode.frontmatter
  const hast = parsedCode.ast
  const contentHtml = toHast(hast).toString()
  const tags = frontmatter.tags
  console.log(tags)

  console.log('-----------------contents------------------------------------------------------------------')

  
  const processor1 = unified()
    .use(toMdast)
    .use(frontmatter)
    .use(alignHeading)
    .use(link2heading)   // Note that this module must be included after `remark-slug`.

  
  
  // const processor2 = unified()
  //   .use(toMdast)
  //   .parse(matterResult.content)
  
  // console.log(inspect(toHast(processor1)))
  
  
  console.log('-------------------parsed ------------------------')
  const parsed = processor1.parse(fullPath);
  console.log(inspect(parsed));

  console.log('=============transformed================')
  const transformed = processor1.runSync(parsed);
  console.log(inspect(transformed));
  
  return {
    id,
    contentHtml,
    frontmatter,
    tags,
  }
}

// tags/index.tsx
export function getAllTags() {
  const fileNames = fs.readdirSync(docsDirectory)
  const matterTags = fileNames.map(fileName => {
    const fullPath = path.join(docsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    return matter(fileContents).data.tags.map((tag) => tag.toLowerCase())
  })

  // [['qiita', 'ruby', 'hoge'], ['qiita', 'ruby', 'python']]

  // convert Two dimentional array to One that
  const allMatterTags = []
  for (var m = 0; m < matterTags.length; m++) {
    for (var n = 0; n < matterTags[m].length; n++) {
      allMatterTags.push(matterTags[m][n])
    }
  }
  // sort and unique allMatterTags
  const set = new Set(allMatterTags.sort());
  const tags = Array.from(set)
  return tags
}

export function getTagPosts(arg) {
  const fileNames = fs.readdirSync(docsDirectory)
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '')
    const fullPath = path.join(docsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const matterResult = matter(fileContents)
    const tags = matterResult.data.tags.map((tag) => tag.toLowerCase()).sort()
    if (tags.includes(arg.toLowerCase())) {
      return {
        id,
        ...matterResult.data,
        tags
      }
    } else {
      return ''
    }
  })
  return allPostsData.filter(Boolean).sort((a, b) => {
    if (a.create < b.create) {
      return 1
    } else {
      return -1
    }
  })
}