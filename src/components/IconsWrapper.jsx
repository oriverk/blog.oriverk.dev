import Link from 'next/link'
import { IconContext } from 'react-icons'
import { FaTwitter } from 'react-icons/fa'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { WantedlySvg } from '../utils'
import { MdCreate, MdSearch, MdHome, MdLocalOffer, MdMoreHoriz, MdClose } from 'react-icons/md'
import { HatenaSvg } from '../utils'
import blogConfig from '../../blog.config'
import css from 'styled-jsx/css'

const iconsStyle = css`
  .iconsWrapper{
    width: 100%;
  }

  .icon{
    position: relative;
    display: inline-block;
    text-decoration: none;
    border-radius: 50%;
    width: 1.75rem;
    height: 1.75rem;
    margin: .5rem;
    background-color: #EEE;
    border-radius: 50%;
  }

  .icon:active{
    border: 1px solid #424242;
  }
  
  .icon[aria-expanded='false']{
    display: none;
  }
  @media( min-width: 960px ){
    .icon{
      width: 2.25rem;
      height: 2.25rem;
    }
  }
`

export const HomeIcons = (props) => {
  const openSearch = props.openSearch
  return (
    <React.Fragment>
      <div className='iconsWrapper'>
        <a className='icon' key='search' onClick={openSearch}>
          <IconContext.Provider value={{ className: 'react-icons' }}><MdSearch /></IconContext.Provider>
        </a>
        <Link href='/posts'>
          <a className='icon' key='posts'>
            <IconContext.Provider value={{ className: 'react-icons' }}><MdCreate /></IconContext.Provider>
          </a>
        </Link>
        <a className='icon github' key='github' href={`https://github.com/${blogConfig.sns.github}`} target='_blank' rel='noopener noreferrer'>
          <IconContext.Provider value={{ className: 'react-icons' }}><FaGithub /></IconContext.Provider>
        </a>
        <a className='icon linkedin' key='linkedin' href={`https://www.linkedin.com/in/${blogConfig.sns.linkedin}`} target='_blank' rel='noopener noreferrer'>
          <IconContext.Provider value={{ className: 'react-icons' }}><FaLinkedin /></IconContext.Provider>
        </a>
        <a className='icon wantedly' key='wantedly' href={`https://www.wantedly.com/users/${blogConfig.sns.wantedly}`} target='_blank' rel='noopener noreferrer'>
          <WantedlySvg class='homeIconSvg' />
        </a>
        <a className='icon twitter' key='twitter' href={`https://twitter.com/${blogConfig.sns.twitter}`} target='_blank' rel='noopener noreferrer'>
          <IconContext.Provider value={{ className: 'react-icons' }}><FaTwitter /></IconContext.Provider>
        </a>
      </div>
      <style jsx>{iconsStyle}</style>
    </React.Fragment>
  )
}

// export const HomeIcons = (props) => {
//   const openSearch = props.openSearch
//   const githubHref = `https://github.com/${blogConfig.sns.github}`
//   const linkedinHref = `https://www.linkedin.com/in/${blogConfig.sns.linkedin}`
//   const wantedlyHref = `https://www.wantedly.com/users/${blogConfig.sns.wantedly}`
//   const twitterHref = `https://twitter.com/${blogConfig.sns.twitter}`
//   return (
//     <React.Fragment>
//       <div className='iconsWrapper'>
//         <a className='icon search' key='search' onClick={openSearch}>
//           <IconContext.Provider value={{ className: 'react-icons' }}><MdSearch /></IconContext.Provider>
//         </a>
//         <Link href='/posts'>
//           <a className='icon posts' key='posts'>
//             <IconContext.Provider value={{ className: 'react-icons' }}><MdCreate /></IconContext.Provider>
//           </a>
//         </Link>
//         <a className='icon github' key='github' href={githubHref} target='_blank' rel='noopener noreferrer'>
//           <IconContext.Provider value={{ className: 'react-icons' }}><FaGithub /></IconContext.Provider>
//         </a>
//         {/* <a className='icon qiita' key='qiita' href={`https://qiita.com/${blogConfig.sns.qiita}`} target='_blank' rel='noopener noreferrer'>
//           <QiitaSvg class='homeIconSvg qiita' />
//         </a> */}
//         <a className='icon linkedin' key='linkedin' href={linkedinHref} target='_blank' rel='noopener noreferrer'>
//           <IconContext.Provider value={{ className: 'react-icons' }}><FaLinkedin /></IconContext.Provider>
//         </a>
//         <a className='icon wantedly' key='wantedly' href={wantedlyHref} target='_blank' rel='noopener noreferrer'>
//           <WantedlySvg class='homeIconSvg' />
//         </a>
//         <a className='icon twitter' key='twitter' href={twitterHref} target='_blank' rel='noopener noreferrer'>
//           <IconContext.Provider value={{ className: 'react-icons' }}><FaTwitter /></IconContext.Provider>
//         </a>
//       </div>
//       <style jsx>{iconsStyle}</style>
//     </React.Fragment>
//   )
// }


export const PostsIcons = (props) => {
  const [more, setMore] = React.useState(false)
  return (
    <React.Fragment>
      <div className='iconsWrapper'>
        <a className='icon more' key='more'
          aria-expanded={!more} onClick={()=>setMore(true)}>
          <IconContext.Provider value={{ className: 'react-icons' }}><MdMoreHoriz /></IconContext.Provider>
        </a>
        <a className='icon close' key='close'
          aria-expanded={more} onClick={()=>setMore(false)}>
          <IconContext.Provider value={{ className: 'react-icons' }}><MdClose /></IconContext.Provider>
        </a>
        <a className='icon search' key='search'>
          <IconContext.Provider value={{ className: 'react-icons' }}><MdSearch /></IconContext.Provider>
        </a>
        <Link href='/'>
          <a className='icon home' key='home' aria-expanded={more}>
            <IconContext.Provider value={{ className: 'react-icons' }}><MdHome /></IconContext.Provider>
          </a>
        </Link>
        <Link href='/tags'>
          <a className='icon tags' key='tags'>
            <IconContext.Provider value={{ className: 'react-icons' }}><MdLocalOffer /></IconContext.Provider>
          </a>
        </Link>
      </div>
      
      <style jsx>{iconsStyle}</style>
    </React.Fragment>
  )
}

export const PostIcons = (props) => {
  const [more, setMore] = React.useState(false)
  const twitterShare = `https://twitter.com/share?text=${props.postTitle}&hashtags=react,nextjs&url=${blogConfig.baseUrl}/posts/${props.postId}&related=${blogConfig.sns.tiwtter}`
  const hatenaShare = `https://b.hatena.ne.jp/entry/${blogConfig.baseUrl}/posts/${props.postId}`
  return (
    <React.Fragment>
      <div className='iconsWrapper'>
        <a className='icon more' key='more'
          aria-expanded={!more} onClick={()=>setMore(true)}>
          <IconContext.Provider value={{ className: 'react-icons' }}><MdMoreHoriz /></IconContext.Provider>
        </a>
        <a className='icon close' key='close'
          aria-expanded={more} onClick={()=>setMore(false)}>
          <IconContext.Provider value={{ className: 'react-icons' }}><MdClose /></IconContext.Provider>
        </a>
        <a className='icon search' key='search' aria-expanded={more}>
          <IconContext.Provider value={{ className: 'react-icons' }}><MdSearch /></IconContext.Provider>
        </a>
        <Link href='/'>
          <a className='icon home' key='home' aria-expanded={more}>
            <IconContext.Provider value={{ className: 'react-icons' }}><MdHome /></IconContext.Provider>
          </a>
        </Link>
        <Link href='/posts'>
          <a className='icon posts' key='posts'>
            <IconContext.Provider value={{ className: 'react-icons' }}><MdCreate /></IconContext.Provider>
          </a>
        </Link>
        <Link href='/tags'>
          <a className='icon tags' key='tags' aria-expanded={more} >
            <IconContext.Provider value={{ className: 'react-icons' }}><MdLocalOffer /></IconContext.Provider>
          </a>
        </Link>
        <a className='icon twitter' key='twitter' href={twitterShare} target='_blank' rel='noopener noreferrer'>
          <IconContext.Provider value={{ className: 'react-icons' }}><FaTwitter /></IconContext.Provider>
        </a>
        <a className='icon Hatena' key='hatena' aria-expanded={more}
          href={hatenaShare} target='_blank' rel='noopener noreferrer'>
          <HatenaSvg class='homeIconSvg' />
        </a>
      </div>
      <style jsx>{iconsStyle}</style>
    </React.Fragment>
  )
}

export const TagsIcons = (props) => {
  const [more, setMore] = React.useState(false)
  return (
    <React.Fragment>
      <div className='iconsWrapper'>
        <a className='icon more' key='more'
          aria-expanded={!more} onClick={() => setMore(true)}>
          <IconContext.Provider value={{ className: 'react-icons' }}><MdMoreHoriz /></IconContext.Provider>
        </a>
        <a className='icon close' key='close'
          aria-expanded={more} onClick={() => setMore(false)}>
          <IconContext.Provider value={{ className: 'react-icons' }}><MdClose /></IconContext.Provider>
        </a>
        <a className='icon search' key='search'>
          <IconContext.Provider value={{ className: 'react-icons' }}><MdSearch /></IconContext.Provider>
        </a>
        <Link href='/'>
          <a className='icon home' key='home' aria-expanded={more}>
            <IconContext.Provider value={{ className: 'react-icons' }}><MdHome /></IconContext.Provider>
          </a>
        </Link>
        <Link href='/posts'>
          <a className='icon posts' key='posts'>
            <IconContext.Provider value={{ className: 'react-icons' }}><MdCreate /></IconContext.Provider>
          </a>
        </Link>
      </div>
      <style jsx>{iconsStyle}</style>
    </React.Fragment>
  )
}

export const TagIcons = (props) => {
  const [more, setMore] = React.useState(false)
  return (
    <React.Fragment>
      <div className='iconsWrapper'>
        <a className='icon more' key='more'
          aria-expanded={!more} onClick={() => setMore(true)}>
          <IconContext.Provider value={{ className: 'react-icons' }}><MdMoreHoriz /></IconContext.Provider>
        </a>
        <a className='icon close' key='close'
          aria-expanded={more} onClick={() => setMore(false)}>
          <IconContext.Provider value={{ className: 'react-icons' }}><MdClose /></IconContext.Provider>
        </a>
        <a className='icon search' key='search'>
          <IconContext.Provider value={{ className: 'react-icons' }}><MdSearch /></IconContext.Provider>
        </a>
        <Link href='/'>
          <a className='icon home' key='home' aria-expanded={more}>
            <IconContext.Provider value={{ className: 'react-icons' }}><MdHome /></IconContext.Provider>
          </a>
        </Link>
        <Link href='/posts'>
          <a className='icon posts' key='posts'>
            <IconContext.Provider value={{ className: 'react-icons' }}><MdCreate /></IconContext.Provider>
          </a>
        </Link>
        <Link href='/tags'>
          <a className='icon tags' key='tags' aria-expanded={more} >
            <IconContext.Provider value={{ className: 'react-icons' }}><MdLocalOffer /></IconContext.Provider>
          </a>
        </Link>
      </div>
      <style jsx>{iconsStyle}</style>
    </React.Fragment>
  )
}





// blog #50CAF9

// facebook #3C5A99
// line #00B900
// Hatena #00A4DE
// twitter #00ACEE
// qiita #55C500
// wantedly #00A4BB
// github #24292e

