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
    <div className="not-prose grid max-w-md my-6">
      <Link
        className="group relative inline-flex items-stretch px-3 py-3 bg-highlight2 !text-white rounded-md shadow-xl ring-1 ring-black/20 border-t border-white/25 border-b-2 border-b-black/30 hover:shadow-[0_20px_50px_-10px_rgba(88,192,210,0.6)] hover:bg-highlight hover:-translate-y-0.5 active:translate-y-0 active:shadow-md transition-all duration-200 no-underline overflow-hidden"
        href={releaseData.assets[0].browser_download_url}
      >
        <span className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.25),transparent_70%)] pointer-events-none" />
        <span className="relative flex items-center justify-center w-14 mr-4 bg-black/25 rounded-md ring-1 ring-black/30 shadow-[inset_0_1px_0_rgba(0,0,0,0.4),inset_0_-1px_0_rgba(255,255,255,0.05)]">
          <svg
            className="w-7 h-7 text-white transition-transform duration-300 group-hover:translate-y-0.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.25"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M12 4v11" />
            <path d="M6 11l6 6 6-6" />
            <path d="M5 20h14" />
          </svg>
        </span>
        <span className="relative flex flex-col justify-center pr-4 py-1">
          <span className="font-heading text-2xl tracking-wide uppercase leading-none text-white">
            Download Latest
          </span>
          <span className="font-heading text-xs uppercase tracking-[0.25em] text-black mt-2">
            {pluginData.release.name}
          </span>
        </span>
      </Link>
      <div className="flex text-xs font-heading uppercase tracking-[0.25em] text-foreground/55 px-1 pt-3">
        <div className="flex-grow">Published {releaseDate}</div>
        <Link
          className="whitespace-nowrap hover:text-highlight2 transition-colors"
          href={pluginData.repo + '/releases'}
        >
          All Releases →
        </Link>
      </div>
    </div>
  )
}
