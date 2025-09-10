import Link from 'next/link'
import React, { FC } from 'react'

interface ComponentProps {
  className?: string
}
const StripeButton: FC<ComponentProps> = ({ className = '' }) => {
  return (
    <div className={className}>
      <Link
        className="text-center block max-w-48 mb-4 bg-highlight no-underline hover:bg-highlight2  rounded-md shadow-md border-t-2 border-t-white/20 border-b-2 border-b-black/20"
        href="https://buy.stripe.com/fZu9AU8AocAFeq12Embwk00"
      >
        <div className="text-black p-4 hover:text-white">Contribute 🖤</div>
      </Link>
    </div>
  )
}

export default StripeButton
