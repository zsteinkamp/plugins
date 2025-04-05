import {
  getDataForPlugin,
  getDocsPath,
  getReadmePath,
  getSortedPluginData,
} from '@/lib/dataUtils'
import fs from 'node:fs'
import fsp from 'node:fs/promises'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import Link from 'next/link'
import HeadingIndex from '@/components/HeadingIndex'
import { HeadingType } from '@/index'
import React, { ReactNode } from 'react'
import DocPages from '@/components/DocPages'
import DownloadButton from '@/components/DownloadButton'
import rehypeRaw from 'rehype-raw'
import TableOfContents from '@/components/TableOfContents'
import { Metadata } from 'next'
import PageContents from '@/components/PageContents'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>
}): Promise<Metadata> {
  const plugin = (await params).slug[0]
  const pluginData = getDataForPlugin(plugin)
  if (pluginData) {
    return {
      title: pluginData.title,
      description: pluginData.description,
      openGraph: {
        images: pluginData.image,
      },
    }
  }
  return {}
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string[] }>
}) {
  const slug = (await params).slug
  const plugin = slug.shift()
  if (!plugin) {
    return <h1>Error</h1>
  }
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
  let rawMarkdown = null
  let usedDocs = false
  if (fs.existsSync(docsPath)) {
    // lets just start with index
    rawMarkdown = await fsp.readFile(docsPath, 'utf-8')
    usedDocs = true
  } else {
    rawMarkdown = await fsp.readFile(readmePath, 'utf-8')
  }

  const toc: HeadingType[] = []
  const addToTOC = ({
    children,
    ...props
  }: {
    children: ReactNode
    node: HTMLElement
  }) => {
    const level = Number(props.node.tagName.match(/h(\d)/)?.slice(1))
    if (level && children) {
      const id = children
        .toString()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
      toc.push({
        level,
        key: id,
        title: children as string,
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
    code: ({ children }: { children: string }) => {
      return <code className="not-prose bg-lcdbg p-2 rounded">{children}</code>
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

  return (
    <PageContents
      title={pluginData.title}
      sidebar={
        <>
          <h4 className="font-heading text-highlight mb-8">
            <Link href="/" className="text-highlight2">
              &lt; Home
            </Link>
          </h4>
          {usedDocs && (
            <>
              <h4 className="font-heading text-highlight">
                <Link href={'/' + pluginData.key}>{pluginData.title}</Link>
              </h4>
              <div className="mb-8">
                <DocPages plugin={plugin} />
              </div>
            </>
          )}
          <HeadingIndex headings={toc} />
          <h4 className="font-heading text-highlight mt-8 mb-4">
            Other Plugins
          </h4>
          <TableOfContents
            pluginData={getSortedPluginData()}
            className="max-h-screen overflow-y-auto"
          />
        </>
      }
    >
      <div className="m-auto prose lg:prose-xl prose-invert px-8">
        <div className="flex flex-row">
          <div className="flex-grow">
            <DownloadButton plugin={plugin} />
            <ReactMarkdown
              className="prose-headings:text-highlight"
              components={renderers}
              rehypePlugins={[rehypeRaw]}
            >
              {rawMarkdown}
            </ReactMarkdown>
            <DownloadButton plugin={plugin} />
          </div>
        </div>
      </div>
    </PageContents>
  )
}

/*

      <div className="nav-outer bg-tilebg top-0 right-0 min-w-[12rem] sm:min-w-[16rem] absolute sm:relative sm:block ml-0 shadow-2xl">
        <input
          type="checkbox"
          id="nav-trigger"
          className="nav-trigger hidden"
        />
        <label
          htmlFor="nav-trigger"
          className="absolute top-8 right-8 z-20 block cursor-pointer sm:hidden"
        >
          <span className="menu-icon border-1 center block h-11 w-11 rounded-lg border-2 border-highlight2 pl-2 pt-2">
            <svg
              viewBox="0 0 18 15"
              width="1.5rem"
              height="1.5rem"
              className="fill-highlight2"
            >
              <path d="M18,1.484c0,0.82-0.665,1.484-1.484,1.484H1.484C0.665,2.969,0,2.304,0,1.484l0,0C0,0.665,0.665,0,1.484,0 h15.032C17.335,0,18,0.665,18,1.484L18,1.484z M18,7.516C18,8.335,17.335,9,16.516,9H1.484C0.665,9,0,8.335,0,7.516l0,0 c0-0.82,0.665-1.484,1.484-1.484h15.032C17.335,6.031,18,6.696,18,7.516L18,7.516z M18,13.516C18,14.335,17.335,15,16.516,15H1.484 C0.665,15,0,14.335,0,13.516l0,0c0-0.82,0.665-1.483,1.484-1.483h15.032C17.335,12.031,18,12.695,18,13.516L18,13.516z" />
            </svg>
          </span>
        </label>
        <div
          className={
            'nav-content bg-tilebg p-8 top-16 sm:top-0 fixed max-h-[calc(100vh)] max-w-[16rem] overflow-y-auto overflow-x-hidden'
          }
        >
          */
