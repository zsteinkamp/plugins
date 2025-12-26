import Link from 'next/link'
import React, { HTMLAttributes } from 'react'
import { getDataForPlugin, getReleases } from '@/lib/dataUtils'
import en from 'javascript-time-ago/locale/en'
import TimeAgo from 'javascript-time-ago'
import { PluginMeta } from '..'
TimeAgo.addDefaultLocale(en)
const timeAgo = new TimeAgo('en-US')

export default function DiscordButton({
  pluginData,
  className,
}: {
  pluginData: PluginMeta
  className: string | undefined
}) {
  if (!pluginData || !pluginData.discordUrl) {
    return null
  }

  return (
    <div className={className}>
      <div className="grid max-w-96">
        <Link className="p" href={pluginData.discordUrl}>
          <div className="text-xl">
            <img
              src="images/discord.svg"
              className="inline mr-2"
              width={30}
              height={30}
              alt="Discord Icon"
            />
            Visit #{pluginData.discordChannel} on Discord
          </div>
        </Link>
      </div>
    </div>
  )
}
