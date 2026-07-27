import type { Metadata } from 'next'
import KnobblerSite from '@/components/KnobblerSite'
import { getDataForPlugin } from '@/lib/dataUtils'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const pluginData = getDataForPlugin('m4l-Knobbler4')
  if (!pluginData) return {}
  return {
    title: pluginData.title,
    description: pluginData.description,
    openGraph: {
      images: pluginData.image,
    },
  }
}

export default function Page() {
  return <KnobblerSite />
}
