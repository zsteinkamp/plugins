import { getDataForPlugin, getReadmePath, getReleases } from "@/lib/dataUtils"
import fs from "node:fs"
import fsp from "node:fs/promises"
import { notFound } from "next/navigation"
import Markdown from "react-markdown"
import remarkGfm from 'remark-gfm'
import { Octokit } from "@octokit/rest"
import Link from "next/link"

const octokit = new Octokit({ auth: process.env['GH_TOKEN'] })

export default async function Page(
  {
    params,
  }: {
    params: Promise<{ plugin: string }>
  }) {
  const plugin = (await params).plugin
  const readmePath = getReadmePath(plugin)

  if (!fs.existsSync(readmePath)) {
    return notFound()
  }

  const pluginData = getDataForPlugin(plugin)
  if (!pluginData) {
    return notFound()
  }
  const releaseData = getReleases(plugin)

  const readmeRaw = await fsp.readFile(readmePath, 'utf-8')

  const renderers = {
    h1: () => null,
    img: ({
      alt,
      src,
      title,
    }: {
      alt?: string;
      src?: string;
      title?: string;
    }) => {
      if (src && src.indexOf('http') !== 0) {
        src = 'https://github.com/zsteinkamp/' + plugin + '/raw/main/' + src
      }
      return (<img
        alt={alt}
        src={src}
        title={title}
      />)
    }
  }

  return (
    <>
      <div className="prose lg:prose-xl prose-invert m-auto">
        <div className="mb-8"><Link href="/">&lt; Home</Link></div>
        <h1 className="text-highlight">{pluginData.title}</h1>
        <div className="flex">
          <Link className="p-2 mr-8 no-underline bg-highlight2 hover:bg-highlight text-background rounded-md" href={releaseData.assets[0].browser_download_url}>Download Latest ({releaseData.tag_name})</Link>
          <Link className="p-2" href={pluginData.link}>GitHub Repo</Link>
        </div>
        <Markdown className="" children={readmeRaw} components={renderers} />
      </div>
    </>
  )
}