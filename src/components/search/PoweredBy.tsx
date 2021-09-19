import css from 'styled-jsx/css'
import { connectPoweredBy } from 'react-instantsearch-dom'
import Image from 'next/image'

const style = css`
div {
  position: relative;
  height: 1.2rem;
  width: 10rem;
}
`

const PoweredBy: React.VFC = () => (
  <>
    <div>
      <a href='https://www.algolia.com' target='_blank' rel='noopener noreferrer'>
        <Image layout="fill" objectFit="contain"
          src="https://res.cloudinary.com/hilnmyskv/image/upload/q_auto/v1594300044/Algolia_com_Website_assets/images/search/search-by-algolia.svg"
          alt="Search by Algolia" />
      </a>
    </div>
    <style jsx>{style}</style>
  </>
)

export const CustomPoweredBy = connectPoweredBy(PoweredBy)