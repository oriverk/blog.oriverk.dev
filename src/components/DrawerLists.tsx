export const LeftSwipeDrawer: React.FC = () => {
  return (
    <>
      <div>
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
    </>
  )
}