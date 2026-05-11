import Link from 'next/link'
import Image from 'next/image'
import Footer from '@/components/Footer'
import { getReleases } from '@/lib/dataUtils'

const DOCS_HREF = '/m4l-Knobbler4/index'
const REPO_RELEASES = 'https://github.com/zsteinkamp/m4l-Knobbler4/releases'

export default function KnobblerSite() {
  const release = getReleases('m4l-Knobbler4')
  const downloadUrl: string =
    release?.assets?.[0]?.browser_download_url ?? REPO_RELEASES
  const releaseName: string | undefined = release?.name
  return (
    <div className="w-full bg-background text-foreground overflow-x-hidden">
      {/* Top nav */}
      <nav className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between gap-4 px-4 py-4 sm:px-10 sm:py-5">
        <Link
          href="/"
          className="font-heading text-lg sm:text-2xl text-highlight hover:text-highlight2 transition-colors"
        >
          ← Zack&apos;s Plugins
        </Link>
        <div className="flex items-center gap-3 sm:gap-5">
          <Link
            href={DOCS_HREF}
            className="hidden sm:inline font-heading text-lg text-foreground/80 hover:text-highlight transition-colors"
          >
            Documentation →
          </Link>
          <Link
            href={downloadUrl}
            className="inline-flex flex-col items-center sm:flex-row sm:gap-3 px-4 sm:px-5 py-2 sm:py-3 bg-highlight2 text-lcdbg font-heading rounded-sm shadow-lg hover:bg-highlight transition-colors"
          >
            <span className="text-sm sm:text-lg tracking-wide uppercase whitespace-nowrap">
              ↓ Download M4L Device
            </span>
            {releaseName && (
              <span className="text-[10px] sm:text-xs uppercase tracking-widest opacity-80 whitespace-nowrap">
                {releaseName}
              </span>
            )}
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/knobbler/dual-tablets.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/85 via-background/55 to-background" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-transparent to-background/40" />
        </div>

        <div className="relative z-10 max-w-4xl mx-4 sm:mx-10 my-32 px-8 py-16 sm:px-16 sm:py-20 text-center bg-black/55 backdrop-blur-sm rounded-md ring-1 ring-white/10 shadow-2xl">
          <p className="font-heading uppercase tracking-[0.4em] text-highlight2 text-sm sm:text-base mb-6">
            Knobbler for Ableton Live
          </p>
          <h1 className="font-heading text-5xl sm:text-7xl lg:text-8xl leading-[0.95] text-highlight mb-8">
            Mix. Launch. Tweak.
            <br />
            All in your hands.
          </h1>
          <p className="text-lg sm:text-2xl text-foreground/85 max-w-3xl mx-auto leading-relaxed mb-4">
            A responsive, color-aware control surface for Ableton Live — running
            on the iPad, iPhone, or Android device you already own.
          </p>
          <p className="text-lg sm:text-2xl text-highlight max-w-3xl mx-auto leading-relaxed mb-4">
            Now with Push 3 Standalone support!
          </p>
          <p className="text-base sm:text-xl text-foreground/75 max-w-3xl mx-auto leading-relaxed mb-12">
            Full-screen <span className="text-highlight2">mixer</span> with
            volume, pan, mute/solo, sends, and live meters. A
            <span className="text-highlight2"> session-view clip grid</span> for
            launching scenes. And{' '}
            <span className="text-highlight2">32 assignable faders</span> with
            X-Y pads on every parameter you can map.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="https://apps.apple.com/us/app/knobbler-for-ableton-live/id6443613387"
              className="inline-flex items-center px-7 py-4 bg-highlight text-lcdbg font-heading text-xl tracking-wide rounded-sm hover:bg-highlight2 transition-colors"
            >
              Get it on iOS
            </Link>
            <Link
              href="https://play.google.com/store/apps/details?id=com.anonymous.knobblernative"
              className="inline-flex items-center px-7 py-4 border border-highlight2 text-highlight2 font-heading text-xl tracking-wide rounded-sm hover:bg-highlight2 hover:text-lcdbg transition-colors"
            >
              Get it on Android
            </Link>
          </div>
          <div className="mt-6 flex flex-col items-center gap-1">
            <Link
              href={downloadUrl}
              className="font-heading text-base sm:text-lg text-highlight2 hover:text-highlight underline underline-offset-4 decoration-highlight2/40 hover:decoration-highlight tracking-wide"
            >
              ↓ Download the free Max for Live device
            </Link>
            {releaseName && (
              <span className="text-xs sm:text-sm text-foreground/55 font-heading uppercase tracking-widest">
                Latest: {releaseName}
              </span>
            )}
          </div>
          <div className="mt-10 text-sm text-foreground/60 font-heading uppercase tracking-[0.3em]">
            Scroll to see it in action ↓
          </div>
        </div>
      </section>

      {/* Push 3 Standalone */}
      <section className="relative py-24 sm:py-32 px-6 sm:px-10">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="order-2 lg:order-1">
            <span className="inline-flex items-center gap-2 px-3 py-1 mb-6 bg-highlight/15 border border-highlight/40 rounded-full text-highlight font-heading uppercase tracking-widest text-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-highlight animate-pulse" />
              New
            </span>
            <h2 className="font-heading text-4xl sm:text-6xl text-highlight mb-6">
              Push 3 Standalone,
              <br />
              fully on board.
            </h2>
            <p className="text-base sm:text-xl text-foreground/85 leading-relaxed mb-4">
              Knobbler now talks directly to Ableton Push 3 in standalone mode —
              no laptop required. Bring just the Push and your tablet to the
              stage and have the whole control surface in your hands.
            </p>
            <p className="text-sm sm:text-base text-foreground/65">
              Same auto-labeling, auto-coloring, and instant feedback you get
              when running with a Live set on a computer.
            </p>
          </div>
          <div className="order-1 lg:order-2">
            <div className="relative aspect-[4/3] rounded-md overflow-hidden ring-1 ring-bghighlight shadow-2xl">
              <Image
                src="/images/knobbler/push3-standalone.jpg"
                alt="Knobbler running with Push 3 in standalone mode"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mixer + Clips showcase */}
      <section className="relative py-24 sm:py-32 px-6 sm:px-10 bg-tilebg/40">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="font-heading uppercase tracking-[0.4em] text-highlight2 text-xs sm:text-sm mb-4">
              Two views, one app
            </p>
            <h2 className="font-heading text-4xl sm:text-6xl text-highlight">
              Mix the room. Launch the set.
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-8 sm:gap-10">
            <figure className="group">
              <div className="relative aspect-[4/3] bg-lcdbg rounded-md overflow-hidden ring-1 ring-bghighlight shadow-xl">
                <Image
                  src="/images/knobbler/mixer.jpg"
                  alt="Knobbler full-screen mixer view"
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>
              <figcaption className="mt-5 text-center">
                <h3 className="font-heading text-2xl sm:text-3xl text-highlight2 mb-2">
                  Full-screen mixer
                </h3>
                <p className="text-sm sm:text-base text-foreground/75">
                  Volume, pan, mute, solo, sends, and live meters across every
                  track — colors and labels straight from your set.
                </p>
              </figcaption>
            </figure>
            <figure className="group">
              <div className="relative aspect-[4/3] bg-lcdbg rounded-md overflow-hidden ring-1 ring-bghighlight shadow-xl">
                <Image
                  src="/images/knobbler/clips.jpg"
                  alt="Knobbler session-view clip grid"
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>
              <figcaption className="mt-5 text-center">
                <h3 className="font-heading text-2xl sm:text-3xl text-highlight2 mb-2">
                  Session-view clips
                </h3>
                <p className="text-sm sm:text-base text-foreground/75">
                  Launch clips and scenes from a responsive grid that mirrors
                  your Live session in real time.
                </p>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* Demo video */}
      <section className="relative py-24 sm:py-32 px-6 sm:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="font-heading uppercase tracking-[0.4em] text-highlight2 text-xs sm:text-sm mb-4">
              Sixty seconds
            </p>
            <h2 className="font-heading text-4xl sm:text-6xl text-highlight mb-4">
              See it in action.
            </h2>
            <p className="text-base sm:text-lg text-foreground/75 max-w-2xl mx-auto">
              A quick tour of what Knobbler feels like to play, mix, and perform
              with.
            </p>
          </div>

          <div className="relative aspect-video w-full bg-lcdbg rounded-md overflow-hidden shadow-2xl ring-1 ring-bghighlight">
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/m3h8QtVeWb8?rel=0"
              title="Knobbler — Setup &amp; Feature Walkthrough"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-foreground/70 font-heading uppercase tracking-widest">
            <Link
              href="https://www.youtube.com/watch?v=IXMD_2z16_A"
              className="hover:text-highlight transition-colors"
            >
              5-min Setup →
            </Link>
            <Link
              href="https://www.youtube.com/watch?v=m3h8QtVeWb8"
              className="hover:text-highlight transition-colors"
            >
              15-min Walkthrough →
            </Link>
            <Link
              href="https://www.youtube.com/@zsteinkamp"
              className="hover:text-highlight transition-colors"
            >
              Full channel →
            </Link>
          </div>
        </div>
      </section>

      {/* Secondary visual */}
      <section className="relative">
        <div className="relative aspect-[16/8] sm:aspect-[16/6] w-full overflow-hidden">
          <Image
            src="/images/knobbler/battle-station.jpg"
            alt="Knobbler controlling a full Ableton studio setup"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/60" />
          <div className="absolute inset-0 flex items-end sm:items-center justify-center">
            <div className="max-w-3xl px-6 sm:px-10 pb-12 sm:pb-0 text-center">
              <h3 className="font-heading text-3xl sm:text-5xl text-highlight mb-4">
                Auto-labeled. Auto-colored. Always in sync.
              </h3>
              <p className="text-base sm:text-lg text-foreground/85">
                Knobbler mirrors your Live set in real time — track names,
                colors, parameters. No more squinting at a generic surface
                wondering what fader 7 controls.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-24 sm:py-32 px-6 sm:px-10 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading text-4xl sm:text-6xl text-highlight mb-6">
            Free Max for Live device.
            <br />
            Companion app on the stores.
          </h2>
          <p className="text-base sm:text-lg text-foreground/80 mb-10">
            Drop the free Max for Live device into Ableton, install the
            companion app on your tablet or phone, and you&apos;re playing.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href={DOCS_HREF}
              className="inline-flex items-center px-7 py-4 bg-highlight text-lcdbg font-heading text-xl tracking-wide rounded-sm hover:bg-highlight2 transition-colors"
            >
              Documentation &amp; Download
            </Link>
            <Link
              href="https://discord.gg/8W6VeKq5SN"
              className="inline-flex items-center px-7 py-4 border border-foreground/40 text-foreground font-heading text-xl tracking-wide rounded-sm hover:border-highlight hover:text-highlight transition-colors"
            >
              Join the Discord
            </Link>
          </div>
          <div className="mt-12 space-y-2 text-xs sm:text-sm text-foreground/55 font-heading uppercase tracking-widest">
            <p>Mac &amp; Windows · iOS &amp; Android · Phones &amp; Tablets</p>
            <p>
              Requires Live 12 Suite, Push 3 Standalone, or Live 12 Standard +
              Max for Live Add-On.
            </p>
          </div>
        </div>
      </section>
      <div className="max-w-5xl mx-auto mt-16 px-2">
        <Footer />
      </div>
    </div>
  )
}
