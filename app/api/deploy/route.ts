export const dynamic = 'force-dynamic'

export async function GET() {
  // Node process start == container start == deploy time
  const deployTime = new Date(Date.now() - process.uptime() * 1000).toISOString()
  return Response.json({
    sha: process.env.GIT_SHA ?? 'unknown',
    buildTime: process.env.BUILD_TIME ?? 'unknown',
    deployTime,
  })
}
