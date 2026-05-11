import type { Metadata } from 'next'
import KnobblerSite from '@/components/KnobblerSite'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Knobbler — The Best Control Surface for Ableton Live',
  description:
    'Knobbler turns your iPad, iPhone, or Android device into a responsive, color-aware control surface for Ableton Live.',
}

export default function KnobblerPage() {
  return <KnobblerSite />
}
