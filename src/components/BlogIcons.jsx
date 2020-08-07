import Link from 'next/link'
import { IconContext } from "react-icons";
import { FaTwitter } from "react-icons/fa"
import { MdCreate, MdSearch, MdHome, MdLocalOffer } from "react-icons/md"
import { HatenaSvg } from '../utils/NewSvg'
import blogConfig from '../../blog.config'

export const BlogIcons = (props) => {
  // const twitterShare = `https://twitter.com/share?text=${postData.title}&hashtags=react,nextjs&url=${blogConfig.baseUrl}/posts/${postData.id}&related=${blogConfig.sns.tiwtter}`
  // const hatenaShare = `https://twitter.com/share?text=${postData.title}&hashtags=react,nextjs&url=${blogConfig.baseUrl}/posts/${postData.id}&related=${blogConfig.sns.tiwtter}`
  return (
    <React.Fragment>
      <div className='iconsWrapper'>
        <a className='icon next' key='search'>
          <IconContext.Provider value={{ className: 'react-icons nextBlog' }}><MdSearch /></IconContext.Provider>
        </a>
        <Link href='/posts'>
          <a className='icon next' key='posts'>
            <IconContext.Provider value={{ className: 'react-icons nextBlog' }}><MdCreate /></IconContext.Provider>
          </a>
        </Link>
        <Link href='/'>
          <a className='icon next' key='home'>
            <IconContext.Provider value={{ className: 'react-icons nextBlog' }}><MdHome /></IconContext.Provider>
          </a>
        </Link>
        <Link href='/tags'>
          <a className='icon next' key='tags'>
            <IconContext.Provider value={{ className: 'react-icons nextBlog' }}><MdLocalOffer /></IconContext.Provider>
          </a>
        </Link>
        <a className='icon' key='twitter' href={`https://twitter.com/${blogConfig.sns.twitter}`} target='_blank' rel='noopener noreferrer'>
          <IconContext.Provider value={{ className: 'react-icons twitter' }}><FaTwitter /></IconContext.Provider>
        </a>
        <a className='icon' key='hatena' href={`https://twitter.com/${blogConfig.sns.twitter}`} target='_blank' rel='noopener noreferrer'>
          <HatenaSvg class='homeIconSvg hatena' />
        </a>
      </div>
      <style jsx global>{`
        .react-icons, .homeIconSvg{
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          fill: #EEE;
          width: 1.75rem;
          height: 1.75rem;
        }
        .icon:hover > .react-icons.nextBlog {
          fill: #50CAF9;
        }
        .icon:hover > .react-icons.twitter{
          fill: #00ACEE;
        }
        .icon:hover > .homeIconSvg.hatena{
          fill: #00A4DE;
        }

      `}</style>
      <style jsx>{`
        .iconsWrapper{
          width: 100%;
        }

        .icon {
          position: relative;
          display: inline-block;
          text-decoration: none;
          border-radius: 50%;
          width: 2.25rem;
          height: 2.25rem;
          margin: .5rem;
        }
        
      `}</style>
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

