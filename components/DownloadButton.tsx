import Link from 'next/link'
import React from 'react'
import { getDataForPlugin, getReleases } from '@/lib/dataUtils'
import en from 'javascript-time-ago/locale/en'
import TimeAgo from 'javascript-time-ago'
TimeAgo.addDefaultLocale(en)
const timeAgo = new TimeAgo('en-US')

export default function DownloadButton({ plugin }: { plugin: string }) {
  const releaseData = getReleases(plugin)
  const pluginData = getDataForPlugin(plugin)

  if (!pluginData) {
    return null
  }

  let releaseDate
  if (pluginData.releaseDate) {
    releaseDate = timeAgo.format(pluginData.releaseDate)
  }

  return (
    <div className="flex">
      <Link
        className="p-2 mr-8 no-underline bg-highlight2 hover:bg-highlight text-background rounded-md shadow-md"
        href={releaseData.assets[0].browser_download_url}
      >
        <div className="text-2xl font-bold">Download Latest</div>
        <div className="text-sm">{pluginData.release.name}</div>
      </Link>
      <Link
        className="p-2 whitespace-nowrap"
        href={pluginData.release.html_url}
      >
        Published {releaseDate}
      </Link>
    </div>
  )
}
