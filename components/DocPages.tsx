import React from 'react'
import fs from 'fs'
import Link from 'next/link'
import path from 'path'

type DocPagesProps = {
  plugin: string
}

function toTitleCase(str: string) {
  return str.replace(
    /\w\S*/g,
    (text) => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
  )
}

export default async function DocPages({ plugin }: DocPagesProps) {
  const markdownFiles: string[] = []

  const entries = await fs.promises.readdir('/cache/' + plugin + '/docs', {
    recursive: true,
  })

  entries.sort((a, b) =>
    a.toLocaleLowerCase() > b.toLocaleLowerCase() ? 1 : -1
  )

  // put index on top
  entries.forEach((e) => {
    if (e.match(/\.md$/)) {
      if (e.match(/index\.md$/)) {
        markdownFiles.unshift(e)
      } else {
        markdownFiles.push(e)
      }
    }
  })

  return markdownFiles.map((fName) => {
    let dispname = fName.replace(/\.md$/, '')
    if (dispname === 'index') {
      dispname = 'Main'
    }
    return (
      <div key={fName}>
        <Link href={path.join('/', plugin, fName)}>
          {toTitleCase(dispname)}
        </Link>
      </div>
    )
  })
}
