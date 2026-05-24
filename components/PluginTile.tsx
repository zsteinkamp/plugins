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
    } catch {}
  }

  return (
    <Link
      href={'/' + plugin.key}
      key={plugin.key}
      className={`group relative flex flex-col rounded-xl bg-tilebg ring-1 ring-bghighlight/40 hover:ring-highlight2 shadow-lg hover:shadow-[0_20px_60px_-15px_rgba(88,192,210,0.45)] hover:-translate-y-1 transition-all duration-300 overflow-hidden ${className}`}
    >
      {/* Glow accent on top edge */}
      <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-highlight2/0 to-transparent group-hover:via-highlight2 transition-colors duration-500" />

      {mode === 'full' ? (
        <div className="relative aspect-[16/10] bg-gradient-to-br from-lcdbg via-tilebg to-lcdbg overflow-hidden">
          {/* Subtle radial spotlight that brightens on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_50%_30%,rgba(88,192,210,0.18),transparent_60%)]" />
          <img
            alt={plugin.title}
            src={plugin.image}
            className="absolute inset-0 w-full h-full object-contain p-6 transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-tilebg via-tilebg/60 to-transparent pointer-events-none" />
          {/* Category badge */}
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center px-2.5 py-1 text-[10px] font-heading uppercase tracking-[0.25em] text-highlight2 bg-black/40 backdrop-blur-sm rounded-sm ring-1 ring-highlight2/30">
              {plugin.category}
            </span>
          </div>
        </div>
      ) : null}

      <div className="relative p-6 flex flex-col gap-4">
        <div>
          <h3
            className="text-highlight font-heading text-4xl sm:text-5xl leading-[0.95] group-hover:text-highlight2 transition-colors duration-300"
            id={plugin.key}
          >
            {plugin.title}
          </h3>
          <div className="mt-3 flex items-center gap-3 text-sm text-foreground/55">
            <span className="text-highlight2 truncate">
              {plugin.release.name}
            </span>
            {releaseDate ? (
              <>
                <span className="text-foreground/25">·</span>
                <span className="whitespace-nowrap">{releaseDate}</span>
              </>
            ) : null}
          </div>
        </div>
        {mode === 'full' ? (
          <ReactMarkdown className="prose prose-invert prose-sm max-w-none text-foreground/80">
            {plugin.description}
          </ReactMarkdown>
        ) : null}
        {mode === 'full' ? (
          <div className="flex items-center gap-2 text-sm font-heading uppercase tracking-[0.25em] text-foreground/40 group-hover:text-highlight transition-colors">
            <span>Open</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </div>
        ) : null}
      </div>
    </Link>
  )
}
export default PluginTile
