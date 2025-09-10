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
import StripeButton from '@/components/StripeButton'

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
          <StripeButton className="mb-8" />
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
            <div className="mt-8">
              <em>
                If you enjoy using my free and open source devices, please
                consider supporting future work with a financial contribution.
                Thanks! :)
              </em>
              <StripeButton className="mt-8" />
            </div>
          </div>
        </div>
      </div>
    </PageContents>
  )
}
