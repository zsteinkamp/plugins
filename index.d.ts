export type PluginMeta = {
  title: string
  key: string
  category: string
  image: string
  repo: string
  description: string
  slug?: string
  catSlug?: string
  release?: any
  releaseDate?: Date
  discordUrl?: string
  discordChannel?: string
}

export type HeadingType = {
  key: string
  href?: string
  title: string
  level: number
  className?: string
}
