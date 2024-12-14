import { getPluginData } from "@/lib/dataUtils";
import { categoryZipPath } from "@/lib/downloadUtils";
import { PluginMeta } from "@/types";
import Link from "next/link";
import React from "react";
import ReactMarkdown from "react-markdown";

export const dynamic = 'force-dynamic'

export default function Page() {
  const pluginData: PluginMeta[] = getPluginData()

  let lastCategory: string | null = null

  return pluginData.map((plugin: PluginMeta) => {
    let category = null
    if (lastCategory !== plugin.category) {
      category = <div>
        <h2 className="mb-[-2rem]">{plugin.category}</h2>
        <div className="text-right mt-2">
          <Link href={categoryZipPath(plugin.category)} className="text-pagebg hover:text-pagebg hover:bg-link-hover bg-link-base p-2 rounded">Download .zip</Link>
        </div>
      </div>

      lastCategory = plugin.category
    }
    return (
      <React.Fragment key={plugin.key}>
        {category}
        <div className="border-2">
          <div className='pb-4' key={plugin.link}>
            <div className='flex justify-between items-end'>
              <h3 id={plugin.slug}>
                <Link href={plugin.link} title={plugin.title}>
                  {plugin.title}
                </Link>
              </h3>
              <div>
                <Link href={plugin.link}>More Info</Link>
              </div>
            </div>
            <div>
              <Link href={plugin.link} title={plugin.title}>
                <img alt={plugin.title} src={plugin.image} />
              </Link>
            </div>
            <ReactMarkdown>{plugin.description}</ReactMarkdown>
          </div>
        </div>
      </React.Fragment>
    )
  })
}
