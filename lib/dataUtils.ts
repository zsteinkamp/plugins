import yaml from 'js-yaml'
import fs from 'fs'
import { PluginMeta } from '@/types'

const sortOrder = [
  "Control",
  "Modulators",
  "Note Effects",
  "Audio Effects",
  "Instruments",
  "Utilities"
]

export const getPluginData = () => {
  const pluginData = yaml.load(fs.readFileSync('data/plugins.yaml', 'utf8')) as PluginMeta[]

  pluginData.sort((a: PluginMeta, b: PluginMeta) => a.title < b.title ? -1 : 1)
  pluginData.sort((a: PluginMeta, b: PluginMeta) => sortOrder.indexOf(a.category) < sortOrder.indexOf(b.category) ? -1 : 1)

  return pluginData
}
