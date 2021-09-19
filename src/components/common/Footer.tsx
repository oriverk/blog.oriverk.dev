import css from 'styled-jsx/css'
import blogConfig from '../../../blog.config'

import { useTranslation } from '../../hooks/translation'

const style = css`
footer {
  margin: 0 1.5%;
  padding-bottom: 1rem;
  text-align: center;
}

footer > p:last-child {
  margin-bottom: 0;
}
`

export const Footer: React.VFC = () => {
  const useGoogleAnalytics = useTranslation('USE_GOOGLE_ANALYTICS')
  const souceCode = useTranslation('SOURCE_CODE_IS')
  const here = useTranslation('SOURCE_CODE_IS_HERE')
  return(
    <>
      <footer>
        <p>
          © {new Date().getFullYear()}{' '}
          <a href={'https://github.com/' + blogConfig.sns.github} target='_blank' rel='noopener noreferrer'>
            Kawano Yudai
          </a> 
        </p>
        <p>
          <span>{useGoogleAnalytics}{' '}</span>
          <span>{souceCode}{' '}
            <a href='https://github.com/oriverk/oriverk.dev' target='_blank' rel='noopener noreferrer'>{here}</a>
          </span>
        </p>
      </footer>
      <style jsx>{style}</style>
    </>
  )
}