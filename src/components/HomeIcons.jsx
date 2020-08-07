import Link from 'next/link'
import { IconContext } from "react-icons";
import { FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa"
import { MdCreate, MdSearch } from "react-icons/md";
import { QiitaSvg, WantedlySvg } from '../utils/NewSvg'
import blogConfig from '../../blog.config'

export const HomeIcons = (props) => {
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
        <a className='icon' key='github' href={`https://github.com/${blogConfig.sns.github}`} target='_blank' rel='noopener noreferrer'>
          <IconContext.Provider value={{ className: 'react-icons github' }}><FaGithub /></IconContext.Provider>
        </a>
        {/* <a className='icon' key='twitter' href={`https://qiita.com/${blogConfig.sns.qiita}`} target='_blank' rel='noopener noreferrer'>
          <QiitaSvg class='homeIconSvg twitter' />
        </a> */}
        <a className='icon' key='linkedin' href={`https://www.linkedin.com/in/${blogConfig.sns.linkedin}`} target='_blank' rel='noopener noreferrer'>
          <IconContext.Provider value={{ className: 'react-icons linkedin' }}><FaLinkedin /></IconContext.Provider>
        </a>
        <a className='icon' key='wantedly' href={`https://www.wantedly.com/users/${blogConfig.sns.wantedly}`} target='_blank' rel='noopener noreferrer'>
          <WantedlySvg class='homeIconSvg wantedly' />
        </a>
        <a className='icon' key='twitter' href={`https://twitter.com/${blogConfig.sns.twitter}`} target='_blank' rel='noopener noreferrer'>
          <IconContext.Provider value={{ className: 'react-icons twitter' }}><FaTwitter /></IconContext.Provider>
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
        .icon:hover > .react-icons.github{
          fill: #24292e;
        }
        .icon:hover > .react-icons.linkedin{
          fill: #0077B5;
        }
        .icon:hover > .react-icons.twitter{
          fill: #00ACEE;
        }
        .icon:hover > .homeIconSvg.qiita{
          fill: #55C500;
        }
        .icon:hover > .homeIconSvg.wantedly{
          fill: #00A4BB;
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

