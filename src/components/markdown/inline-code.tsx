import { styled } from 'goober'

const StyledComponent = styled('code')`
  padding: 0 0.25rem;
  margin: 0 0.3rem;
  border-radius: 0.125rem;
  background: rgba(226, 232, 240, 0.16);
  font-size: 0.9rem;
  color: var(--color-white);

  &::before,
  &::after {
    content: '\`';
  }
`

export interface Props {
  children: string
}

export const InlineCode: React.FC<Props> = (props) => {
  return <StyledComponent {...props} translate="no" />
}
