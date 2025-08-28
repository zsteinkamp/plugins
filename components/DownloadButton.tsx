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
    <div className="grid max-w-96">
      <Link
        className="p-2 no-underline bg-highlight2 hover:bg-highlight text-background rounded-md shadow-md"
        href={releaseData.assets[0].browser_download_url}
      >
        <div className="text-2xl font-bold text-white uppercase">
          Download Latest
        </div>
        <div className="text-sm text-background">{pluginData.release.name}</div>
      </Link>
      <div className="flex text-sm p-2">
        <div className="flex-grow">Published {releaseDate}</div>
        <Link
          className="whitespace-nowrap"
          href={pluginData.repo + '/releases'}
        >
          View All Releases
        </Link>
      </div>
    </div>
  )
}
