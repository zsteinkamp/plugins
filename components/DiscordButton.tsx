import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { PluginMeta } from '..'

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
        <Link className="p" href={'https://discord.gg/C5faZe9KXY'}>
          <div className="text-xl">
            <Image
              src="/images/discord.svg"
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
