import React from 'react'
import yaml from 'js-yaml'
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

type TocEntry = {
  fname: string
  title: string
}

export default async function DocPages({ plugin }: DocPagesProps) {
  let tocEntries: TocEntry[] = []

  const tocYamlFname = path.join('/cache', plugin, 'docs', 'toc.yml')
  if (fs.existsSync(tocYamlFname)) {
    tocEntries = yaml.load(fs.readFileSync(tocYamlFname, 'utf8')) as TocEntry[]
  } else {
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
          //markdownFiles.unshift(e)
        } else {
          let dispname = e.replace(/\.md$/, '')
          if (dispname === 'index') {
            dispname = 'Main'
          }
          tocEntries.push({
            fname: e,
            title: toTitleCase(dispname),
          })
        }
      }
    })
  }

  return tocEntries.map((entry, i) => {
    if (entry.fname === '__sep__') {
      return (
        <div key={i}>
          <hr className="my-4 border-highlight2" />
        </div>
      )
    }
    return (
      <div key={entry.fname}>
        <Link
          className="hover:text-highlight"
          href={path.join('/', plugin, entry.fname.replace(/\.md$/, ''))}
        >
          {entry.title}
        </Link>
      </div>
    )
  })
}
