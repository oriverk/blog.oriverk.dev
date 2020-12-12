import css from 'styled-jsx/css'

export const homeStyle = css`
.icon {
  display: inline-block;
}
`

export const columnStyle = css`
.icons {
  position: fixed;
  right: .5rem;
  bottom: .5rem;
}

@media( min-width: 960px ){
  .icons{
    flex-direction: column;
    left: 91%;
    bottom: 3rem;
  }
}
`

export const commonStyle = css`
.icons{
  display: flex;
  flex-direction: row;
  z-index: 100;
}

.icon{
  position: relative;
  margin: .5rem;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  border: 1px solid var(--colorBackgroundDefault);
  background-color: var(--colorTextDefault);
  transition: all var(--transitionTimeFunc);
  text-decoration: none;
}

.icon:active{
  width: 1.9rem;
  height: 1.9rem;
}

.icon[aria-expanded='false']{
  display: none;
}

:global(.react-icons),
:global(.homeIconSvg){
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 1.25rem;
  height: 1.25rem;
  fill: var(--colorBackgroundDefault);
  transition: fill var(--transitionTimeFunc);
}

@media( min-width: 960px ){
  .icon {
    width: 2.25rem;
    height: 2.25rem;
  }
  .icon:active {
    width: 2.15rem;
    height: 2.15rem;
  }
  :global(.react-icons),
  :global(.homeIconSvg){
    width: 1.5rem;
    height: 1.5rem;
  }
}
`

