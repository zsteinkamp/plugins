import { HeadingType } from '@/index'
import Link from 'next/link'
import { FC } from 'react'

export const dynamic = 'force-dynamic'

interface HeadingIndexProps {
  headings: HeadingType[]
}

const HeadingIndex: FC<HeadingIndexProps> = ({ headings }) => {
  //headings[0] = { key: 'top', level: 3, title: 'Back to top 👆' }
  const lines = headings.map((heading, i) => {
    return (
      <li className={`pr-0 ml-0 pl-0 mr-0 mb-4`} key={i + heading.key}>
        <Link className="hover:text-highlight" href={`#${heading.key}`}>
          {heading.title}
        </Link>
      </li>
    )
  })
  if (lines.length > 0) {
    return (
      <>
        <h4 className="text-highlight mb-2">In this page...</h4>
        <ul className="list-none">{lines}</ul>
      </>
    )
  }
  return null
}

export default HeadingIndex
