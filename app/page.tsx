import PluginList from '@/components/PluginList'
import Link from 'next/link'
import React from 'react'
import RecentPlugins from '@/components/RecentPlugins'
import TableOfContents from '@/components/TableOfContents'
import { getSortedPluginData } from '@/lib/dataUtils'
import { PluginMeta } from '@/index'
import PageContents from '@/components/PageContents'
import StripeButton from '@/components/StripeButton'
import KnobblerPromo from '@/components/KnobblerPromo'

export const dynamic = 'force-dynamic'

export default function Page() {
  const pluginData: PluginMeta[] = getSortedPluginData()
  return (
    <PageContents
      title="Zack's Ableton Live Devices / Plugins"
      sidebar={
        <>
          <TableOfContents
            pluginData={pluginData}
            className="max-h-screen overflow-y-auto"
          />
          <StripeButton className="mt-8" />
        </>
      }
    >
      <>
        <div className="lg:flex mb-16">
          <div className="prose lg:prose-2xl prose-invert grow">
            <div>
              Check out my{' '}
              <Link href="https://www.youtube.com/playlist?list=PLqzTnRgmRId7rYvoVSoCvCWFgvfc8RcfW">
                YouTube playlist
              </Link>{' '}
              for demos and tutorials centered around these devices.
            </div>
            <p>
              You can download .zip bundles of each category with a single
              click, or visit each device&apos;s project page to read more and
              download it there.
            </p>
            <p>All the devices here are free and open source.</p>
            <p>
              Visit the{' '}
              <Link href="https://discord.gg/C5faZe9KXY">
                Zack&apos;s Plugins Discord
              </Link>{' '}
              to chat with me and others about these devices.
            </p>
          </div>
          <div className="pt-4 lg:pt-0 lg:pl-8 m-auto">
            <KnobblerPromo />
          </div>
        </div>
        <RecentPlugins num={4} />
        <PluginList />
      </>
    </PageContents>
  )
}
