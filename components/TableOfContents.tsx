import { HeadingType, PluginMeta } from "@/types"
import { plugin } from "postcss"
import { FC } from "react"

export const dynamic = 'force-dynamic'


interface ToCProps {
  pluginData: PluginMeta[]
  className?: string
}

const TableOfContents: FC<ToCProps> = ({
  pluginData,
  className = '',
}) => {
  let lastCategory: string
  const headings: HeadingType[] = []
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

  const lines = headings.map((heading, i) => {
    if (heading.level === 1) {
      return (<h4
        key={heading.title}
        className={`text-highlight2 ${i > 1 ? "mt-2" : ""}`}>{heading.title}</h4>
      )
    }
    return (
      <div
        className="pl-0 mt-0 whitespace-nowrap"
        key={plugin.key}
      >
        <a
          href={`/${heading.key}`}
          className="hover:text-highlight"
        >
          {heading.title}
        </a>
      </div>
    )
  })
  return lines
}

export default TableOfContents