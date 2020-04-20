import Head from 'next/head';
import Header from '../components/header.js';
import About from '../components/about.js';
import History from '../components/history.js';
import Works from '../components/works.js';

export default function Index() {
  return (
    <React.Fragment>
      <Head>
        <title>NextPortfolio</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <h1 className="title"><a href="#home">Kawano<wbr></wbr> Yudai</a></h1>
        <p>B.Agr <wbr></wbr>/ JobSeeker</p>
        <Header />
        <div>リンク類</div>
        <p><small lang="en">ⓒ 2020 Kawano Yudai</small></p>
      </header>
      <main>
        <section id="home"></section>
        <About />
        <History />
        <Works />
      </main>
      <style jsx>{`
        main {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          position: absolute;
          top: 0;
          left: 20%;
        }

        #home {
          display: block;
          height: 100vh;
          width: 100%;
          background-color: gray;
          background-image: url("/top2.jpg");
          background-size: cover;
        }

      `}</style>

      <style jsx global>{`
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

        html, body {
          color: #FFF;
          background-color: #121212;
          padding: 0 20px;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
        }

        #__next {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        h1, h2, h3, h4, h5, h6, strong, em {
          color: #FFF;
          margin-bottom: .5rem;
          font-weight: "Semi Bold";
          line-height: 1.25;
        }

        h1 {
          font-size: 2rem;
        }

        h2 {
          margin-top: 1rem;
          font-size: 1.5rem;
        }

        h3 {
          margin-top: 1.5rem;
          font-size: 1.25rem;
        }

        h4, h5, h6 {
          margin-top: 1rem;
          font-size: 1rem;
        }

        p {
          margin-top: 0;
          margin-bottom: 1rem;
        }

        span{
          font-size: 1rem;
        }

        a{
          color: #FFF;
          text-decoration: none;
        }

        a:hover, a:focus, a:active {
          color: #7BD0E7;
          text-decoration: underline;
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

        section {
          border: 1px solid yellow;
        }

      `}</style>
    </React.Fragment>
  )
}
