import { HeadingType } from '@/index'
import { FC } from 'react'

export const dynamic = 'force-dynamic'

interface HeadingIndexProps {
  headings: HeadingType[]
  className?: string
}

const HeadingIndex: FC<HeadingIndexProps> = ({ headings, className = '' }) => {
  //headings[0] = { key: 'top', level: 3, title: 'Back to top 👆' }
  const lines = headings.map((heading, i) => {
    return (
      <div
        className={`pr-8 mb-2 ${className} ${
          heading.level <= 3 ? 'text-highlight font-heading text-xl mt-8' : ''
        }`}
        style={{
          fontWeight: heading.level <= 3 ? 'bold' : 'normal',
        }}
        key={i + heading.key}
      >
        <a href={`#${heading.key}`} className="hover:text-highlight">
          {heading.title}
        </a>
      </div>
    )
  })
  return lines
}

export default HeadingIndex
