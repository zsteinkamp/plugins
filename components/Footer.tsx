import Link from 'next/link'
import { FC } from 'react'

const Footer: FC<object> = ({}) => {
  return (
    <div className="not-prose border-t-2 border-tilebg mt-24 pt-4 mb-8 flex">
      <div className="text-sm grow">
        by{' '}
        <Link className="" href="https://steinkamp.us/">
          Zack Steinkamp
        </Link>{' '}
        (<Link href="mailto:zack@steinkamp.us">email</Link>)
        <Link
          className="pl-8"
          href="https://patreon.com/ZackSteinkamp?utm_medium=site&utm_source=plugins_footer"
        >
          Support me on Patreon
        </Link>
      </div>
      <div className="text-sm">
        <Link className="pr-8" href="/privacy">
          Privacy Policy
        </Link>
        <Link className="" href="https://github.com/zsteinkamp/plugins">
          Source Code
        </Link>
      </div>
    </div>
  )
}
export default Footer
