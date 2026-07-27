import yaml from 'js-yaml'
import fs from 'fs'
import { DocMeta, PluginMeta } from '@/index'
import path from 'path'

export const categorySortOrder = [
  'Knobbler',
  'Audio Effects',
  'MIDI Effects',
  'Modulators',
  'Instruments',
  'Utilities',
  'Racks',
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
    return categorySortOrder.indexOf(a.category) <
      categorySortOrder.indexOf(b.category)
      ? -1
      : 1
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
  if (!fs.existsSync(getReleasesPath(deviceKey))) {
    return []
  }
  return JSON.parse(fs.readFileSync(getReleasesPath(deviceKey), 'utf8'))
}

export const getReadmePath = (deviceKey: string) => {
  return path.join(cachePath(deviceKey), 'README.md')
}
export const getDocsPath = (deviceKey: string, docsUri: string) => {
  // Strip .md extension if present, then add it back for file resolution
  const cleanUri = docsUri.replace(/\.md$/, '')
  const finalUri = cleanUri ? `${cleanUri}.md` : 'index.md'
  return cachePath(path.join(deviceKey, 'docs', finalUri))
}

// Pull YAML frontmatter (--- ... ---) off the top of a markdown string,
// returning the parsed data and the remaining body.
const parseFrontmatter = (raw: string) => {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/)
  if (!match) {
    return { data: {} as Record<string, unknown>, body: raw }
  }
  let data: Record<string, unknown> = {}
  try {
    data = (yaml.load(match[1]) as Record<string, unknown>) || {}
  } catch {
    data = {}
  }
  return { data, body: raw.slice(match[0].length) }
}

// First markdown H1 or H2 (`# Title` / `## Title`), used as a title fallback.
// Doc pages hide the H1 when rendering, so many use an H2 as their heading.
const firstHeading = (body: string) =>
  body.match(/^#{1,2}\s+(.+?)\s*#*\s*$/m)?.[1]

// First markdown image target (`![alt](src)`), used as an image fallback.
const firstImage = (body: string) =>
  body.match(/!\[[^\]]*\]\(\s*<?([^)>\s]+)/)?.[1]

// First real paragraph of prose, used as a description fallback. Skips
// headings, images, code fences, blockquotes, and HTML, then strips inline
// markdown so the result reads as plain text.
const firstParagraph = (body: string) => {
  const lines = body.split(/\r?\n/)
  let inFence = false
  for (const raw of lines) {
    const line = raw.trim()
    if (line.startsWith('```')) {
      inFence = !inFence
      continue
    }
    if (inFence || !line) continue
    if (/^(#|!\[|>|<|\||-{3,}|\*|_|\d+\.)/.test(line)) continue
    return line
      .replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1') // links/images -> text
      .replace(/[*_`~]/g, '') // emphasis/code markers
      .trim()
      .slice(0, 200)
  }
  return undefined
}

// Resolve a doc image reference to a URL suitable for og:image. Absolute URLs
// pass through; relative paths are rewritten to the served /cache location.
const resolveDocImage = (src: string, deviceKey: string, isDocs: boolean) => {
  if (/^https?:\/\//.test(src)) {
    return src
  }
  const clean = src.replace(/^\.?\//, '')
  return `/cache/${deviceKey}${isDocs ? '/docs/' : '/'}${clean}`
}

// Build Open Graph metadata for a specific doc/README page. Prefers YAML
// frontmatter, then auto-derives from the markdown (first H1, paragraph,
// image), and finally falls back to the plugin-level values.
export const getDocMeta = (
  deviceKey: string,
  docsUri: string,
  fallback: DocMeta
): DocMeta => {
  const docsPath = getDocsPath(deviceKey, docsUri)
  let filePath: string | null = null
  let isDocs = false
  if (docsUri && fs.existsSync(docsPath)) {
    filePath = docsPath
    isDocs = true
  } else if (fs.existsSync(getReadmePath(deviceKey))) {
    filePath = getReadmePath(deviceKey)
  }
  if (!filePath) {
    return fallback
  }

  const { data, body } = parseFrontmatter(fs.readFileSync(filePath, 'utf8'))
  const title = (data.title as string) || firstHeading(body) || fallback.title
  const description =
    (data.description as string) ||
    firstParagraph(body) ||
    fallback.description
  const rawImage = (data.image as string) || firstImage(body)
  const image = rawImage
    ? resolveDocImage(rawImage, deviceKey, isDocs)
    : fallback.image

  return { title, description, image }
}

export const getRecentPlugins = (num: number) => {
  const pluginData = getPluginData()
  for (const plugin of pluginData) {
    const release = getReleases(plugin.key)
    if (release) {
      plugin.releaseDate = new Date(release.created_at)
    }
  }

  pluginData.sort((a: PluginMeta, b: PluginMeta) => {
    return a.releaseDate && b.releaseDate && a.releaseDate > b.releaseDate
      ? -1
      : 1
  })

  const sliced = pluginData.slice(0, num)
  addReleases(sliced)
  return sliced
}
