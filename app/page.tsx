import PluginList from '@/components/PluginList'
import Link from 'next/link'
import React from 'react'
import RecentPlugins from '@/components/RecentPlugins'
import TableOfContents from '@/components/TableOfContents'
import { getSortedPluginData } from '@/lib/dataUtils'
import { PluginMeta } from '@/index'
import PageContents from '@/components/PageContents'
import StripeButton from '@/components/StripeButton'

export const dynamic = 'force-dynamic'

export default function Page() {
  const pluginData: PluginMeta[] = getSortedPluginData()
  return (
    <PageContents
      title="Zack's Ableton Live Devices / Plugins"
      sidebar={
        <>
          <StripeButton className="mb-8" />
          <TableOfContents
            pluginData={pluginData}
            className="max-h-screen overflow-y-auto"
          />
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
          </div>
          <div>
            <img
              src="/images/external-with-hand.jpg"
              alt="Modulation Lerp in action"
              className="not-prose min-w-32 max-w-64 pt-4 lg:pt-0 lg:pl-8 m-auto"
            />
          </div>
        </div>
        <RecentPlugins num={4} />
        <PluginList />
      </>
    </PageContents>
  )
}
