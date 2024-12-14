export default async function Page(
  {
    params,
  }: {
    params: Promise<{ plugin: string }>
  }) {
  const plugin = (await params).plugin
  return <p>some page {plugin}</p>
}