import type { ComponentPropsWithoutRef, FC } from 'react'

type Props = ComponentPropsWithoutRef<'h2'> & {
  depth: 2 | 3 | 4;
}

export const Heading: FC<Props> = (props) => {
  const { children, id, depth } = props;
  const Anchor: FC = () => <a href={`#${id}`}>{children}</a>;

  switch (depth) {
    case 2:
      return <h2 id={id}><Anchor /></h2>;
    case 3:
      return <h3 id={id}><Anchor /></h3>;
    case 4:
      return <h4 id={id}><Anchor /></h4>;
    default:
      return <h2 id={id}><Anchor /></h2>;
  }
}