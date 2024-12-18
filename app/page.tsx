import PluginList from '@/components/PluginList'
import Link from "next/link";
import Image from "next/image";
import React from "react";
import Footer from "@/components/Footer";
import RecentPlugins from '@/components/RecentPlugins';

export const dynamic = 'force-dynamic'

export default function Page() {
  return (
    <>
      <h1 className="text-5xl text-highlight font-heading mb-8">
        <Link href='/' className="flex gap-4">
          <Image width="60" height="60" src="/favicon-trans.svg" alt="live.dial" className="mt-[-0.5rem]" />
          Zack&apos;s Ableton Live Devices / Plugins
        </Link>
      </h1>
      <div className="prose lg:prose-2xl prose-invert mb-16">
        <img src="/images/external-with-hand.jpg" alt="Modulation Lerp in action" className="not-prose max-h-64 lg:float-right pl-8" />
        <p>
          Check out my <Link href="https://www.youtube.com/playlist?list=PLqzTnRgmRId7rYvoVSoCvCWFgvfc8RcfW">YouTube playlist</Link> for demos and tutorials centered around these devices.
        </p>
        <p>
          You can download .zip bundles of each category, or visit each device&apos;s project page to read more and download it there.
        </p>
      </div>
      <RecentPlugins num={4} />
      <PluginList />
      <Footer />
    </>
  )
}
