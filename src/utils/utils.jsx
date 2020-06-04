import React from 'react'

export function NoImage (){
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

export const IconButton = (props) => {
  return (
    <>
      <a href={props.href} aria-label={props.label} target='_blank' rel='noopener noreferrer'>
        {props.children}
      </a>
      <style jsx>{`
        a {
          display: inline-block;
          transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
          border-radius: 50%;
          fill: #50CAF9;
          float: left;
        }
        a:hover{
          background-color: rgba(255,255,255,0.08);
        }
      `}</style>
    </>
  )
}

export const Divider = () => {
  return (
    <>
      <hr />
      <style jsx>{`
        hr {
          border: none;
          height: 1px;
          margin: 0;
          flex-shrink: 0;
          background-color: rgba(255, 255, 255, 0.12);
        }  
      `}</style>
    </>
  )
}