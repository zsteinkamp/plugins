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
      <h1 className="text-5xl text-highlight font-heading mb-12 ml-[-2rem] mt-[-2rem] bg-lcdbg p-8 mr-[-2rem] sm:mr-[-4rem]">
        <Link href='/' className="flex gap-4">
          <Image width="60" height="60" src="/favicon-trans.svg" alt="live.dial" className="mt-[-0.5rem]" />
          Zack&apos;s Ableton Live Devices / Plugins
        </Link>
      </h1>
      <div className="sm:mx-8">
        <div className="lg:flex mb-16">
          <div className="prose lg:prose-2xl prose-invert grow">
            <div>
              Check out my <Link href="https://www.youtube.com/playlist?list=PLqzTnRgmRId7rYvoVSoCvCWFgvfc8RcfW">YouTube playlist</Link> for demos and tutorials centered around these devices.
            </div>
            <p>
              You can download .zip bundles of each category, or visit each device&apos;s project page to read more and download it there.
            </p>
          </div>
          <div>
            <img src="/images/external-with-hand.jpg" alt="Modulation Lerp in action" className="not-prose min-w-32 max-w-64 pt-4 lg:pt-0 lg:pl-8 m-auto" />
          </div>
        </div>
        <RecentPlugins num={4} />
        <PluginList />
        <Footer />
      </div>
    </>
  )
}
