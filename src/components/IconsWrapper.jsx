import Link from 'next/link'
import { IconContext } from 'react-icons'
import { FaTwitter } from 'react-icons/fa'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { WantedlySvg } from '../utils'
import { MdCreate, MdSearch, MdHome, MdLocalOffer, MdMoreHoriz, MdClose } from 'react-icons/md'
import { HatenaSvg } from '../utils'
import blogConfig from '../../blog.config'
import css from 'styled-jsx/css'

// blog #50CAF9
// facebook #3C5A99
// line #00B900
// Hatena #00A4DE
// twitter #00ACEE
// qiita #55C500
// wantedly #00A4BB
// github #24292e

const BlogIconsStyle = css`
  .iconsWrapper{
    display: flex;
    flex-direction: row;
    position: fixed;
    bottom: .5rem;
    right: .5rem;
    z-index: 100;
  }

  .icon{
    position: relative;
    text-decoration: none;
    border-radius: 50%;
    width: 1.75rem;
    height: 1.75rem;
    margin: .5rem;
    background-color: #EEE;
    border-radius: 50%;
  }

  .icon:hover, .icon:active{
    border: .5rem solid #424242;
  }
  
  .icon[aria-expanded='false']{
    display: none;
  }

  @media( min-width: 960px ){
    .iconsWrapper{
      display: flex;
      flex-direction: column;
      left: calc(50% + 500px );
      bottom: 3rem;
    }
    .icon{
      width: 2.25rem;
      height: 2.25rem;
    }
    .icon:hover, .icon:active{
      border: .1rem solid #424242;
    }
  }  
`

export const HomeIcons = (props) => {
  const openSearch = props.openSearch
  return (
    <React.Fragment>
      <div className='iconsWrapper'>
        <a className='icon' key='search' onClick={openSearch} aria-label='search post'>
          <IconContext.Provider value={{ className: 'react-icons' }}><MdSearch /></IconContext.Provider>
        </a>
        <Link href='/posts'>
          <a className='icon' key='posts' aria-label='posts page link'>
            <IconContext.Provider value={{ className: 'react-icons' }}><MdCreate /></IconContext.Provider>
          </a>
        </Link>
        <a className='icon github' key='github' href={`https://github.com/${blogConfig.sns.github}`}
          aria-label='github account link' target='_blank' rel='noopener noreferrer'>
          <IconContext.Provider value={{ className: 'react-icons' }}><FaGithub /></IconContext.Provider>
        </a>
        <a className='icon linkedin' key='linkedin' href={`https://www.linkedin.com/in/${blogConfig.sns.linkedin}`}
          aria-label='linkedin accountlink' target='_blank' rel='noopener noreferrer'>
          <IconContext.Provider value={{ className: 'react-icons' }}><FaLinkedin /></IconContext.Provider>
        </a>
        <a className='icon wantedly' key='wantedly' href={`https://www.wantedly.com/users/${blogConfig.sns.wantedly}`}
          aria-label='wantedly account link' target='_blank' rel='noopener noreferrer'>
          <WantedlySvg class='homeIconSvg' />
        </a>
        <a className='icon twitter' key='twitter' href={`https://twitter.com/${blogConfig.sns.twitter}`}  
          aria-label='twitter account link' target='_blank' rel='noopener noreferrer'>
          <IconContext.Provider value={{ className: 'react-icons' }}><FaTwitter /></IconContext.Provider>
        </a>
      </div>
      <style jsx>{`
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
      `}</style>
    </React.Fragment>    
  )
}  

export const PostsIcons = (props) => {
  const [more, setMore] = React.useState(false)
  return (
    <React.Fragment>
      <div className='iconsWrapper'>
        {/* <a className='icon search' key='search' aria-label='search post'>
          <IconContext.Provider value={{ className: 'react-icons' }}><MdSearch /></IconContext.Provider>
        </a> */}
        <Link href='/tags'>
          <a className='icon tags' key='tags' aria-label='tags page link'>
            <IconContext.Provider value={{ className: 'react-icons' }}><MdLocalOffer /></IconContext.Provider>
          </a>
        </Link>
        <Link href='/'>
          <a className='icon home' key='home' aria-expanded={more} aria-label='home link'>
            <IconContext.Provider value={{ className: 'react-icons' }}><MdHome /></IconContext.Provider>
          </a>
        </Link>
        <a className='icon close' key='close' aria-expanded={more}
          onClick={() => setMore(false)} aria-label='close link icons'>
          <IconContext.Provider value={{ className: 'react-icons' }}><MdClose /></IconContext.Provider>
        </a>
        <a className='icon more' key='more' aria-expanded={!more}
          onClick={() => setMore(true)} aria-label='expand link icons'>
          <IconContext.Provider value={{ className: 'react-icons' }}><MdMoreHoriz /></IconContext.Provider>
        </a>
      </div>
      <style jsx>{BlogIconsStyle}</style>
    </React.Fragment>
  )
}  

export const PostIcons = (props) => {
  const [more, setMore] = React.useState(false)
  const postTitle = props.postTitle
  const postId = props.postId
  const postTags = props.postTags ? props.postTags.join(',') : 'React, Next.js'
  const twitterShare = `https://twitter.com/share?text=${postTitle}&hashtags=${postTags}&url=${blogConfig.baseUrl}/posts/${postId}&related=${blogConfig.sns.tiwtter}`
  const hatenaShare = `https://b.hatena.ne.jp/entry/${blogConfig.baseUrl}/posts/${postId}`
  return (
    <React.Fragment>
      <div className='iconsWrapper'>
        <Link href='/tags'>
          <a className='icon tags' key='tags' aria-expanded={more} aria-label='tags page link'>
            <IconContext.Provider value={{ className: 'react-icons' }}><MdLocalOffer /></IconContext.Provider>
          </a>
        </Link>
        <Link href='/posts'>
          <a className='icon posts' key='posts' aria-label='posts page link'>
            <IconContext.Provider value={{ className: 'react-icons' }}><MdCreate /></IconContext.Provider>
          </a>
        </Link>
        <Link href='/'>
          <a className='icon home' key='home' aria-expanded={more} aria-label='home link'>
            <IconContext.Provider value={{ className: 'react-icons' }}><MdHome /></IconContext.Provider>
          </a>
        </Link>
        {/* <a className='icon search' key='search' aria-label='search post'
          onClick={()=>onSearchDrawer} aria-expanded={more} >
          <IconContext.Provider value={{ className: 'react-icons' }}><MdSearch /></IconContext.Provider>
        </a> */}
        <a className='icon Hatena' key='hatena' aria-expanded={more} href={hatenaShare}  
          aria-label='hatena share link' target='_blank' rel='noopener noreferrer'>
          <HatenaSvg class='homeIconSvg' />
        </a>
        <a className='icon twitter' key='twitter' href={twitterShare}
          aria-label='twitter share link' target='_blank' rel='noopener noreferrer'>
          <IconContext.Provider value={{ className: 'react-icons' }}><FaTwitter /></IconContext.Provider>
        </a>
        <a className='icon close' key='close' aria-label='close link icons'
          onClick={() => setMore(false)} aria-expanded={more} >
          <IconContext.Provider value={{ className: 'react-icons' }}><MdClose /></IconContext.Provider>
        </a>
        <a className='icon more' key='more' aria-label='expand link icons'
          onClick={() => setMore(true)} aria-expanded={!more} >
          <IconContext.Provider value={{ className: 'react-icons' }}><MdMoreHoriz /></IconContext.Provider>
        </a>
      </div>
      <style jsx>{BlogIconsStyle}</style>
    </React.Fragment>    
  )
}  

export const TagsIcons = (props) => {
  const [more, setMore] = React.useState(false)
  return (
    <React.Fragment>
      <div className='iconsWrapper'>
        {/* <a className='icon search' key='search' aria-label='search post'>
          <IconContext.Provider value={{ className: 'react-icons' }}><MdSearch /></IconContext.Provider>
        </a> */}
        <Link href='/posts'>
          <a className='icon posts' key='posts' aria-label='posts page link'>
            <IconContext.Provider value={{ className: 'react-icons' }}><MdCreate /></IconContext.Provider>
          </a>
        </Link>
        <Link href='/'>
          <a className='icon home' key='home' aria-expanded={more} aria-label='home link'>
            <IconContext.Provider value={{ className: 'react-icons' }}><MdHome /></IconContext.Provider>
          </a>
        </Link>
        <a className='icon close' key='close'  
          aria-expanded={more} onClick={() => setMore(false)} aria-label='close link icons'>
          <IconContext.Provider value={{ className: 'react-icons' }}><MdClose /></IconContext.Provider>
        </a>
        <a className='icon more' key='more'
          aria-expanded={!more} onClick={() => setMore(true)} aria-label='expand link icons'>
          <IconContext.Provider value={{ className: 'react-icons' }}><MdMoreHoriz /></IconContext.Provider>
        </a>
      </div>
      <style jsx>{BlogIconsStyle}</style>
    </React.Fragment>    
  )
}  

export const TagIcons = (props) => {
  const [more, setMore] = React.useState(false)
  return (
    <React.Fragment>
      <div className='iconsWrapper'>
        {/* <a className='icon search' key='search' aria-label='search post'>
          <IconContext.Provider value={{ className: 'react-icons' }}><MdSearch /></IconContext.Provider>
        </a> */}
        <Link href='/posts'>
          <a className='icon posts' key='posts' aria-label='posts page link'>
            <IconContext.Provider value={{ className: 'react-icons' }}><MdCreate /></IconContext.Provider>
          </a>
        </Link>
        <Link href='/tags'>
          <a className='icon tags' key='tags' aria-expanded={more} aria-label='tags page link'>
            <IconContext.Provider value={{ className: 'react-icons' }}><MdLocalOffer /></IconContext.Provider>
          </a>
        </Link>
        <Link href='/'>
          <a className='icon home' key='home' aria-expanded={more} aria-label='home link'>
            <IconContext.Provider value={{ className: 'react-icons' }}><MdHome /></IconContext.Provider>
          </a>
        </Link>
        <a className='icon close' key='close'  
          aria-expanded={more} onClick={() => setMore(false)} aria-label='close link icons'>
          <IconContext.Provider value={{ className: 'react-icons' }}><MdClose /></IconContext.Provider>
        </a>
        <a className='icon more' key='more'
          aria-expanded={!more} onClick={() => setMore(true)} aria-label='expand link icons'>
          <IconContext.Provider value={{ className: 'react-icons' }}><MdMoreHoriz /></IconContext.Provider>
        </a>
      </div>
      <style jsx>{BlogIconsStyle}</style>
    </React.Fragment>    
  )
}  

