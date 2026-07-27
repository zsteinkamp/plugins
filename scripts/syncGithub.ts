import { categoryZipPath } from '@/lib/downloadUtils'
import { loadEnvConfig } from '@next/env'
import { getSortedPluginData } from '@/lib/dataUtils'
import {
  buildCategoryZip,
  cloneOrPullRepo,
  getLatestRelease,
  ReleaseType,
  writeReleaseJSON,
} from '@/lib/scriptUtils'
import { PluginMeta } from '@/index'

const owner = 'zsteinkamp'
const projectDir = process.cwd()

loadEnvConfig(projectDir)

;(async () => {
  const plugins: PluginMeta[] = getSortedPluginData()

  // 1) Sync every repo + write release.json regardless of category.
  // 2) Group releases by category and stream one zip at a time so we never
  //    accumulate more than one in-flight chunk in memory.
  const byCategory: Record<string, ReleaseType[]> = {}

  for (const plugin of plugins) {
    const repo = plugin.repo.split('/')[4]
    if (!repo) {
      console.error(`repo not found for ${plugin.repo}`)
      continue
    }
    await cloneOrPullRepo(plugin, repo)
    const release = await getLatestRelease(owner, repo)
    if (!release) continue
    writeReleaseJSON(repo, release)
    ;(byCategory[plugin.category] ||= []).push(
      release as unknown as ReleaseType,
    )
  }

  for (const cat of Object.keys(byCategory)) {
    const zipFilename = categoryZipPath(cat)
    await buildCategoryZip(zipFilename, byCategory[cat], cat)
    console.debug(`wrote ${zipFilename}`)
  }
})()
