import React, { ReactNode } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Footer from './Footer'

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
    <div className="flex">
      <div className="max-w-5xl mx-auto p-8">
        <h1 className="text-5xl text-highlight font-heading mb-4 ml-[-2rem] mt-[-2rem] p-8 mr-[-2rem] sm:mr-[-4rem]">
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
      <div className="nav-outer sm:bg-tilebg sm:shadow-2xl sm:min-w-[16rem] sm:p-8">
        <label
          htmlFor="nav-toggle"
          className="sm:hidden fixed top-0 right-0 z-50 p-4 cursor-pointer text-highlight2 font-heading text-4xl"
        >
          &#9776;
        </label>
        <input type="checkbox" id="nav-toggle" className="hidden" />
        <div className="nav-content sm:block">
          <div className="fixed inset-0 z-40 bg-tilebg p-8 pt-14 overflow-y-auto sm:static sm:inset-auto sm:z-auto sm:p-0 sm:pt-0 sm:max-w-48">
            {sidebar}
          </div>
        </div>
      </div>
    </div>
  )
}
