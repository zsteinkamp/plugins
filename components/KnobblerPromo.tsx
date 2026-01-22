import Link from 'next/link'
import React, { FC } from 'react'

interface ComponentProps {
  className?: string
}
const KnobblerPromo: FC<ComponentProps> = ({ className = '' }) => {
  return (
    <Link href="/m4l-Knobbler4">
      <div className={'flex flex-col ' + className}>
        <img
          src="/images/external-with-hand.jpg"
          alt="Knobbler in action"
          className="not-prose min-w-32 max-w-64"
        />
        <p className="not-prose text-highlight">
          Find new creative flow in Ableton Live with <strong>Knobbler</strong> for
          iPad, iPhone, and Android.
        </p>
      </div>
    </Link>
  )
}

export default KnobblerPromo
