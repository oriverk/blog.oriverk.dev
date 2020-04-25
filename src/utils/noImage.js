import React from 'react';

export default function NoImage (){
  return (
    <React.Fragment>
      <div>
        <h2>no image</h2>
      </div>
      <style jsx>{`
        div {text-align:center;background:#242657;margin-bottom:1rem;}
        h2 {color:#fff;font-weight:bold;display:inline-block;margin:1rem;}
      `}</style>
    </React.Fragment>
  );
}