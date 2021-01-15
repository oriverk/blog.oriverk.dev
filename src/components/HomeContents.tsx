import Link from 'next/link'
import { useRouter } from 'next/router'
import css from 'styled-jsx/css'

import { CustomImg } from './common/Image'
import { HomeIcons } from '../components/icons/index'

type LinkImg = {
  src: string
  alt: string
}

const CustomLinkImg: React.FC<Partial<LinkImg>> = ({ src, alt }) => (
  <a href={src} target='_blank' rel='noopener noreferrer'>
    <CustomImg src={src} alt={alt} />
  </a>
)

const topStyle = css`
section {
  position: relative;
  margin-bottom: 2rem;
  height: 100vh;
  background-color: var(--colorBackgroundDefault);
  background-size: cover;
  background-position: center;
  background-image: url('/assets/home/sunrisePortrait650x867.webp');
}

.topWrapper {
  position: relative;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
}

.title {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 5%;
  width: 100%;
  text-align: center;
  color: var(--colorWhite);
}

.topTitle {
  margin: 0 auto;
  font-weight: 500;
  font-size: 3.5rem;
}

.sub {
  font-size: 1.5rem
}

@media( min-width: 600px){
  section {
    background-image: url('/assets/home/sunrisePortrait960x1280.webp')
  }
}
@media (min-width: 960px){
  section {
    height: 100vh;
    background-image: url('/assets/home/sunrisePortrait1280x1707.webp')
  }
}
@media(min-width: 1280px){
  section {
    background-image: url('/assets/home/sunrise2000x1333.webp')
  }
}
@media(min-width: 1980px){
  section {
    background-image: url('/assets/home/sunrise3500x2333.webp')
  }
}
`

export const Top: React.FC = () => (
  <>
    <section id='top'>
      <div className='topWrapper'>
        <div className='title'>
          <div className='topTitle'>Kawano Yudai</div>
          <div className='sub'>B.Agr.</div>
          <HomeIcons />
        </div>
      </div>
    </section>
    <style jsx>{topStyle}</style>
  </>
)

const commonStyle = css`
  section {
    margin: 0 auto 2rem;
    padding: 0 5%;
    max-width: 1000px;
  }

  article {
    margin-bottom: 1rem;
  }

  h2, h3 {
    text-align: center;
  }

  .container {
    display: flex;
    flex-direction: column;
    margin: .5rem 0 2rem;
    padding-bottom: 1rem;
  }

  .container:not(:last-child) {
    border-bottom: 1px solid var(--colorTextGray);
  }
  
  @media( min-width: 1280px ) {
    .container {
      flex-direction: row;
    }

    .container:not(:last-child) {
      padding-bottom: 2rem;
    }

    .left {
      width: 40%;
      margin-right: 5%;
    }

    .right {
      width: 55%;
    }
  }
`

export const About: React.FC = () => (
  <>
    <section id='about'>
      <h2>About</h2>
      <div className='container'>
        <div className='left'>
          <CustomLinkImg
            src='/assets/home/LongRidge700.jpg' alt='scenary from Long Ridge Lookout in Adelaide' />
        </div>
        <div className='right'>
          <p>My name is Kawano Yudai.</p>
          <p>I graduated from Miyazaki Universiy as Bachelor of Agriculture.</p>
          <p>In agricultural engineering lablatory I studied crop row detecting tech by image processing with C++ and OpenCV.</p>
          <p>After egg company, I stayed at Australia as working holiday. Then I studied Ruby and other tech like database, website system.</p>
          <p>So, I'm interested in both nature and machinery</p>
        </div>
      </div>
    </section>
    <style jsx>{`
      p {
        margin: 0 auto .5rem;
      }
    `}</style>
    <style jsx>{commonStyle}</style>
  </>
)

export const History: React.FC = () => (
  <>
    <section id='history'>
      <h2>History</h2>
      <article>
        <h3>Experience</h3>
        <div className='container'>
          <div className='left'>
            <CustomLinkImg src='/assets/home/sunrise.jpg' alt='no image' />
          </div>
          <div className='right'>
            <span>2017/04 - 2018/08</span>
            <br /><b>Egg company in Miyazaki</b>
            <br /><span>Production Management</span>
          </div>
        </div>
      </article>
      <article>
        <h3>Education</h3>
        <div className='container'>
          <div className='left'>
            <CustomLinkImg src='/assets/home/weeding700.jpg' alt='weeding robot motion picture' />
          </div>
          <div className='right'>
            <span>2015/04 - 2017/03</span>
            <br /><b>Agricultural Production System Enginnering Lab.</b>
            <br /><span>Agricultural crop row detecting tech by image processing</span>
          </div>
        </div>
        <div className='container'>
          <div className='left'>
            <CustomLinkImg src='/assets/home/miyazakiUniv.jpg' alt='logo of Miyazaki University' />
          </div>
          <div className='right'>
            <span>2013/04 - 2017/03 :</span>
            <br /><b>Faculty of Agriculture <wbr />in Miyazaki Univ.</b>
            <br /><span>Majored in Botanics and Agricultural Mechanics</span>
          </div>
        </div>
      </article>
    </section>
    <style jsx>{commonStyle}</style>
  </>
)

export const Works: React.FC = () => {
  const { locale } = useRouter()
  return (
    <>
      <section id='works'>
        <h2>Works</h2>
        <article>
          <div className='container'>
            <div className='left'>
              <CustomLinkImg src='/assets/home/20200915prtsc1000.jpg' alt='screenshot of this site' />
            </div>
            <div className='right'>
              <b>This portfolio site as resume and tech blog</b>
              <br /><span> :to learn modern JS</span>
              <br /><span>with Reactand Typescript</span>
              <ul>
                <li>
                  <Link href='/posts/20200526-next-portfolio/' locale={locale} >
                    <a>Blog: Created portfolio site with Next.js</a>
                  </Link>
                </li>
                <li><a href='https://github.com/oriverk/next-portfolio' target='_blank' rel='noopener noreferrer' >Github repositry</a></li>
              </ul>
            </div>
          </div>
          <div className='container'>
            <div className='left'>
              <CustomLinkImg src='/assets/posts/202003/miyazaki-oss1.jpg' alt='screenshot of miyazaki corona taskforce site' />
            </div>
            <div className='right'>
              <b>Miyazaki COVID-19 Task Force site</b>
              <br /><span>( OSS website )</span>
              <br /><span>with Vue.js, TypeScript</span>
              <ul>
                <li>
                  <Link href='/posts/20200329-joined-corona-oss/' locale={locale}>
                    <a>Blog: Joined OSS for COVID-19 site of Miyazaki</a>
                  </Link>
                </li>
                <li><a href='https://github.com/oriverk/covid19' target='_blank' rel='noopener noreferrer' >Github repositry</a></li>
                <li><a href='https://covid19-miyazaki.netlify.app/' target='_blank' rel='noopener noreferrer' >The site on Netlify</a></li>
              </ul>
            </div>
          </div>
          <div className='container'>
            <div className='left'>
              <CustomLinkImg src='/assets/home/codr700.jpg' alt='screenshot of code share web app' />
            </div>
            <div className='right'>
              <b>Coder0</b>
              <br /><span> :to share code with syntax-highlight</span>
              <br /><span>with RubyonRails, PostgreSQL, AWS S3</span>
              <ul>
                <li>
                  <Link href='/posts/20191129-post-code2twitter/' locale={locale}>
                    <a>Blog: Wanna Share code on Twitter</a>
                  </Link>
                </li>
                <li><a href='https://github.com/oriverk/Codr' target='_blank' rel='noopener noreferrer' >Github repositry</a></li>
              </ul>
            </div>
          </div>
          <div className='container'>
            <div className='left'>
              <CustomLinkImg src='/assets/home/githubPages1st700.jpg' alt='screenshot of my 1st githubpages' />
            </div>
            <div className='right'>
              <b>GithubPages</b>
              <br /><span>:My 1st GithubPages</span>
              <br /><span>with Ruby, Jekyll</span>
              <ul>
                <li><Link href='/posts/20190818-use-jekyll' locale={locale}><a>Blog: Build GithubPages with Jekyll</a></Link></li>
                <li><a href='https://github.com/oriverk/oriverk.github.io' target='_blank' rel='noopener noreferrer' >Github repositry</a></li>
              </ul>
            </div>
          </div>
          <div className='container'>
            <div className='left'>
              <CustomLinkImg src='/assets/home/sunrise.jpg' alt='no image' />
            </div>
            <div className='right'>
              <b>Ticket sales System</b>
              <br /><span> :from the 2018 Autumn FE exam</span>
              <br /><span>with RubyonRails, PostgreSQL, Heroku</span>
              <ul>
                <li>
                  <Link href='/posts/20190829-fe-exam/' locale={locale}>
                    <a>Blog: Reproduce ticket sales system in FE exam</a>
                  </Link>
                </li>
                <li><a href='https://github.com/oriverk/ConcertTicket' target='_blank' rel='noopener noreferrer' >Github repositry</a></li>
                <li>
                  <a href='https://www.jitec.ipa.go.jp/1_04hanni_sukiru/mondai_kaitou_2018h30_2/2018h30a_fe_pm_qs.pdf' target='_blank' rel='noopener noreferrer'>IPA FE exam</a>
                </li>
              </ul>
            </div>
          </div>
        </article>
      </section>
      <style jsx>{commonStyle}</style>
    </>
  )
}