import { getDataForPlugin, getReadmePath, getReleases } from "@/lib/dataUtils"
import fs from "node:fs"
import fsp from "node:fs/promises"
import { notFound } from "next/navigation"
import ReactMarkdown from "react-markdown"
import Link from "next/link"
import Footer from "@/components/Footer";
import TimeAgo from "javascript-time-ago"
import en from 'javascript-time-ago/locale/en'
TimeAgo.addDefaultLocale(en)
const timeAgo = new TimeAgo('en-US')

export const dynamic = 'force-dynamic'

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
    a: ({ href, title, children }: { href: string, title: string, children: string }) => {
      if (href && href.indexOf('http') !== 0) {
        href = 'https://github.com/zsteinkamp/' + plugin + '/blob/main/' + href
      }
      return (<a
        href={href}
        title={title}
      >{children}</a>)
    },
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

  let releaseDate
  if (pluginData.releaseDate) {
    releaseDate = timeAgo.format(pluginData.releaseDate)
  }

  return (
    <>
      <div className="m-auto">
        <div className="flex mb-12 ml-[-2rem] mt-[-2rem] bg-lcdbg p-8 mr-[-2rem] sm:mr-[-4rem]">
          <div className="text-xl mt-2 mr-8"><Link href="/">&lt; Home</Link></div>
          <h1 className="text-5xl text-highlight">
            {pluginData.title}
          </h1>
        </div>
      </div>
      <div className="m-auto prose lg:prose-xl prose-invert">
        <div className="flex">
          <Link className="p-2 mr-8 no-underline bg-highlight2 hover:bg-highlight text-background rounded-md shadow-md cursor-pointer" href={releaseData.assets[0].browser_download_url}>Download Latest ({pluginData.release.name})</Link>
          <Link className="p-2 whitespace-nowrap" href={pluginData.release.html_url}>Published {releaseDate}</Link>
        </div>
        <ReactMarkdown className="prose-headings:text-highlight" components={renderers}>{readmeRaw}</ReactMarkdown>
        <h2 className="text-highlight">Source Code</h2>
        <Link className="p-2" href={pluginData.link}>GitHub Repo</Link>
      </div>
      <div className="max-w-[52rem] m-auto">
        <Footer />
      </div>
    </>
  )
}