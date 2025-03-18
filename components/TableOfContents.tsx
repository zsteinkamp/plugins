import { HeadingType, PluginMeta } from '@/index'
import Link from 'next/link'
import Image from 'next/image'
import { plugin } from 'postcss'
import { FC } from 'react'
import createHeadingSlug from '@/lib/createHeadingSlug'

export const dynamic = 'force-dynamic'

interface ToCProps {
  pluginData: PluginMeta[]
  className?: string
}

const TableOfContents: FC<ToCProps> = ({ pluginData, className = '' }) => {
  let lastCategory: string
  const headings: HeadingType[] = [
    //{
    //  key: 'recent',
    //  title: 'Recent Updates',
    //  level: 1,
    //  className: 'mb-4',
    //},
  ]
  pluginData.map((plugin: PluginMeta) => {
    if (plugin.category !== lastCategory) {
      headings.push({
        key: plugin.key,
        title: plugin.category,
        level: 1,
      })
      lastCategory = plugin.category
    }

    headings.push({
      key: plugin.key,
      title: plugin.title,
      level: 2,
    })
  })

  headings.push({
    key: 'about',
    href: '/about',
    title: 'About',
    level: 1,
  })

  const lines = headings.map((heading, i) => {
    if (heading.level === 1) {
      return (
        <h4
          key={heading.title}
          className={`text-highlight2 ${i > 1 ? 'mt-2' : ''} ${
            heading.className
          }`}
        >
          <Link href={heading.href || `/#${createHeadingSlug(heading.title)}`}>
            {heading.title}
          </Link>
        </h4>
      )
    }
    return (
      <div
        className={`pl-0 mt-0 whitespace-nowrap ${className}`}
        key={heading.key}
      >
        <a href={`/${heading.key}`} className="hover:text-highlight">
          {heading.title}
        </a>
      </div>
    )
  })
  return lines
}

export default TableOfContents
