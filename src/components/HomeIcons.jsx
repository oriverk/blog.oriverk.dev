import Link from 'next/link'
import { IconContext } from "react-icons"
import { FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa"
import { MdCreate, MdSearch } from "react-icons/md"
import { WantedlySvg } from '../utils'
import blogConfig from '../../blog.config'

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
        {/* <a className='icon qiita' key='qiita' href={`https://qiita.com/${blogConfig.sns.qiita}`} target='_blank' rel='noopener noreferrer'>
          <QiitaSvg class='homeIconSvg qiita' />
        </a> */}
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
      <style jsx global>{`
        .react-icons, .homeIconSvg{
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          fill: #424242;
          width: 1rem;
          height: 1rem;
        }
        .icon:hover > .react-icons {
          fill: #50CAF9;
        }
        .icon.github:hover > .react-icons{
          fill: #24292e;
        }
        .icon.linkedin:hover > .react-icons{
          fill: #0077B5;
        }
        .icon.twitter:hover > .react-icons{
          fill: #00ACEE;
        }
        .icon.qiita:hover > .homeIconSvg{
          fill: #55C500;
        }
        .icon.wantedly:hover > .homeIconSvg{
          fill: #00A4BB;
        }

        @media ( min-width: 960px ){
          .react-icons, .homeIconSvg{
            width: 1.75rem;
            height: 1.75rem;
          }
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
          width: 1.75rem;
          height: 1.75rem;
          margin: .5rem;
          background-color: #EEE;
          border-radius: 50%;
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

// blog #50CAF9

// facebook #3C5A99
// line #00B900
// Hatena #00A4DE
// twitter #00ACEE
// qiita #55C500
// wantedly #00A4BB
// github #24292e

