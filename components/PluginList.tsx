import { categorySortOrder, getSortedPluginData } from '@/lib/dataUtils'
import PluginTile from '@/components/PluginTile'
import { PluginMeta } from '@/index'
import { categoryZipPath } from '@/lib/downloadUtils'
import Link from 'next/link'
import createHeadingSlug from '@/lib/createHeadingSlug'

export default function PluginList() {
  const pluginData: PluginMeta[] = getSortedPluginData()

  const catObj: Record<string, PluginMeta[]> = {}

  for (const plugin of pluginData) {
    if (!catObj[plugin.category]) {
      catObj[plugin.category] = []
    }
    catObj[plugin.category].push(plugin)
  }

  const tileSections = []

  for (const category of categorySortOrder) {
    if (catObj[category]) {
      tileSections.push(
        <div key={category} className="mt-24 sm:mt-32">
          <div className="relative flex flex-wrap items-end justify-between gap-6 mb-12">
            <div className="relative">
              <span className="block font-heading uppercase tracking-[0.4em] text-highlight2/60 text-xs sm:text-sm mb-2">
                Category
              </span>
              <h2
                id={createHeadingSlug(category)}
                className="text-highlight2 leading-[0.9] text-6xl sm:text-7xl lg:text-8xl"
              >
                {category}
              </h2>
              <span className="absolute -left-6 top-1/2 hidden sm:block h-[80%] w-1 -translate-y-1/2 bg-highlight2/40 rounded-full" />
            </div>
            <Link
              href={categoryZipPath(category)}
              className="inline-flex items-center gap-2 px-5 py-3 border border-highlight2/60 text-highlight2 font-heading text-sm uppercase tracking-[0.25em] rounded-sm hover:bg-highlight2 hover:text-lcdbg hover:border-highlight2 transition-colors"
            >
              ↓ Bundle .zip
            </Link>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(20rem,_1fr))] gap-8">
            {catObj[category].map((plugin) => {
              return (
                <PluginTile
                  key={plugin.key}
                  plugin={plugin}
                  className="min-w-[20rem] max-w-[40rem]"
                />
              )
            })}
          </div>
        </div>,
      )
    }
  }
  return tileSections
}
