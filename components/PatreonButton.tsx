import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

export default function PatreonButton() {
  return (
    <Link
      className="bg-black rounded block mb-4 hover:text-highlight"
      href="https://patreon.com/ZackSteinkamp?utm_medium=site&utm_source=plugins_toc_link"
    >
      <div className="border-white border-2 p-4 bg-black rounded-xl">
        If you enjoy my work, please consider supporting me on
        <Image
          className="mt-2"
          src="/images/patreon.svg"
          alt="Patreon Logo"
          width="300"
          height="100"
        />
      </div>
    </Link>
  )
}
