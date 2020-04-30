import React from 'react';

export default function NoImage (){
  return (
    <React.Fragment>
      <div className="parent">
        <div className="child">no image</div>
      </div>
      <style jsx>{`
        .parent {
          text-align: center;
        }
        .child {
          color:#FFF;
          font-size:1.5rem;
          font-weight:bold;
          width: 90%;
          background:#242657;
        }
      `}</style>
    </React.Fragment>
  );
}