import { PluginMeta } from "@/types"
import Link from "next/link"
import { FC } from "react"
import ReactMarkdown from "react-markdown"

interface TileProps {
  plugin: PluginMeta
  className?: string
}

const PluginTile: FC<TileProps> = ({
  plugin,
  className = '',
}) => {
  return (
    <Link href={"/" + plugin.key} key={plugin.key} className={` rounded-lg hover:bg-bghighlight ${className}`}>
      <div className='p-4' key={plugin.link}>
        <div className='flex justify-between items-end'>
          <h3 className="text-highlight" id={plugin.key}>
            {plugin.title}
          </h3>
        </div>
        <div>
          <img alt={plugin.title} src={plugin.image} className="max-h-64" />
        </div>
        <ReactMarkdown className="prose prose-invert">{plugin.description}</ReactMarkdown>
      </div>
    </Link>
  )
}
export default PluginTile