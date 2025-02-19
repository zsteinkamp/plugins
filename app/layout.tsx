import { getSortedPluginData } from '@/lib/dataUtils'
import { PluginMeta } from '@/index'
import type { Metadata } from 'next'
import './globals.css'
import TableOfContents from '@/components/TableOfContents'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: "Zack's Plugins",
  description: 'Plugins / Devices for Ableton Live by Zack Steinkamp',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-pt-6">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/tek5ypq.css" />
      </head>
      <body>
        <div className="flex min-h-screen">{children}</div>
      </body>
    </html>
  )
}
