'use client'

// Interactive Knobbler release timeline, rendered from docs/timeline.json
// (generated in the m4l-Knobbler4 repo from the app's release notes + the
// device's GitHub releases). App releases run down one side, device releases
// down the other, feature media down the center; gaps are proportional to the
// real time between releases, clamped so dense weeks stay legible. Hover (mouse)
// or tap (touch) any release for its full notes. Styling uses the site's theme
// tokens, so it matches the surrounding docs. Presentation mirrors the
// standalone build at knobbler-native/scripts/timeline/timeline.html.

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'

type AppNote = { text: string; tag: string | null }
type AppRelease = {
  side: 'app'
  version: string
  date: string
  title: string
  notes: AppNote[]
}
type DeviceRelease = {
  side: 'device'
  version: string
  date: string
  title: string
  notes: string[]
  images: string[]
  videos: string[]
}
type Release = AppRelease | DeviceRelease
export type TimelineData = {
  appReleases: AppRelease[]
  deviceReleases: DeviceRelease[]
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function parseDate(s: string) {
  const p = s.split('-')
  return new Date(+p[0], +p[1] - 1, +p[2])
}
function daysBetween(a: Date, b: Date) {
  return Math.abs((a.getTime() - b.getTime()) / 86400000)
}
function fmtDate(s: string) {
  const d = parseDate(s)
  return MONTHS[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear()
}
function firstSentence(s: string) {
  const t = s.replace(/\*\*/g, '')
  const m = t.match(/^.*?[.!?](\s|$)/)
  return (m ? m[0] : t).trim()
}
function renderBold(text: string): React.ReactNode {
  const parts = text.split(/\*\*(.+?)\*\*/g)
  return parts.map((p, i) => (i % 2 === 1 ? <strong key={i}>{p}</strong> : p))
}

const MIN_GAP = 10
const PX_PER_DAY = 1.7
const MAX_GAP = 150

function computeStyle(
  el: HTMLElement,
  side: string
): { style: React.CSSProperties; narrow: boolean } {
  const narrow = window.innerWidth <= 720
  if (narrow) {
    return { narrow, style: { left: 16, right: 16, bottom: 16, maxHeight: '72vh', width: 'auto' } }
  }
  const rect = el.getBoundingClientRect()
  const pw = 420
  const gap = 14
  let left = side === 'app' ? rect.right + gap : rect.left - pw - gap
  left = Math.max(12, Math.min(left, window.innerWidth - pw - 12))
  const top = Math.max(12, Math.min(rect.top, window.innerHeight - 260))
  return { narrow, style: { left, top, width: pw } }
}

type PanelState = {
  release: Release
  pinned: boolean
  narrow: boolean
  style: React.CSSProperties
}

export default function ReleaseTimeline({ data }: { data: TimelineData }) {
  const releases = useMemo(() => {
    const all: Release[] = []
    ;(data.appReleases || []).forEach((r) => r.date && all.push(r))
    ;(data.deviceReleases || []).forEach((r) => r.date && all.push(r))
    all.sort((a, b) =>
      a.date < b.date ? 1 : a.date > b.date ? -1 : a.side < b.side ? 1 : -1
    )
    return all
  }, [data])

  const [panel, setPanel] = useState<PanelState | null>(null)
  const pinnedRef = useRef(false)
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const canHover = useRef(false)
  useEffect(() => {
    canHover.current = window.matchMedia('(hover: hover) and (pointer: fine)').matches
  }, [])

  const open = useCallback((release: Release, el: HTMLElement, pin: boolean) => {
    if (hideTimer.current) clearTimeout(hideTimer.current)
    const { style, narrow } = computeStyle(el, release.side)
    pinnedRef.current = pin || narrow
    setPanel({ release, pinned: pin || narrow, narrow, style })
  }, [])
  const close = useCallback(() => {
    pinnedRef.current = false
    setPanel(null)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [close])

  const triggerProps = (r: Release): React.HTMLAttributes<HTMLDivElement> => ({
    onClick: (e) => open(r, e.currentTarget, true),
    onMouseEnter: (e) => {
      if (canHover.current && !pinnedRef.current) open(r, e.currentTarget, false)
    },
    onMouseLeave: () => {
      if (!pinnedRef.current) {
        if (hideTimer.current) clearTimeout(hideTimer.current)
        hideTimer.current = setTimeout(() => setPanel(null), 160)
      }
    },
    onKeyDown: (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        open(r, e.currentTarget, true)
      }
    },
  })

  // Build the row list with year dividers.
  const rows: React.ReactNode[] = []
  let prev: Release | null = null
  let lastYear: number | null = null
  releases.forEach((r) => {
    const d = parseDate(r.date)
    if (lastYear !== null && d.getFullYear() !== lastYear) {
      rows.push(
        <div className="rtl-yearmark" key={'y' + lastYear}>
          <span>{lastYear}</span>
        </div>
      )
    }
    lastYear = d.getFullYear()
    const marginTop = prev
      ? Math.max(MIN_GAP, Math.min(MAX_GAP, daysBetween(parseDate(prev.date), d) * PX_PER_DAY))
      : 6
    rows.push(<Row key={r.side + r.version} r={r} marginTop={marginTop} trigger={triggerProps} onMedia={open} />)
    prev = r
  })

  return (
    <div className="rtl-root">
      <style>{CSS}</style>
      <div className="rtl-timeline">
        <div className="rtl-spine" />
        {rows}
      </div>

      {panel && (
        <>
          {panel.pinned && <div className="rtl-backdrop" onClick={close} />}
          <aside
            className={'rtl-panel rtl-side-' + panel.release.side}
            style={panel.style}
            role="dialog"
            aria-label="Release notes"
            onMouseEnter={() => hideTimer.current && clearTimeout(hideTimer.current)}
            onMouseLeave={() => {
              if (!pinnedRef.current) hideTimer.current = setTimeout(() => setPanel(null), 160)
            }}
          >
            <button className="rtl-close" aria-label="Close" onClick={close}>
              ×
            </button>
            <div className="rtl-phead">
              <span className={'rtl-ptag rtl-' + panel.release.side}>
                {panel.release.side === 'app' ? 'App' : 'Device'}
              </span>
              <span className="rtl-pver">{panel.release.version}</span>
              <span className="rtl-pdate">{fmtDate(panel.release.date)}</span>
            </div>
            {panel.release.side === 'device' &&
              panel.release.title &&
              panel.release.title !== panel.release.version && (
                <h3 className="rtl-h3">{panel.release.title}</h3>
              )}
            <PanelBody release={panel.release} />
          </aside>
        </>
      )}
    </div>
  )
}

function Row({
  r,
  marginTop,
  trigger,
  onMedia,
}: {
  r: Release
  marginTop: number
  trigger: (r: Release) => React.HTMLAttributes<HTMLDivElement>
  onMedia: (r: Release, el: HTMLElement, pin: boolean) => void
}) {
  const dot = r.side === 'app' ? 'var(--highlight2)' : 'var(--highlight)'
  const card = <Card r={r} dot={dot} trigger={trigger} />
  const thumb =
    r.side === 'device' ? <Thumb r={r} onClick={(el) => onMedia(r, el, true)} /> : null
  return (
    <div className={'rtl-row rtl-side-' + r.side} style={{ marginTop }}>
      <div className="rtl-side rtl-left">{r.side === 'app' ? card : null}</div>
      <div className="rtl-center">
        <div className="rtl-dot" style={{ borderColor: dot }} />
        {thumb}
      </div>
      <div className="rtl-side rtl-right">
        {r.side === 'device' ? (
          <>
            {card}
            <div className="rtl-mobile-media">{thumb}</div>
          </>
        ) : null}
      </div>
    </div>
  )
}

function Card({
  r,
  dot,
  trigger,
}: {
  r: Release
  dot: string
  trigger: (r: Release) => React.HTMLAttributes<HTMLDivElement>
}) {
  const peek =
    r.side === 'app' ? (r.notes[0] ? r.notes[0].text : '') : firstSentence(r.notes[0] || '')
  const ttl = r.side === 'device' && r.title && r.title !== r.version ? r.title : ''
  const more =
    r.side === 'app'
      ? r.notes.length + ' note' + (r.notes.length !== 1 ? 's' : '') + ' ›'
      : 'read notes ›'
  return (
    <div className="rtl-card" tabIndex={0} style={{ '--dotcolor': dot } as React.CSSProperties} {...trigger(r)}>
      <div className="rtl-meta">
        <span className="rtl-ver">{r.version}</span>
        <span className="rtl-date">{fmtDate(r.date)}</span>
      </div>
      {ttl && <div className="rtl-ttl">{ttl}</div>}
      <div className="rtl-peek">{peek}</div>
      <div className="rtl-more">{more}</div>
    </div>
  )
}

function Thumb({ r, onClick }: { r: DeviceRelease; onClick: (el: HTMLElement) => void }) {
  const hasImg = r.images && r.images.length > 0
  const total = (r.images?.length || 0) + (r.videos?.length || 0)
  if (total === 0) return null
  return (
    <div className="rtl-thumb" onClick={(e) => onClick(e.currentTarget)}>
      {hasImg ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img loading="lazy" src={r.images[0]} alt="" />
      ) : (
        <div className="rtl-play">
          <span>▶</span>
        </div>
      )}
      <span className="rtl-badge">{r.version}</span>
      {total > 1 && <span className="rtl-count">+{total - 1}</span>}
    </div>
  )
}

function PanelBody({ release }: { release: Release }) {
  if (release.side === 'app') {
    return (
      <ul className="rtl-ul">
        {release.notes.map((n, i) => (
          <li key={i}>
            <span>
              {n.text}
              {n.tag && <span className="rtl-plat">{n.tag} only</span>}
            </span>
          </li>
        ))}
      </ul>
    )
  }
  return (
    <>
      {release.notes.map((p, i) => (
        <p className="rtl-para" key={i}>
          {renderBold(p)}
        </p>
      ))}
      {(release.images.length > 0 || release.videos.length > 0) && (
        <div className="rtl-gallery">
          {release.images.map((u, i) => (
            <a key={'i' + i} href={u} target="_blank" rel="noopener noreferrer">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img loading="lazy" src={u} alt="" />
            </a>
          ))}
          {release.videos.map((u, i) => (
            <a key={'v' + i} href={u} target="_blank" rel="noopener noreferrer">
              <span className="rtl-vid">
                ▶<b>Watch clip</b>
              </span>
            </a>
          ))}
        </div>
      )}
    </>
  )
}

const CSS = `
.rtl-root {
  --rtl-panel: var(--tilebg, #242424);
  --rtl-panel2: var(--lcdbg, #202020);
  --rtl-fg: #e4e4e4;
  --rtl-muted: #8f8f8f;
  --rtl-line: var(--bghighlight, #464646);
  --rtl-spine: #4a4a4a;
  --rtl-app: var(--highlight2, #58c0d2);
  --rtl-device: var(--highlight, #f2b066);
  --rtl-app-soft: #123330;
  --rtl-device-soft: #3a2a17;
  --rtl-shadow: 0 1px 2px rgba(0,0,0,0.4), 0 10px 30px rgba(0,0,0,0.45);
  --rtl-mono: ui-monospace, SFMono-Regular, Menlo, monospace;
  --rtl-display: din-condensed, ui-sans-serif, system-ui, sans-serif;
  color: var(--rtl-fg);
  font-size: 14px;
  line-height: 1.5;
}
.rtl-root * { box-sizing: border-box; }
.rtl-timeline { position: relative; margin: 8px 0 60px; }
.rtl-spine { position: absolute; top: 0; bottom: 0; left: 50%; width: 2px; margin-left: -1px; background: var(--rtl-spine); z-index: 0; }
.rtl-yearmark { position: relative; z-index: 2; display: flex; justify-content: center; margin: 30px 0 10px; }
.rtl-yearmark span { font-family: var(--rtl-mono); font-weight: 600; font-size: 13px; color: var(--rtl-fg); background: var(--rtl-panel2); border: 1px solid var(--rtl-line); border-radius: 999px; padding: 5px 14px; }
.rtl-row { position: relative; z-index: 1; display: grid; grid-template-columns: 1fr 248px 1fr; align-items: start; }
.rtl-side { min-width: 0; }
.rtl-left { grid-column: 1; display: flex; justify-content: flex-end; }
.rtl-right { grid-column: 3; display: flex; flex-direction: column; align-items: flex-start; }
.rtl-center { grid-column: 2; display: flex; flex-direction: column; align-items: center; }
.rtl-dot { width: 13px; height: 13px; border-radius: 50%; background: var(--rtl-panel); border: 3px solid var(--rtl-spine); box-shadow: 0 0 0 4px var(--background, #2e2e2e); margin-top: 6px; }
.rtl-card { width: min(100%, 320px); background: var(--rtl-panel); border: 1px solid var(--rtl-line); border-radius: 12px; box-shadow: var(--rtl-shadow); padding: 12px 14px; cursor: pointer; text-align: left; transition: transform 0.12s ease, border-color 0.12s ease; }
.rtl-card:hover, .rtl-card:focus-visible { transform: translateY(-1px); border-color: var(--dotcolor); outline: none; }
.rtl-card:focus-visible { box-shadow: var(--rtl-shadow), 0 0 0 3px var(--dotcolor); }
.rtl-side-app .rtl-card { border-left: 3px solid var(--rtl-app); }
.rtl-side-device .rtl-card { border-right: 3px solid var(--rtl-device); }
.rtl-meta { display: flex; align-items: baseline; gap: 8px; margin-bottom: 2px; }
.rtl-ver { font-family: var(--rtl-mono); font-weight: 600; font-size: 13px; color: var(--dotcolor); }
.rtl-date { font-family: var(--rtl-mono); font-size: 11px; color: var(--rtl-muted); margin-left: auto; }
.rtl-ttl { font-family: var(--rtl-display); font-weight: 600; font-size: 17px; line-height: 1.2; letter-spacing: 0.01em; color: #fff; }
.rtl-peek { font-size: 13px; color: var(--rtl-muted); margin-top: 4px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.rtl-more { margin-top: 7px; font-family: var(--rtl-mono); font-size: 11px; letter-spacing: 0.04em; color: var(--dotcolor); }
.rtl-thumb { width: 220px; max-width: 100%; margin-top: 12px; border-radius: 10px; overflow: hidden; border: 1px solid var(--rtl-line); background: var(--rtl-panel2); box-shadow: var(--rtl-shadow); cursor: pointer; display: block; position: relative; }
.rtl-thumb img { display: block; width: 100%; height: 132px; object-fit: cover; }
.rtl-badge { position: absolute; left: 8px; bottom: 8px; font-family: var(--rtl-mono); font-size: 11px; font-weight: 600; color: #fff; background: rgba(12,14,20,0.72); padding: 3px 8px; border-radius: 6px; }
.rtl-count { position: absolute; right: 8px; top: 8px; font-family: var(--rtl-mono); font-size: 10px; font-weight: 600; color: #fff; background: rgba(12,14,20,0.72); padding: 2px 7px; border-radius: 6px; }
.rtl-play { height: 132px; display: grid; place-items: center; }
.rtl-play span { width: 42px; height: 42px; border-radius: 50%; background: rgba(12,14,20,0.6); color: #fff; display: grid; place-items: center; font-size: 16px; }
.rtl-backdrop { position: fixed; inset: 0; z-index: 40; background: rgba(8,9,12,0.55); }
.rtl-panel { position: fixed; z-index: 50; max-height: min(72vh, 620px); overflow: auto; background: var(--rtl-panel); border: 1px solid var(--rtl-line); border-radius: 14px; box-shadow: var(--rtl-shadow); padding: 18px; }
.rtl-phead { display: flex; align-items: baseline; gap: 10px; margin-bottom: 4px; padding-right: 28px; }
.rtl-ptag { font-family: var(--rtl-mono); font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; padding: 2px 8px; border-radius: 999px; }
.rtl-ptag.rtl-app { color: var(--rtl-app); background: var(--rtl-app-soft); }
.rtl-ptag.rtl-device { color: var(--rtl-device); background: var(--rtl-device-soft); }
.rtl-pver { font-family: var(--rtl-mono); font-weight: 600; font-size: 14px; }
.rtl-pdate { font-family: var(--rtl-mono); font-size: 11px; color: var(--rtl-muted); margin-left: auto; }
.rtl-h3 { font-family: var(--rtl-display); font-weight: 700; font-size: 20px; line-height: 1.2; margin: 6px 0 12px; color: #fff; }
.rtl-close { position: absolute; top: 12px; right: 12px; width: 30px; height: 30px; border-radius: 8px; border: 1px solid var(--rtl-line); background: var(--rtl-panel2); color: var(--rtl-fg); cursor: pointer; font-size: 16px; line-height: 1; display: grid; place-items: center; }
.rtl-ul { margin: 0; padding: 0; list-style: none; display: flex; flex-direction: column; gap: 10px; }
.rtl-ul li { display: flex; gap: 8px; font-size: 14px; }
.rtl-ul li::before { content: "›"; color: var(--rtl-device); font-weight: 700; flex: none; }
.rtl-side-app .rtl-ul li::before { color: var(--rtl-app); }
.rtl-plat { font-family: var(--rtl-mono); font-size: 10px; font-weight: 600; color: var(--rtl-muted); border: 1px solid var(--rtl-line); border-radius: 5px; padding: 0 5px; margin-left: 4px; white-space: nowrap; }
.rtl-para { font-size: 14px; margin: 0 0 10px; }
.rtl-para strong { font-family: var(--rtl-display); font-weight: 700; color: #fff; font-size: 15px; }
.rtl-gallery { display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 8px; margin-top: 14px; }
.rtl-gallery a { display: block; border-radius: 8px; overflow: hidden; border: 1px solid var(--rtl-line); }
.rtl-gallery img { display: block; width: 100%; height: 86px; object-fit: cover; }
.rtl-vid { display: grid; place-items: center; height: 86px; background: var(--rtl-panel2); font-size: 13px; gap: 4px; color: var(--rtl-muted); text-align: center; padding: 6px; }
.rtl-vid b { color: var(--rtl-fg); font-weight: 600; }
.rtl-mobile-media { display: none; }
@media (max-width: 720px) {
  .rtl-spine { left: 13px; }
  .rtl-row { grid-template-columns: 26px 1fr; }
  .rtl-left, .rtl-right { grid-column: 2; align-items: flex-start; }
  .rtl-left { justify-content: flex-start; }
  .rtl-center { grid-column: 1; align-items: flex-start; }
  .rtl-center .rtl-thumb { display: none; }
  .rtl-card { width: 100%; }
  .rtl-side-device .rtl-card { border-right: none; border-left: 3px solid var(--rtl-device); }
  .rtl-mobile-media { display: block; margin-top: 10px; }
  .rtl-mobile-media .rtl-thumb { width: 100%; }
}
@media (prefers-reduced-motion: reduce) { .rtl-card { transition: none; } }
`
