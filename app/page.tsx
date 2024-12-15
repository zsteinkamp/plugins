import { categorySortOrder, getSortedPluginData } from "@/lib/dataUtils";
import { categoryZipPath } from "@/lib/downloadUtils";
import { PluginMeta } from "@/types";
import PluginTile from "@/components/PluginTile";
import Link from "next/link";
import Image from "next/image";
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
        <div className="flex mb-8 mt-16">
          <h2 className="text-highlight2 grow">{category}</h2>
          <div className="mt-2">
            <Link href={categoryZipPath(category)} className="text-background bg-highlight2 hover:bg-highlight p-2 rounded">Download .zip</Link>
          </div>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(20rem,_1fr))] mx-[-1rem] gap-8">{
          catObj[category].map((plugin) => <PluginTile key={plugin.key} plugin={plugin} className="min-w-[20rem] max-w-[40rem]" />)
        }
        </div>
      </div>
      )
    }
  }

  return (
    <>
      <h1 className="text-5xl text-highlight font-heading mb-8">
        <Link href='/' className="flex gap-4">
          <Image width="60" height="60" src="/favicon-trans.svg" alt="live.dial" className="mt-[-0.5rem]" />
          Zack&apos;s Ableton Live Devices / Plugins
        </Link>
      </h1>
      <div className="prose lg:prose-xl prose-invert mb-16">
        <img src="https://github.com/zsteinkamp/m4l-Knobbler4/raw/main/images/external-with-hand.jpg" alt="Modulation Lerp in action" className="not-prose max-h-64 float-right pl-8" />
        <p>
          Max For Live is a visual development environment that integrates seamlessly with Ableton Live. This allows people like me to make our own utilities, effects, sound generators, and automation within my digital audio workstation (DAW). I&apos;ve made many devices for myself in Max for Live, and offer them here for download and collaboration.
        </p>
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
