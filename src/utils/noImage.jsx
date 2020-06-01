import React from 'react'

export default function NoImage (){
  return (
    <>
      <div className='parent'>
        <div className='child'>no image</div>
      </div>
      <style jsx>{`
        .parent {
          height: 100%;
          background-color:#242657;
          border: 1px solid grey;
        }
        .child {
          padding: .5rem;
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
    </>
  )
}