import { loadEnvConfig } from '@next/env'
import { getSortedPluginData } from '@/lib/dataUtils'
import { cloneOrPullRepo } from '@/lib/scriptUtils'

const projectDir = process.cwd()

loadEnvConfig(projectDir)
;(async () => {
  const plugins: any = getSortedPluginData()

  for (const plugin of plugins) {
    const repo = plugin.repo.split('/')[4]
    if (!repo) {
      console.error(`repo not found for ${plugin.repo}`)
      continue
    }
    await cloneOrPullRepo(plugin, repo)
    console.log('Updated ' + plugin.repo)
  }
})()
