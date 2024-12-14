import { categorySortOrder, getSortedPluginData } from "@/lib/dataUtils";
import { categoryZipPath } from "@/lib/downloadUtils";
import { PluginMeta } from "@/types";
import PluginTile from "@/components/PluginTile";
import Link from "next/link";
import React from "react";

export const dynamic = 'force-dynamic'

export default function Page() {
  const pluginData: PluginMeta[] = getSortedPluginData()

  let lastCategory: string | null = null

  const catObj: Record<string, PluginMeta[]> = {}

  let key = pluginData[0].category
  for (const plugin of pluginData) {
    if (lastCategory !== plugin.category) {
      key = plugin.category
    }
    if (!catObj[key]) {
      catObj[key] = []
    }
    catObj[key].push(plugin)
  }

  const output = []

  for (const category of categorySortOrder) {
    if (catObj[category]) {
      output.push(<div key={category}>
        <div className="flex mb-2 mt-8">
          <h2 className="text-highlight2 grow">{category}</h2>
          <div className="mt-2 mr-8">
            <Link href={categoryZipPath(category)} className="text-background bg-highlight2 hover:bg-highlight p-2 rounded">Download .zip</Link>
          </div>
        </div>
        <div className="flex flex-wrap ml-[-1rem]">{
          catObj[category].map((plugin) => <PluginTile key={plugin.key} plugin={plugin} className="max-w-[32rem] min-w-[24rem] flex-1" />)
        }
        </div>
      </div>
      )
    }
  }

  return (
    <>
      <div className="flex-1 max-w-5xl">
        <div className="">
          <h1 className="text-5xl text-highlight font-heading mb-8"><Link href='/'>Zack's Ableton Live Devices / Plugins</Link></h1>
          <div className="prose lg:prose-xl prose-invert mb-16">
            <p>
              Max For Live is a visual development environment that integrates seamlessly with Ableton Live. This allows people like me to make our own utilities, effects, sound generators, and automation within my digital audio workstation (DAW). I've made many devices for myself in Max for Live, and offer them here for download and collaboratin.</p>

            <img src="https://github.com/zsteinkamp/m4l-Modulation-Lerp/raw/main/images/device.gif" alt="Modulation Lerp in action" />

            <p>
              Check out my <Link href="https://www.youtube.com/playlist?list=PLqzTnRgmRId7rYvoVSoCvCWFgvfc8RcfW">YouTube playlist</Link> for demos and tutorials centered around these devices.
            </p>

            <p>
              You can download .zip bundles of each category, or visit each device's project page to read more and download it there.
            </p>
          </div>
          {output}
        </div>
      </div>
    </>
  )
}