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
        <div className="p-16 border-white border-4 mb-16 bg-black">
          <h3 className="text-highlight">
            Free Max for Live Workshop Sunday Oct 26 @ 11a PT
          </h3>
          <p className="my-8">
            This Sunday October 26th at 11a-1p PT (8p-10p CEST), I&apos;ll be
            chatting with the one and only @SideBrain about Max for Live
            development, demo many of my open source M4L devices, and we&apos;ll
            have a Knobbler Lifetime license giveaway. Register for the free
            workshop here:{' '}
            <a className="text-highlight2" href="https://shorturl.at/90AUZ">
              https://shorturl.at/90AUZ
            </a>
          </p>
          <p>Bring your questions and ideas! I hope to see you there :)</p>
        </div>
        <RecentPlugins num={4} />
        <PluginList />
      </>
    </PageContents>
  )
}
