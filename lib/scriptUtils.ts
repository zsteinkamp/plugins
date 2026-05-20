import fs from 'fs'
import path from 'path'
import { Readable } from 'node:stream'
import { Octokit } from '@octokit/rest'
import archiver from 'archiver'
import { PluginMeta } from '@/index'
import { execSync } from 'node:child_process'

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

/**
 * Build a category zip by streaming each asset directly from GitHub into the
 * archive without buffering. Memory stays flat at roughly one chunk in flight.
 */
export const buildCategoryZip = async (
  outPath: string,
  releases: ReleaseType[],
  category: string,
) => {
  const output = fs.createWriteStream(outPath)
  const archive = archiver('zip', { zlib: { level: 6 } })

  const done = new Promise<void>((resolve, reject) => {
    output.on('close', () => resolve())
    output.on('error', reject)
    archive.on('error', reject)
    archive.on('warning', (err) => {
      if ((err as NodeJS.ErrnoException).code === 'ENOENT') {
        console.warn(`archiver warning: ${err.message}`)
      } else {
        reject(err)
      }
    })
  })

  archive.pipe(output)

  for (const release of releases) {
    for (const asset of release.assets) {
      const assetUrl = new URL(asset.browser_download_url)
      const assetFname = path.basename(assetUrl.pathname)
      const resp = await fetch(assetUrl)
      if (!resp.ok || !resp.body) {
        console.error(`failed to fetch ${assetUrl}: ${resp.status}`)
        continue
      }
      const nodeStream = Readable.fromWeb(
        resp.body as Parameters<typeof Readable.fromWeb>[0],
      )
      archive.append(nodeStream, { name: assetFname })
      // archiver serializes entries — wait for this one to finish before
      // queueing the next so we don't accumulate buffered chunks.
      await new Promise<void>((resolve, reject) => {
        nodeStream.on('end', () => resolve())
        nodeStream.on('error', reject)
      })
      console.info(`added ${assetFname} to ${category}`)
    }
  }

  await archive.finalize()
  await done
}
