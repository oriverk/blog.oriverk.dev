import css from 'styled-jsx/css'

const style = css`
main{
  width: 100%;
}
`

export const Layout: React.FC = ({ children }) => {
  return (
    <>
      <main>
        {children}
      </main>
      <style jsx>{style}</style>
    </>
  )
}