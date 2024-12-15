
import Link from "next/link"
import { FC } from "react"

const Footer: FC<object> = ({ }) => {
  return (
    <div className='not-prose border-t-2 border-tilebg mt-24 pt-4 mb-8 flex'>
      <div className="grow">by <Link href="https://steinkamp.us/">Zack Steinkamp</Link></div>
      <div><Link href="https://github.com/zsteinkamp/plugins">Plugins site GitHub Repo</Link></div>
    </div>
  )
}
export default Footer