import React, { ReactNode } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Footer from './Footer'
import Mono from './Mono'

export default function PageContents({
  title,
  sidebar,
  children,
}: {
  title: string
  sidebar: ReactNode
  children: ReactNode
}) {
  return (
    <>
      <div className="flex-1 max-w-5xl p-8">
        <div
          className="fixed top-0 left-0 w-full max-w-4xl"
          style={{ zIndex: -1 }}
        >
          <Mono />
        </div>
        <h1 className="text-5xl text-highlight font-heading mb-12 ml-[-2rem] mt-[-2rem] bg-lcdbg p-8 mr-[-2rem] sm:mr-[-4rem]">
          <Link href="/" className="flex gap-4">
            <Image
              width="60"
              height="60"
              src="/favicon-trans.svg"
              alt="live.dial"
              className="mt-[-0.5rem]"
            />
            {title}
          </Link>
        </h1>
        <div className="sm:mx-8">
          {children}
          <Footer />
        </div>
      </div>
      <div className="hidden sm:block min-w-[16rem] ml-0 bg-tilebg p-8 shadow-2xl">
        <div className="fixed max-h-[calc(100vh-4rem)] overflow-y-auto max-w-48">
          {sidebar}
        </div>
      </div>
    </>
  )
}
