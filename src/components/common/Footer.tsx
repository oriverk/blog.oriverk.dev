import css from 'styled-jsx/css'
import blogConfig from '../../../blog.config'

const style = css`
footer {
  margin: 0 1.5%;
  text-align: center;
}
`

export const Footer: React.FC = () => (
  <>
    <footer>
      <p>
        © {new Date().getFullYear()}{' '}
        <a href={'https://github.com/' + blogConfig.sns.github} target='_blank' rel='noopener noreferrer'>
          Kawano Yudai
        </a> 
      </p>
      <p>
        This site uses Google Analytics. And this source is{' '}
        <a href='https://github.com/oriverk' target='_blank' rel='noopener noreferrer'>
          here
        </a>.
      </p>
    </footer>
    <style jsx>{style}</style>
  </>
)