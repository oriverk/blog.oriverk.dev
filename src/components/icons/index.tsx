import { HomeIcons } from './HomeIcons'
import { PostsIcons } from './PostsIcons'
import { PostIcons } from './PostIcons'
import { TagsIcons } from './TagsIcons'
import { TagIcons } from './TagIcons'

type Props = {
  className?: string
}

export const WantedlySvg: React.FC<Props> = ({ className }) => (
  <svg className={className} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 900 900'><path d='M100 208.6h100l150 362.1L400 450 300 208.6h100l50 120.7 50-120.7h100L500 450l50 120.7 150-362.1h100L600 691.4H500l-50-120.7-50 120.7H300z' /></svg>
)

export const HatenaSvg: React.FC<Props> = ({ className }) => (
  <svg className={className} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path d='M20.47 0C22.42 0 24 1.58 24 3.53v16.94c0 1.95-1.58 3.53-3.53 3.53H3.53C1.58 24 0 22.42 0 20.47V3.53C0 1.58 1.58 0 3.53 0h16.94zm-3.705 14.47c-.78 0-1.41.63-1.41 1.41s.63 1.414 1.41 1.414 1.41-.645 1.41-1.425-.63-1.41-1.41-1.41zM8.61 17.247c1.2 0 2.056-.042 2.58-.12.526-.084.976-.222 1.32-.412.45-.232.78-.564 1.02-.99s.36-.915.36-1.48c0-.78-.21-1.403-.63-1.87-.42-.48-.99-.734-1.74-.794.66-.18 1.156-.45 1.456-.81.315-.344.465-.824.465-1.424 0-.48-.103-.885-.3-1.26-.21-.36-.493-.645-.883-.87-.345-.195-.735-.315-1.215-.405-.464-.074-1.29-.12-2.474-.12H5.654v10.486H8.61zm.736-4.185c.705 0 1.185.088 1.44.262.27.18.39.495.39.93 0 .405-.135.69-.42.855-.27.18-.765.254-1.44.254H8.31v-2.297h1.05zm8.656.706v-7.06h-2.46v7.06H18zM8.925 9.08c.71 0 1.185.08 1.432.24.245.16.367.435.367.83 0 .38-.13.646-.39.804-.265.154-.747.232-1.452.232h-.57V9.08h.615z' /></svg>
)

export { HomeIcons, PostsIcons, PostIcons, TagsIcons, TagIcons }