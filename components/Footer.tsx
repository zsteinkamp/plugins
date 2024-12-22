
import Link from "next/link"
import { FC } from "react"

const Footer: FC<object> = ({ }) => {
  return (
    <div className='not-prose border-t-2 border-tilebg mt-24 pt-4 mb-8 flex'>
      <div className="text-sm grow">by <Link className="" href="https://steinkamp.us/">Zack Steinkamp</Link> (<Link href="mailto:zack@steinkamp.us">email</Link>)</div>
      <div className="text-sm"><Link className="" href="https://github.com/zsteinkamp/plugins">Plugins site GitHub Repo</Link></div>
    </div>
  )
}
export default Footer
