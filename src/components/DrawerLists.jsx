import React from 'react'
import { Divider } from '../utils/utils'

const DrawerLists = ({children}) => {
  return (
    <React.Fragment>
      <React.Fragment>
        <div className="drawerContents">
          <div className='profileImgContainer'>
            <picture>
              <source srcSet='/assets/human192x192.webp' type='image/webp' className='profileImg' />
              <img src='/assets/human192x192.png' alt='avatar' className='profileImg' />
            </picture>
          </div>
          <Divider />
          {children}
        </div>
        <style jsx>{`
        .profileImgContainer {
          margin: 1rem;
          border-radius: 50%;
        }

        .profileImg {
          margin: 0 auto;
          width: 80%;
          background-color: #424242;
        }
      `}</style>
      </React.Fragment>
    </React.Fragment>
  )
}

export const LeftSwipeDrawerLists = (props) => {
  return (
    <React.Fragment>
      <DrawerLists>
        <div className='desc'>
          <p>Kawano Yudai</p>
          <p>with React, TypeScript</p>
          <p>This uses Google Analytics</p>
        </div>
        <Divider />
        <div className='desc'>
          <p>under construction...</p>
        </div>
      </DrawerLists>
      <style jsx>{`
        .desc {
          color: #EEE;
          text-align: center;
        }
      `}</style>
    </React.Fragment>
  )
}