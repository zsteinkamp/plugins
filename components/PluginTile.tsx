import { PluginMeta } from '@/index'
import Link from 'next/link'
import { FC } from 'react'
import ReactMarkdown from 'react-markdown'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
TimeAgo.addDefaultLocale(en)
const timeAgo = new TimeAgo('en-US')

interface TileProps {
  plugin: PluginMeta
  mode?: 'full' | 'mini'
  className?: string
}

const PluginTile: FC<TileProps> = ({
  plugin,
  mode = 'full',
  className = '',
}) => {
  let releaseDate = null
  if (plugin.releaseDate) {
    try {
      releaseDate = timeAgo.format(plugin.releaseDate)
    } catch (_) {}
  }

  return (
    <Link
      href={'/' + plugin.key}
      key={plugin.key}
      className={` rounded-lg bg-tilebg border-2 border-tilebg hover:border-bghighlight ${className}`}
    >
      <div className="p-6" key={plugin.repo}>
        <div className="flex justify-between items-end">
          <h3 className="text-highlight" id={plugin.key}>
            {plugin.title}
          </h3>
        </div>
        <div className="flex">
          <div className="text-highlight2 grow">{plugin.release.name} </div>
        </div>
        <div className="whitespace-nowrap">{releaseDate}</div>
        {mode === 'full' ? (
          <>
            <div className="my-4">
              <img
                alt={plugin.title}
                src={plugin.image}
                className="max-h-64 m-auto"
              />
            </div>
            <ReactMarkdown className="prose prose-invert">
              {plugin.description}
            </ReactMarkdown>
          </>
        ) : null}
      </div>
    </Link>
  )
}
export default PluginTile
