// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import type { User } from 'path/to/interfaces';

export interface SvgIconProps {
  color: string
  size: number
  label?: string
  title?: string
  role?: 'presentation' | 'img'
}
