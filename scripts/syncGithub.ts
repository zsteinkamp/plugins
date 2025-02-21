import { categoryZipPath } from '@/lib/downloadUtils'
import { loadEnvConfig } from '@next/env'
import { getSortedPluginData } from '@/lib/dataUtils'
import {
  addToCategoryZip,
  CategoryZipType,
  cloneOrPullRepo,
  getLatestRelease,
  writeReleaseJSON,
} from '@/lib/scriptUtils'

const owner = 'zsteinkamp'
const projectDir = process.cwd()

loadEnvConfig(projectDir)

const categoryZips: CategoryZipType = {}

;(async () => {
  const plugins: any = getSortedPluginData()

  for (const plugin of plugins) {
    const repo = plugin.repo.split('/')[4]
    if (!repo) {
      console.error(`repo not found for ${plugin.repo}`)
      continue
    }
    await cloneOrPullRepo(plugin, repo)
    const release = await getLatestRelease(owner, repo)
    if (release) {
      writeReleaseJSON(plugin, repo, release)
      await addToCategoryZip(categoryZips, plugin, release)
    }
  }
  for (const cat in categoryZips) {
    const zipFilename = categoryZipPath(cat)
    categoryZips[cat].writeZip(zipFilename)
    console.debug(`wrote ${zipFilename}`)
  }
})()
