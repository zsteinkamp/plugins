import yaml from 'js-yaml'
import fs from 'fs'
import { PluginMeta } from '@/types'
import path from 'path'

export const categorySortOrder = [
  "Audio Effects",
  "Modulators",
  "Utilities",
  "Note Effects",
  "Instruments",
]

const getPluginData = () => {
  return yaml.load(fs.readFileSync('data/plugins.yaml', 'utf8')) as PluginMeta[]
}

export const getDataForPlugin = (plugin: string) => {
  const pluginData = getPluginData()
  for (const data of pluginData) {
    if (data.key === plugin) {
      addReleases([data])
      return data
    }
  }
  return null
}

const addReleases = (pluginData: PluginMeta[]) => {
  for (const plugin of pluginData) {
    const release = getReleases(plugin.key)
    if (release) {
      plugin.release = release
      plugin.releaseDate = new Date(release.created_at)
    }
  }
  return pluginData
}

export const getSortedPluginData = () => {
  const pluginData = getPluginData()
  pluginData.sort((a: PluginMeta, b: PluginMeta) => {
    return a.title < b.title ? -1 : 1
  })
  pluginData.sort((a: PluginMeta, b: PluginMeta) => {
    return categorySortOrder.indexOf(a.category) < categorySortOrder.indexOf(b.category) ? -1 : 1
  })

  addReleases(pluginData)
  return pluginData
}

const cachePath = (deviceKey: string) => {
  return path.join('/cache', deviceKey)
}

export const getReleasesPath = (deviceKey: string) => {
  return path.join(cachePath(deviceKey), 'release.json')
}

export const getReleases = (deviceKey: string) => {
  return JSON.parse(fs.readFileSync(getReleasesPath(deviceKey), 'utf8'))
}

export const getReadmePath = (deviceKey: string) => {
  return path.join(cachePath(deviceKey), 'README.md')
}

export const getRecentPlugins = (num: number) => {
  const pluginData = getPluginData()
  for (const plugin of pluginData) {
    const release = getReleases(plugin.key)
    plugin.releaseDate = new Date(release.created_at)
  }

  pluginData.sort((a: PluginMeta, b: PluginMeta) => {
    return (a.releaseDate && b.releaseDate && a.releaseDate > b.releaseDate) ? -1 : 1;
  })

  const sliced = pluginData.slice(0, num)
  addReleases(sliced)
  return sliced
}
