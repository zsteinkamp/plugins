import { categorySortOrder, getSortedPluginData } from "@/lib/dataUtils";
import { categoryZipPath } from "@/lib/downloadUtils";
import { PluginMeta } from "@/types";
import PluginTile from "@/components/PluginTile";
import Link from "next/link";
import React from "react";

export const dynamic = 'force-dynamic'

export default function Page() {
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
      tileSections.push(<div key={category}>
        <div className="flex mb-4 mt-12">
          <h2 className="text-highlight2 grow">{category}</h2>
          <div className="mt-2">
            <Link href={categoryZipPath(category)} className="text-background bg-highlight2 hover:bg-highlight p-2 rounded">Download .zip</Link>
          </div>
        </div>
        <div className="flex flex-wrap mx-[-1rem] gap-8">{
          catObj[category].map((plugin) => <PluginTile key={plugin.key} plugin={plugin} className="max-w-[32rem] min-w-80 sm:min-w-96 flex-1" />)
        }
        </div>
      </div>
      )
    }
  }

  return (
    <>
      <h1 className="text-5xl text-highlight font-heading mb-8"><Link href='/'>Zack&apos;s Ableton Live Devices / Plugins</Link></h1>
      <div className="prose lg:prose-xl prose-invert mb-16">
        <p>
          Max For Live is a visual development environment that integrates seamlessly with Ableton Live. This allows people like me to make our own utilities, effects, sound generators, and automation within my digital audio workstation (DAW). I&apos;ve made many devices for myself in Max for Live, and offer them here for download and collaboration.</p>

        <img src="https://github.com/zsteinkamp/m4l-Modulation-Lerp/raw/main/images/device.gif" alt="Modulation Lerp in action" />

        <p>
          Check out my <Link href="https://www.youtube.com/playlist?list=PLqzTnRgmRId7rYvoVSoCvCWFgvfc8RcfW">YouTube playlist</Link> for demos and tutorials centered around these devices.
        </p>

        <p>
          You can download .zip bundles of each category, or visit each device&apos;s project page to read more and download it there.
        </p>
      </div>
      {tileSections}
    </>
  )
}
