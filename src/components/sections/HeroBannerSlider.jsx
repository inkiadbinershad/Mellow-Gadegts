import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'

const slides = [
  {
    id: 1,
    badge: '🔥 Flash Sale',
    headline: 'Up to 30% Off',
    sub: 'Sony & Bose Headphones',
    description: 'Premium noise-cancelling headphones at unbeatable prices. Today only.',
    cta: 'Shop Headphones',
    ctaLink: '/shop?category=headphones',
    tag: 'Limited Time',
    accent: '#2563eb',
    from: '#0f172a',
    to: '#1e3a5f',
    glow: 'rgba(37,99,235,0.35)',
    emoji: '🎧',
    bigNumber: '30%',
    bigLabel: 'OFF',
  },
  {
    id: 2,
    badge: '⌚ New Arrival',
    headline: 'Apple Watch S9',
    sub: 'Now in Bangladesh',
    description: 'The most powerful Apple Watch. Official warranty. Genuine product guaranteed.',
    cta: 'Shop Smartwatches',
    ctaLink: '/shop?category=watches',
    tag: 'Just Landed',
    accent: '#0891b2',
    from: '#0c1a2e',
    to: '#0c3547',
    glow: 'rgba(8,145,178,0.35)',
    emoji: '⌚',
    bigNumber: '৳32K',
    bigLabel: 'ONLY',
  },
  {
    id: 3,
    badge: '🚀 Best Seller',
    headline: 'JBL Charge 5',
    sub: 'Portable Speaker King',
    description: '20-hour battery. IP67 waterproof. Built-in power bank. Free delivery.',
    cta: 'Shop Speakers',
    ctaLink: '/shop?category=speakers',
    tag: 'Top Rated',
    accent: '#7c3aed',
    from: '#0f0c29',
    to: '#1a1040',
    glow: 'rgba(124,58,237,0.35)',
    emoji: '🔊',
    bigNumber: '20H',
    bigLabel: 'BATTERY',
  },
  {
    id: 4,
    badge: '💳 EMI Offer',
    headline: '0% Interest EMI',
    sub: 'On All Premium Gadgets',
    description: 'Buy now, pay later in easy installments. No hidden charges.',
    cta: 'Explore All',
    ctaLink: '/shop',
    tag: 'Special Offer',
    accent: '#059669',
    from: '#071f12',
    to: '#0a2e1a',
    glow: 'rgba(5,150,105,0.35)',
    emoji: '💳',
    bigNumber: '0%',
    bigLabel: 'INTEREST',
  },
]

export default function HeroBannerSlider() {
  const [current, setCurrent] = useState(0)

  // ── Auto-play — simple, no animating lock ──
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % slides.length)
    }, 4500)
    return () => clearInterval(timer)
  }, [])

  // ── Manual nav — functional updates avoid stale current ──
  const prev = () => setCurrent(c => (c - 1 + slides.length) % slides.length)
  const next = () => setCurrent(c => (c + 1) % slides.length)
  const goTo = (i) => setCurrent(i)

  const slide = slides[current]

  return (
    <div className="relative w-full overflow-hidden" style={{ height: '220px' }}>
      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(28px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes bigNumPop {
          from { opacity: 0; transform: scale(0.85); }
          to   { opacity: 1; transform: scale(1); }
        }
        .slide-content { animation: slideIn 0.5s cubic-bezier(0.16,1,0.3,1) both; }
        .big-num-pop   { animation: bigNumPop 0.55s cubic-bezier(0.16,1,0.3,1) 0.15s both; }
      `}</style>

      {/* Background gradient */}
      <div
        key={`bg-${current}`}
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${slide.from} 0%, ${slide.to} 60%, ${slide.from} 100%)`,
          transition: 'background 0.6s ease',
        }}
      />

      {/* Glow orb */}
      <div
        key={`glow-${current}`}
        className="absolute pointer-events-none"
        style={{
          width: '400px', height: '300px',
          top: '-80px', right: '100px',
          background: `radial-gradient(ellipse, ${slide.glow} 0%, transparent 70%)`,
          filter: 'blur(40px)',
        }}
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.6) 1px,transparent 1px),
                            linear-gradient(90deg,rgba(255,255,255,0.6) 1px,transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Slide content */}
      <div
        key={`content-${current}`}
        className="slide-content section-container h-full flex items-center relative z-10"
      >
        <div className="flex items-center justify-between w-full gap-8">

          {/* Left: text */}
          <div className="flex-1 min-w-0">
            <div
              className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1 rounded-full border mb-3"
              style={{
                background: `${slide.accent}22`,
                borderColor: `${slide.accent}40`,
                color: '#93c5fd',
              }}
            >
              {slide.badge}
              <span className="ml-1 text-white/40 text-[10px] border-l border-white/15 pl-1.5">
                {slide.tag}
              </span>
            </div>

            <h2 className="font-display font-black text-3xl sm:text-4xl text-white leading-tight mb-1">
              {slide.headline}
            </h2>

            <p
              className="font-display font-semibold text-lg mb-2"
              style={{ color: slide.accent === '#2563eb' ? '#93c5fd' : '#6ee7b7' }}
            >
              {slide.sub}
            </p>

            <p className="text-white/45 text-sm leading-relaxed max-w-md mb-4 hidden sm:block">
              {slide.description}
            </p>

            <Link
              to={slide.ctaLink}
              className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-xl text-white transition-all duration-200 hover:scale-[1.03] active:scale-[0.97]"
              style={{
                background: `linear-gradient(135deg, ${slide.accent}, ${slide.accent}cc)`,
                boxShadow: `0 4px 16px ${slide.glow}`,
              }}
            >
              {slide.cta}
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* Right: emoji circle */}
          <div
            className="big-num-pop flex-shrink-0 text-center hidden sm:flex flex-col items-center justify-center"
            style={{
              width: '160px',
              height: '160px',
              background: `radial-gradient(circle, ${slide.accent}30 0%, transparent 70%)`,
              border: `1px solid ${slide.accent}30`,
              borderRadius: '50%',
            }}
          >
            <div style={{ fontSize: '42px', marginBottom: '6px' }}>{slide.emoji}</div>
            <div className="font-display font-black text-2xl text-white leading-none">
              {slide.bigNumber}
            </div>
            <div
              className="text-xs font-bold tracking-widest mt-1"
              style={{ color: slide.accent }}
            >
              {slide.bigLabel}
            </div>
          </div>
        </div>
      </div>

      {/* Prev button */}
      <button
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
        style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}
        aria-label="Previous"
      >
        <ChevronLeft size={16} className="text-white/70" />
      </button>

      {/* Next button */}
      <button
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
        style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}
        aria-label="Next"
      >
        <ChevronRight size={16} className="text-white/70" />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="rounded-full transition-all duration-300"
            style={{
              width: current === i ? '24px' : '6px',
              height: '6px',
              background: current === i ? slide.accent : 'rgba(255,255,255,0.25)',
            }}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}