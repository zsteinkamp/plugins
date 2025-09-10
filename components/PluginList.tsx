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
        <div key={category}>
          <div className="flex mb-8 mt-16">
            <h2
              id={createHeadingSlug(category)}
              className="text-highlight2 grow"
            >
              {category}
            </h2>
            <div className="mt-4">
              <Link
                href={categoryZipPath(category)}
                className="text-background bg-highlight2 hover:bg-highlight p-2 rounded shadow-md shadow-md border-t-2 border-t-white/20 border-b-2 border-b-black/20"
              >
                Download .zip
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(20rem,_1fr))] gap-8">
            {catObj[category].map((plugin) => {
              return (
                <PluginTile
                  key={plugin.key}
                  plugin={plugin}
                  className="min-w-[20rem] max-w-[40rem] shadow-md"
                />
              )
            })}
          </div>
        </div>
      )
    }
  }
  return tileSections
}
