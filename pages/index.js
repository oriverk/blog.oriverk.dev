import Head from 'next/head'

export default function Index() {
  return (
    <React.Fragment>
      <Head>
        <title>NextPortfolio</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <div className="header-link">
        <h1 className="title"><a href="#home">Kawano Yudai</a></h1>
        {/* component/header */}
        <p>B.Agr / JobSeeker</p>
        <nav>
          <a href="#about">About</a>
          <a href="#history">History</a>
          <a href="#works">Works</a>
          <a href="#blog">Blog</a>
        </nav>
        {/* component/header */}
        <div>リンク類</div>
          <p><small lang="en">ⓒ 2020 Kawano Yudai</small></p>
        </div>
      </header>
      <main>
        {/* component/main */}
        <section id="home"></section>
        <section id="about">
          <h2>About</h2>
          <p>
            About About About About About About About About About About About
            About About About About About About About About About About About
            About About About About About About About About About About About
            About About About About About About About About About About About
            About About About About About About About About About About About
            About About About About About About About About About About About
            About About About About About About About About About About About
          </p>
        </section>
        <br />
        <section id="history">
          <h2>History</h2>
          <p>
            History History History History History History History History History 
            History History History History History History History History History 
            History History History History History History History History History 
            History History History History History History History History History 
            History History History History History History History History History 
            History History History History History History History History History 
            History History History History History History History History History 
            History History History History History History History History History 
            History History History History History History History History History 
          </p>
        </section>
        <section id="works">
          <h2>Works</h2>
          <p>
            Works Works Works Works Works Works Works Works Works Works Works Works 
            Works Works Works Works Works Works Works Works Works Works Works Works 
            Works Works Works Works Works Works Works Works Works Works Works Works 
            Works Works Works Works Works Works Works Works Works Works Works Works 
            Works Works Works Works Works Works Works Works Works Works Works Works 
            Works Works Works Works Works Works Works Works Works Works Works Works 
            Works Works Works Works Works Works Works Works Works Works Works Works 
            Works Works Works Works Works Works Works Works Works Works Works Works 
            Works Works Works Works Works Works Works Works Works Works Works Works 
            Works Works Works Works Works Works Works Works Works Works Works Works 
            Works Works Works Works Works Works Works Works Works Works Works Works 
            Works Works Works Works Works Works Works Works Works Works Works Works 
            Works Works Works Works Works Works Works Works Works Works Works Works 
          </p>
        </section>
        {/* component/main */}
      </main>
      <style jsx>{`
        .header-link {
          position: absolute;
          left: 0;
          bottom: 0;
        }
        main {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          border: 1px solid yellow;
          position: absolute;
          top: 0;
          left: 20%;
        }

        #home {
          display: block;
          height: 100vh;
          width: 100%;
          background-color: gray;
          background-image: url("/top20200418.jpg");
          background-size: cover;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #FFF;
          text-decoration: none;
          font-weight: lighter;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        img {
          height: 100vh;
          width: 100%;
        }

        nav a {
          display: block;
        }

      `}</style>

      <style jsx global>{`
        html,
        body {
          color: #FFF;
          background-color: #121212;
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
        }

        #__next {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        
        header {
          margin-top: 0;
          padding-top: 50px;
          border:1px solid #FFF;
          height: 100vh;
          width: 20%;
          text-align: center;
          position: fixed;
          top: 0;
          left: 0;
        }

        * {
          box-sizing: border-box;
        }

        ::-webkit-scrollbar {
          width: .5rem;
          }

        ::-webkit-scrollbar-thumb {
          background-color: gray;
          border-radius: .3rem;
        }
      `}</style>
    </React.Fragment>
  )
}
