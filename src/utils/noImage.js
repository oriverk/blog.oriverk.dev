import React from 'react';

export default function NoImage (){
  return (
    <React.Fragment>
      <div>
        <h2>no image</h2>
      </div>
      <style jsx>{`
        div {text-align:center;}
        h2 {color:#fff;font-weight:bold;background:#242657;}
      `}</style>
    </React.Fragment>
  );
}