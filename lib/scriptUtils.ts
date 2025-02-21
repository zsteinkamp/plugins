import fs from 'fs'
import { Octokit, RestEndpointMethodTypes } from '@octokit/rest'
import AdmZip from 'adm-zip'
import path from 'path'
import { PluginMeta } from '@/index'
import { execSync } from 'node:child_process'

export type CategoryZipType = Record<string, AdmZip>
const octokit = new Octokit({ auth: process.env['GH_TOKEN'] })

const CACHE_ROOT = '/cache'

export type ReleaseType = {
  assets: Record<string, string>[]
}
export type PluginType = {
  category: string
}

export const cloneOrPullRepo = async (plugin: PluginMeta, repo: string) => {
  const dirname = path.join(CACHE_ROOT, repo)
  if (!fs.existsSync(dirname)) {
    execSync(`git -C /cache clone --depth 1 "${plugin.repo}" ${repo}`)
  } else {
    execSync(`git -C /cache/${repo} pull`)
  }
}

export const getLatestRelease = async (owner: string, repo: string) => {
  const { data } = await octokit.rest.repos.listReleases({ owner, repo })
  const release = data[0]
  if (!release) {
    console.error(`ERROR: No release for ${repo}`)
    return
  }
  return release
}

export const writeReleaseJSON = (repo: string, release: unknown) => {
  const fname = path.join(CACHE_ROOT, repo, 'release.json')
  fs.writeFileSync(fname, JSON.stringify(release))
  console.info(`wrote ${fname}`)
}

export const addToCategoryZip = async (
  categoryZips: CategoryZipType,
  plugin: PluginType,
  release: ReleaseType
) => {
  for (const asset of release.assets) {
    let zip = categoryZips[plugin.category]
    if (!zip) {
      categoryZips[plugin.category] = new AdmZip()
      zip = categoryZips[plugin.category]
    }
    const assetUrl = new URL(asset.browser_download_url)
    const assetFname = path.basename(assetUrl.pathname)
    const contentsResp = await fetch(assetUrl)
    zip.addFile(assetFname, Buffer.from(await contentsResp.arrayBuffer()))
    console.info(`added file ${assetFname} to ${plugin.category}`)
  }
}
