import { connectPoweredBy } from 'react-instantsearch-dom'
import css from 'styled-jsx/css'

const style = css`
div{
  width: 100%;
  text-align: right;
}
img{
  height: 1.2rem;
  width: auto;
  margin: 0 auto;
}
`

const PoweredBy: React.FC = () => {
  return (
    <>
      <div>
        <a href='https://www.algolia.com' target='_blank' rel='noopener noreferrer'>
          <img loading="lazy"
            src="https://res.cloudinary.com/hilnmyskv/image/upload/q_auto/v1594300044/Algolia_com_Website_assets/images/search/search-by-algolia.svg" alt="Search by Algolia" />
        </a>
      </div>
      <style jsx>{style}</style>
    </>
  )
}

export const CustomPoweredBy = connectPoweredBy(PoweredBy)