import css from 'styled-jsx/css'
import { connectPoweredBy } from 'react-instantsearch-dom'

const style = css`
div {
  text-align: right;
}

img {
  height: 1.2rem;
  width: auto;
}
`

const PoweredBy: React.FC = () => (
  <>
    <div>
      <a href='https://www.algolia.com' target='_blank' rel='noopener noreferrer'>
        <img loading="lazy"
          src="https://res.cloudinary.com/hilnmyskv/image/upload/q_auto/v1594300044/Algolia_com_Website_assets/images/search/search-by-algolia.svg"
          alt="Search by Algolia" />
      </a>
    </div>
    <style jsx>{style}</style>
  </>
)

export const CustomPoweredBy = connectPoweredBy(PoweredBy)