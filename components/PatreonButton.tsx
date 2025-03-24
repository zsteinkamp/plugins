import Link from 'next/link'
import React from 'react'

export default function PatreonButton() {
  return (
    <Link
      className="bg-black rounded block mr-8 mb-4 hover:text-highlight"
      href="https://patreon.com/ZackSteinkamp?utm_medium=site&utm_source=plugins_toc_link"
    >
      <div className="border-white border-2 p-5 bg-black rounded-xl">
        If you enjoy what I make, please consider{' '}
        <strong>Becoming a Patreon Supporter</strong>
      </div>
    </Link>
  )
}
