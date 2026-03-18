import { useCallback, useEffect, useMemo, useRef, useState, memo } from 'react'

const ANIMATION_CONFIG = { SMOOTH_TAU: 0.25, MIN_COPIES: 2, COPY_HEADROOM: 2 }

const toCssLength = (v) => (typeof v === 'number' ? `${v}px` : (v ?? undefined))
const cx = (...parts) => parts.filter(Boolean).join(' ')

function useResizeObserver(callback, elements, dependencies) {
  useEffect(() => {
    if (!window.ResizeObserver) {
      window.addEventListener('resize', callback)
      callback()
      return () => window.removeEventListener('resize', callback)
    }
    const observers = elements.map((ref) => {
      if (!ref.current) return null
      const o = new ResizeObserver(callback)
      o.observe(ref.current)
      return o
    })
    callback()
    return () => observers.forEach((o) => o?.disconnect())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callback, ...dependencies])
}

function useAnimationLoop(trackRef, targetVelocity, seqWidth, isHovered, hoverSpeed) {
  const rafRef = useRef(null)
  const lastTSRef = useRef(null)
  const offsetRef = useRef(0)
  const velRef = useRef(0)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    if (seqWidth > 0) {
      offsetRef.current = ((offsetRef.current % seqWidth) + seqWidth) % seqWidth
      track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`
    }

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

    if (prefersReduced) {
      track.style.transform = 'translate3d(0, 0, 0)'
      return () => { lastTSRef.current = null }
    }

    const animate = (ts) => {
      if (lastTSRef.current === null) lastTSRef.current = ts
      const dt = Math.max(0, ts - lastTSRef.current) / 1000
      lastTSRef.current = ts
      const target = isHovered && hoverSpeed !== undefined ? hoverSpeed : targetVelocity
      velRef.current += (target - velRef.current) * (1 - Math.exp(-dt / ANIMATION_CONFIG.SMOOTH_TAU))
      if (seqWidth > 0) {
        let next = ((offsetRef.current + velRef.current * dt) % seqWidth + seqWidth) % seqWidth
        offsetRef.current = next
        track.style.transform = `translate3d(${-next}px, 0, 0)`
      }
      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      lastTSRef.current = null
    }
  }, [trackRef, targetVelocity, seqWidth, isHovered, hoverSpeed])
}

export const LogoLoop = memo(({
  logos,
  speed = 60,
  direction = 'left',
  width = '100%',
  logoHeight = 48,
  gap = 56,
  pauseOnHover = true,
  hoverSpeed,
  fadeOut = true,
  fadeOutColor,
  scaleOnHover = false,
  ariaLabel = 'Brand logos',
  className,
  style,
}) => {
  const containerRef = useRef(null)
  const trackRef = useRef(null)
  const seqRef = useRef(null)

  const [seqWidth, setSeqWidth] = useState(0)
  const [copyCount, setCopyCount] = useState(ANIMATION_CONFIG.MIN_COPIES)
  const [isHovered, setIsHovered] = useState(false)

  const effectiveHoverSpeed = useMemo(() => {
    if (hoverSpeed !== undefined) return hoverSpeed
    if (pauseOnHover === true) return 0
    return undefined
  }, [hoverSpeed, pauseOnHover])

  const targetVelocity = useMemo(() => {
    const mag = Math.abs(speed)
    const dir = direction === 'left' ? 1 : -1
    return mag * dir * (speed < 0 ? -1 : 1)
  }, [speed, direction])

  const updateDimensions = useCallback(() => {
    const cw = containerRef.current?.clientWidth ?? 0
    const sw = seqRef.current?.getBoundingClientRect()?.width ?? 0
    if (sw > 0) {
      setSeqWidth(Math.ceil(sw))
      setCopyCount(Math.max(ANIMATION_CONFIG.MIN_COPIES, Math.ceil(cw / sw) + ANIMATION_CONFIG.COPY_HEADROOM))
    }
  }, [])

  useResizeObserver(updateDimensions, [containerRef, seqRef], [logos, gap, logoHeight])

  useAnimationLoop(trackRef, targetVelocity, seqWidth, isHovered, effectiveHoverSpeed)

  const cssVars = useMemo(() => ({
    '--ll-gap': `${gap}px`,
    '--ll-height': `${logoHeight}px`,
    ...(fadeOutColor && { '--ll-fade': fadeOutColor }),
  }), [gap, logoHeight, fadeOutColor])

  const handleMouseEnter = useCallback(() => {
    if (effectiveHoverSpeed !== undefined) setIsHovered(true)
  }, [effectiveHoverSpeed])

  const handleMouseLeave = useCallback(() => {
    if (effectiveHoverSpeed !== undefined) setIsHovered(false)
  }, [effectiveHoverSpeed])

  const logoLists = useMemo(() =>
    Array.from({ length: copyCount }, (_, ci) => (
      <ul
        key={`copy-${ci}`}
        className="flex items-center"
        role="list"
        aria-hidden={ci > 0}
        ref={ci === 0 ? seqRef : undefined}
      >
        {logos.map((item, ii) => (
          <li
            key={`${ci}-${ii}`}
            className={cx(
              'flex-none flex items-center justify-center text-[length:var(--ll-height)]',
              'mr-[var(--ll-gap)]',
              scaleOnHover && 'group/item overflow-visible'
            )}
            role="listitem"
          >
            {'node' in item ? (
              <span className={cx(
                'inline-flex items-center text-white/60 hover:text-white/90 transition-colors',
                scaleOnHover && 'transition-transform duration-300 group-hover/item:scale-110'
              )}>
                {item.node}
              </span>
            ) : (
              <img
                src={item.src}
                alt={item.alt ?? ''}
                title={item.title}
                className={cx(
                  'h-[var(--ll-height)] w-auto block object-contain opacity-60 hover:opacity-90 transition-opacity',
                  scaleOnHover && 'transition-transform duration-300 group-hover/item:scale-110'
                )}
                loading="lazy"
                draggable={false}
              />
            )}
          </li>
        ))}
      </ul>
    )),
  [copyCount, logos, scaleOnHover])

  return (
    <div
      ref={containerRef}
      className={cx('relative overflow-x-hidden', className)}
      style={{ width: toCssLength(width) ?? '100%', ...cssVars, ...style }}
      role="region"
      aria-label={ariaLabel}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {fadeOut && (
        <>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[80px]"
            style={{ background: `linear-gradient(to right, ${fadeOutColor || 'var(--fade-color, #0f172a)'}, transparent)` }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-[80px]"
            style={{ background: `linear-gradient(to left, ${fadeOutColor || 'var(--fade-color, #0f172a)'}, transparent)` }}
          />
        </>
      )}
      <div
        ref={trackRef}
        className="flex flex-row w-max will-change-transform select-none"
        style={{ position: 'relative', zIndex: 0 }}
      >
        {logoLists}
      </div>
    </div>
  )
})

LogoLoop.displayName = 'LogoLoop'
export default LogoLoop
