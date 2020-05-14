import React from 'react'

export default function Top() {
  return (
    <React.Fragment>
      <section id="top" className="topContainer">
        <div className="topTitleContainer">
          <div className="topTitle">Kawano <wbr />Yudai</div>
          <div className="topSubtitle">B.Agr. /<wbr />JobSeeker</div>
        </div>
      </section>
      <style jsx>{`
        .topContainer {
          display: block;
          height: 100vh;
          position: relative;
          background-color: #212121;
          background-size: cover;
          background-position: center;
          background-image: url("/assets/adelaide2.webp");
        }
        .topTitleContainer {
          color: white;
          padding: 5%;
          text-align: center;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background-color: rgba(0,0,0,0.3);
          border-bottom: 2px double rgb(255,255,255);
          border-radius: 2px;
        }
        .topTitle {
          font-weight: bold;
          font-size: 4rem;
        }
        .topSubtitle {
          font-size: 2rem
        }
      `}</style>
    </React.Fragment>
  )
}