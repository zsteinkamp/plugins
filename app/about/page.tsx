import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <>
      <div className="m-auto">
        <div className="flex mb-12 ml-[-2rem] mt-[-2rem] bg-lcdbg p-8 mr-[-2rem] sm:mr-[-4rem]">
          <div className="text-xl mt-2 mr-8"><Link href="/">&lt; Home</Link></div>
          <h1 className="text-5xl text-highlight">
            About
          </h1>
        </div>
      </div>
      <div className="sm:mx-8">
        <div className="lg:flex mb-16">
          <div className="prose lg:prose-2xl prose-invert grow">
            <div>
              <p>
                Hello, curious person.
              </p>
              <iframe className="w-full aspect-video" src="https://www.youtube.com/embed/videoseries?si=4Y_ms8DDTHQfIzdN&amp;list=PLqzTnRgmRId7rYvoVSoCvCWFgvfc8RcfW" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
              <p>
                Have a look at my <Link href="https://www.youtube.com/@zsteinkamp">YouTube channel</Link> for many videos and example performances on the devices you see here.
              </p>
              <h2 className="text-highlight">About This Site</h2>
              <p>
                I made this site to provide a simple and useful way of learning about and downloading my software. I started out using GitHub for this, but for non-nerds the user experience of finding and reading the README.md content then finding a way to download the software was overwhelming and daunting.
              </p>
              <p>
                This site runs from a Debian Linux machine in my house, via Cloudflare's CDN. You can have a look at the <Link href="https://github.com/zsteinkamp/plugins">source code here</Link>. It uses a .yaml file that specifies a list of GitHub repos that a script harvests README.md and release information from.
              </p>
              <p>
                So each repo is the source of truth not only for its source code files, but for its documentation presented on this site.
              </p>
              <h2 className="text-highlight">About Me - Why?</h2>
              <Image src="/images/about_photo.jpg" className="float-right ml-8 mb-8" width="300" height="200" alt="About Me" />
              <p>
                I started with Max For Live in 2021, mostly inspired by <Link href="https://www.youtube.com/watch?v=E1Kr0EJwZ-c">Hainbach's video on the Vestax Faderboard</Link>. I've been a programmer my whole life, and was initially confounded by Max, but stuck with it and really enjoy working with it now.
              </p>
              <p>
                Through the years since then, I've developed and released a lot of different devices. All of them stem from some desire for a capability or workflow in <Link href="https://zacksteinkamp.bandcamp.com/">my own music-making</Link> that either didn't exist or didn't exist in the way I wanted.
              </p>
              <p>
                In 2024, I retired from full-time work and have been able to devote more time and energy into these projects. I was fortunate to be the right <Link href="https://steinkamp.us/posts/2021-05-22-computer-history">person</Link> with the right friends in the right place in the right time and had a great <Link href="https://steinkamp.us/resume">career</Link> as an engineer in the tech industry. Every company I worked for was totally reliant on open-source software. Some of them actively contributed back to the projects they relied on, but that was more the exception than the rule. Every Silicon Valley success story is built on the backs of countless dedicated project maintainers, powered solely by curiosity and the common good.
              </p>
              <p>
                In the spirit of paying good fortune forward, I have taken the approach that my plugins will be freely available and developed in the open. I enjoy using my time and energy to enrich the lives of artists through building tools for them, and feel happy if I can contribute to the overall art ecosystem in a positive way.
              </p>
              <p>
                Or maybe have a look at my <Link href="https://steinkamp.us/">personal web site</Link> for more info on more stuff.
              </p>
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </>
  )
}
