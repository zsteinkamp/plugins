import type { Metadata } from 'next'
import Link from 'next/link'
import PageContents from '@/components/PageContents'
import DocPages from '@/components/DocPages'
import TableOfContents from '@/components/TableOfContents'
import ReleaseTimeline, { TimelineData } from '@/components/ReleaseTimeline'
import { getDataForPlugin, getSortedPluginData } from '@/lib/dataUtils'

export const dynamic = 'force-dynamic'

const PLUGIN = 'm4l-Knobbler4'
// The timeline data is generated into the device repo (docs/timeline.json) from
// the app's release notes + the device's GitHub releases, and refreshes on every
// push. Read it straight from GitHub (CORS/raw) so this page is always current.
const DATA_URL =
  'https://raw.githubusercontent.com/zsteinkamp/m4l-Knobbler4/main/docs/timeline.json'

export async function generateMetadata(): Promise<Metadata> {
  const p = getDataForPlugin(PLUGIN)
  return {
    title: 'Release Timeline' + (p ? ' · ' + p.title : ''),
    description:
      'Every Knobbler app and Max for Live device release on one to-scale timeline, with feature media and full notes.',
    openGraph: p ? { images: p.image } : undefined,
  }
}

async function getData(): Promise<TimelineData | null> {
  try {
    const res = await fetch(DATA_URL, { cache: 'no-store' })
    if (!res.ok) return null
    return (await res.json()) as TimelineData
  } catch {
    return null
  }
}

export default async function Page() {
  const pluginData = getDataForPlugin(PLUGIN)
  const data = await getData()

  return (
    <PageContents
      title={pluginData?.title ?? 'Knobbler'}
      sidebar={
        <>
          <h4 className="font-heading text-highlight mb-8">
            <Link href="/" className="text-highlight2">
              Home
            </Link>
          </h4>
          <h4 className="font-heading text-highlight">
            <Link href={'/' + PLUGIN}>{pluginData?.title ?? 'Knobbler'}</Link>
          </h4>
          <div className="mb-8">
            <DocPages plugin={PLUGIN} />
          </div>
          <h4 className="font-heading text-highlight mt-8 mb-4">Other Plugins</h4>
          <TableOfContents
            pluginData={getSortedPluginData()}
            className="max-h-screen overflow-y-auto"
          />
        </>
      }
    >
      <h2 className="text-highlight font-heading text-3xl mb-2">Release Timeline</h2>
      <p className="text-foreground mb-6 max-w-2xl">
        Every Knobbler release on one timeline, spaced by the real time between them: the
        app down one side, the Max for Live device down the other, and the photos and clips
        from each device release running down the center. Hover or tap any release for its
        full notes.
      </p>
      {data ? (
        <ReleaseTimeline data={data} />
      ) : (
        <p className="text-foreground">
          The timeline data could not be loaded right now. It is generated into the device
          repo and served from GitHub; try again shortly.
        </p>
      )}
    </PageContents>
  )
}
