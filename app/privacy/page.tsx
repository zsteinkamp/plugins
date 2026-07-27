import Link from 'next/link'
import Footer from '@/components/Footer'
import fsp from 'node:fs/promises'
import ReactMarkdown from 'react-markdown'

export default async function Page() {
  const rawMarkdown = await fsp.readFile('app/privacy/privacy.md', 'utf-8')
  return (
    <div className="prose lg:prose-2xl prose-invert grow mx-auto">
      <div className="mb-12">
        <Link href="/">Home</Link>
      </div>
      <ReactMarkdown className="prose-headings:text-highlight">
        {rawMarkdown}
      </ReactMarkdown>
      <Footer />
    </div>
  )
}
