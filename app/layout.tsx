import type { Metadata } from 'next'
import './globals.css'
import { GoogleAnalytics } from '@next/third-parties/google'
import Mono from '@/components/Mono'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  // Relative og:image paths (e.g. /cache/...) are resolved against this origin.
  // Override via SITE_URL when the deployed domain differs.
  metadataBase: new URL(process.env.SITE_URL || 'https://plugins.steinkamp.us'),
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
        <div className="bgFace" aria-hidden="true">
          <Mono />
        </div>
        <div className="flex min-h-screen">{children}</div>
      </body>
      <GoogleAnalytics
        gaId={'G-6TVGS1WVZ7'}
        debugMode={process.env.NODE_ENV === 'development'}
      />
    </html>
  )
}
