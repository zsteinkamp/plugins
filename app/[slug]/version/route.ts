import { getDataForPlugin } from '@/lib/dataUtils'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const plugin = (await params).slug
  const pluginData = getDataForPlugin(plugin)
  const tagName = pluginData?.release.tag_name
  const versionNumber = tagName.split('v')[1]
  return new Response(versionNumber, {
    headers: { 'Content-Type': 'text/plain' },
  })
}
