import {
  getDataForPlugin,
  getDocsPath,
  getReadmePath,
  getReleases,
} from '@/lib/dataUtils'
import fs from 'node:fs'
import fsp from 'node:fs/promises'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import Link from 'next/link'
import Footer from '@/components/Footer'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import HeadingIndex from '@/components/HeadingIndex'
import { HeadingType } from '@/index'
import React from 'react'
import DocPages from '@/components/DocPages'
TimeAgo.addDefaultLocale(en)
const timeAgo = new TimeAgo('en-US')

export const dynamic = 'force-dynamic'

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string[] }>
}) {
  const slug = (await params).slug
  const plugin = slug.shift() || ''
  const docsUri = slug.join('/')
  const readmePath = getReadmePath(plugin)
  const docsPath = getDocsPath(plugin, docsUri)

  if (!fs.existsSync(docsPath) && !fs.existsSync(readmePath)) {
    return notFound()
  }

  const pluginData = getDataForPlugin(plugin)
  if (!pluginData) {
    return notFound()
  }
  const releaseData = getReleases(plugin)

  let rawMarkdown = null
  let usedDocs = false
  let markdownFiles: string[] = []
  if (fs.existsSync(docsPath)) {
    // lets just start with index
    rawMarkdown = await fsp.readFile(docsPath, 'utf-8')

    usedDocs = true

    const entries = await fs.promises.readdir('/cache/' + plugin + '/docs', {
      recursive: true,
    })

    entries.forEach((e) => {
      if (e.match(/\.md$/)) {
        if (e.match(/index\.md$/)) {
          markdownFiles.unshift(e)
        } else {
          markdownFiles.push(e)
        }
      }
    })
    console.log(markdownFiles)
  } else {
    rawMarkdown = await fsp.readFile(readmePath, 'utf-8')
  }

  const toc: HeadingType[] = []
  const addToTOC = ({ children, ...props }: React.PropsWithChildren<any>) => {
    const level = Number(props.node.tagName.match(/h(\d)/)?.slice(1))
    if (level && children) {
      const id = children
        .toString()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
      toc.push({
        level,
        key: id,
        title: children,
      })
      return React.createElement(props.node.tagName, { id }, children)
    } else {
      return React.createElement(props.node.tagName, props, children)
    }
  }

  const renderers = {
    h1: () => null,
    h2: addToTOC,
    h3: addToTOC,
    h4: addToTOC,
    h5: addToTOC,
    h6: addToTOC,
    a: ({
      href,
      title,
      children,
    }: {
      href: string
      title: string
      children: string
    }) => {
      if (href && href.indexOf('http') !== 0) {
        href = '/' + plugin + '/' + href
      }
      return (
        <a href={href} title={title}>
          {children}
        </a>
      )
    },
    img: ({
      alt,
      src,
      title,
    }: {
      alt?: string
      src?: string
      title?: string
    }) => {
      if (!src) {
        return null
      }
      if (src && src.indexOf('http') !== 0) {
        src = '/cache/' + plugin + (usedDocs ? '/docs/' : '/') + src
      }
      return (
        <img className={'markdown-image'} alt={alt} src={src} title={title} />
      )
    },
  }

  let releaseDate
  if (pluginData.releaseDate) {
    releaseDate = timeAgo.format(pluginData.releaseDate)
  }

  return (
    <>
      <div className="flex-1 max-w-5xl p-8">
        <div className="m-auto">
          <div className="flex mb-12 ml-[-2rem] mt-[-2rem] bg-lcdbg p-8 mr-[-2rem] sm:mr-[-4rem]">
            <div className="text-xl mt-2 mr-8">
              <Link href="/">&lt; Home</Link>
            </div>
            <h1 className="text-5xl text-highlight">{pluginData.title}</h1>
          </div>
        </div>
        <div className="m-auto prose lg:prose-xl prose-invert">
          <div className="flex flex-row">
            <div className="flex-grow">
              <div className="flex">
                <Link
                  className="p-2 mr-8 no-underline bg-highlight2 hover:bg-highlight text-background rounded-md shadow-md"
                  href={releaseData.assets[0].browser_download_url}
                >
                  <div className="text-2xl font-bold">Download Latest</div>
                  <div className="text-sm">{pluginData.release.name}</div>
                </Link>
                <Link
                  className="p-2 whitespace-nowrap"
                  href={pluginData.release.html_url}
                >
                  Published {releaseDate}
                </Link>
              </div>
              <ReactMarkdown
                className="prose-headings:text-highlight"
                components={renderers}
              >
                {rawMarkdown}
              </ReactMarkdown>
            </div>
          </div>
        </div>
        <div className="max-w-[52rem] m-auto">
          <Footer />
        </div>
      </div>
      <div className="hidden sm:block min-w-[16rem] ml-0 bg-tilebg p-8 shadow-2xl">
        <div
          className={
            'fixed max-h-[calc(100vh-4rem)] max-w-[13rem] overflow-y-auto overflow-x-hidden'
          }
        >
          {usedDocs && (
            <>
              <h4 className="font-heading text-highlight">Pages</h4>
              <div className="mb-8">
                <DocPages plugin={plugin} />
              </div>
            </>
          )}
          <HeadingIndex
            headings={toc}
            className="max-h-screen overflow-y-auto"
          />
        </div>
      </div>
    </>
  )
}
