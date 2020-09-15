import React from 'react'
import { OptimizedImages } from './general/OptimizedImages'

export const LeftSwipeDrawer = () => {
  return (
    <React.Fragment>
      <div>
        <div className='imgContainer'>
          <OptimizedImages
            src='/assets/human512x512.png' alt='avatar' imgStyle={{ margin: '0 auto', width: '80%', backgroundColor: '#424242' }} />
        </div>
        <div className='desc'>
          <p>Kawano Yudai</p>
          <p>with React, TypeScript</p>
          <p>This uses Google Analytics</p>
        </div>
      </div>
      <style jsx>{`
        .imgContainer {
          margin: 1rem;
          border-radius: 50%;
          text-align: center;
        }

        .desc {
          color: #EEE;
          text-align: center;
        }
      `}</style>
    </React.Fragment>
  )
}