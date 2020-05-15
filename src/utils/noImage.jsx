import React from 'react'

export default function NoImage (){
  return (
    <React.Fragment>
      <div className="parent">
        <div className="child">no image</div>
      </div>
      <style jsx>{`
        .parent {
          height: 100%;
          background-color:#242657;
        }
        .child {
          padding: 5%;
          text-align: center;
          position: relative;
          top: 50%;
          left: 50%;
          transform: translate(-50%,-50%);
          color:#FFF;
          font-size:1.5rem;
          font-weight:bold;
        }
      `}</style>
    </React.Fragment>
  )
}