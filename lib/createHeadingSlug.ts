function createHeadingSlug(title: string): string {
  if (typeof title !== 'string') {
    return 'unknown'
  }
  let slug = (title || '')
    .replace(/[^a-z0-9 ]/gi, '')
    .replace(/\s+/g, '-')
    .toLowerCase()

  // cannot start with a number
  if (slug.match(/^[0-9]/)) {
    slug = 'a' + slug
  }
  return slug
}

export default createHeadingSlug
