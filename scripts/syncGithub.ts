import { categoryZipPath } from '@/lib/downloadUtils'
import fs from 'fs'
import { Octokit } from '@octokit/rest'
import AdmZip from 'adm-zip'
import path from 'path'
import { loadEnvConfig } from '@next/env'
import { PluginMeta } from '@/types'
import { getSortedPluginData } from '@/lib/dataUtils'
import { execSync } from 'node:child_process'

const CACHE_ROOT = '/cache'
const owner = 'zsteinkamp'
const projectDir = process.cwd()

loadEnvConfig(projectDir)

const octokit = new Octokit({ auth: process.env['GH_TOKEN'] })
const categoryZips: Record<string, AdmZip> = {}

const cloneOrPullRepo = async (plugin: PluginMeta, repo: string) => {
  const dirname = path.join(CACHE_ROOT, repo)
  if (!fs.existsSync(dirname)) {
    execSync(`git -C /cache clone --depth 1 "${plugin.repo}" ${repo}`)
  } else {
    execSync(`git -C /cache/${repo} pull`)
  }
}

const getLatestRelease = async (repo: string) => {
  const { data } = await octokit.rest.repos.listReleases({ owner, repo })
  const release = data[0]
  if (!release) {
    console.error(`ERROR: No release for ${repo}`)
    return
  }
  return release
}

const writeReleaseJSON = (plugin: any, repo: string, release: any) => {
  const fname = path.join(CACHE_ROOT, repo, 'release.json')
  fs.writeFileSync(fname, JSON.stringify(release))
  console.info(`wrote ${fname}`)
}

const addToCategoryZip = async (plugin: any, release: any) => {
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

;(async () => {
  const plugins: any = getSortedPluginData()

  for (const plugin of plugins) {
    const repo = plugin.repo.split('/')[4]
    if (!repo) {
      console.error(`repo not found for ${plugin.repo}`)
      continue
    }
    await cloneOrPullRepo(plugin, repo)
    const release = await getLatestRelease(repo)
    if (release) {
      writeReleaseJSON(plugin, repo, release)
      await addToCategoryZip(plugin, release)
    }
  }
  for (const cat in categoryZips) {
    const zipFilename = categoryZipPath(cat)
    categoryZips[cat].writeZip(zipFilename)
    console.debug(`wrote ${zipFilename}`)
  }
})()
