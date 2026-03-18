import { Link } from 'react-router-dom'
import { ArrowRight, ShieldCheck, Truck, Zap } from 'lucide-react'
import ClickSpark from '../ui/ClickSpark'

const stats = [
  { value: '10K+',  label: 'Happy Customers' },
  { value: '500+',  label: 'Products' },
  { value: '50+',   label: 'Brands' },
  { value: '1-Day', label: 'Delivery' },
]

const trustPills = [
  { icon: ShieldCheck, text: '100% Genuine',  color: 'text-emerald-300', bg: 'bg-emerald-500/10 border-emerald-500/20' },
  { icon: Truck,       text: 'Free Shipping', color: 'text-blue-300',    bg: 'bg-blue-500/10 border-blue-500/20' },
  { icon: Zap,         text: 'Fast Delivery', color: 'text-yellow-300',  bg: 'bg-yellow-500/10 border-yellow-500/20' },
]

const categoryStrip = [
  { icon: '🎧', label: 'Headphones',   value: '6+ Models', cat: 'headphones'  },
  { icon: '⌚', label: 'Smartwatches', value: '5+ Models', cat: 'watches'      },
  { icon: '🔊', label: 'Speakers',     value: '5+ Models', cat: 'speakers'     },
  { icon: '⌨️', label: 'Peripherals',  value: '4+ Models', cat: 'peripherals'  },
]

export default function HeroSection() {
  return (
    <>
      <style>{`
        @keyframes fadeUpHero {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .hfi-1 { animation: fadeUpHero 0.7s cubic-bezier(0.16,1,0.3,1) 0.10s both; }
        .hfi-2 { animation: fadeUpHero 0.7s cubic-bezier(0.16,1,0.3,1) 0.25s both; }
        .hfi-3 { animation: fadeUpHero 0.7s cubic-bezier(0.16,1,0.3,1) 0.40s both; }
        .hfi-4 { animation: fadeUpHero 0.7s cubic-bezier(0.16,1,0.3,1) 0.55s both; }
        .hfi-5 { animation: fadeUpHero 0.7s cubic-bezier(0.16,1,0.3,1) 0.68s both; }
      `}</style>

      <section
        className="relative flex flex-col overflow-hidden"
        style={{ minHeight: '100vh' }}
      >
        {/* ══════════════════════════════════════════════
            FULL SCREEN VIDEO BACKGROUND
        ══════════════════════════════════════════════ */}
        <div className="absolute inset-0 z-0">

          {/* The video — fills entire section */}
          <video
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            src="/hero-video.mp4"
          />

          {/* Dark gradient overlay — left side darker so text is readable */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(
                105deg,
                rgba(5,10,25,0.95) 0%,
                rgba(10,18,45,0.88) 35%,
                rgba(12,22,50,0.65) 60%,
                rgba(8,15,35,0.40) 100%
              )`,
            }}
          />

          {/* Blue atmosphere on the left */}
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse 60% 70% at 10% 50%, rgba(37,99,235,0.28) 0%, transparent 60%),
                radial-gradient(ellipse 40% 50% at 80% 20%, rgba(56,189,248,0.08) 0%, transparent 55%)
              `,
            }}
          />

          {/* Subtle dot grid */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
            }}
          />
        </div>

        {/* ══════════════════════════════════════════════
            TEXT CONTENT — sits on top of video
        ══════════════════════════════════════════════ */}
        <div
          className="relative z-10 section-container flex-1 flex flex-col justify-center"
          style={{ paddingTop: '6rem', paddingBottom: '4rem' }}
        >
          <div className="max-w-2xl">

            {/* Eyebrow badge */}
            <div className="hfi-1 inline-flex items-center gap-2 badge-blue mb-6">
              <span
                className="w-1.5 h-1.5 rounded-full bg-blue-400"
                style={{ animation: 'pulse 2s ease-in-out infinite' }}
              />
              New Arrivals 2025
            </div>

            {/* Headline */}
            <h1
              className="hfi-2 font-display font-black text-white leading-[0.93] tracking-tight mb-6"
              style={{ fontSize: 'clamp(46px,7vw,86px)' }}
            >
              The Future
              <span className="block gradient-text">of Gadgets,</span>
              <span
                className="block text-white/85 font-bold"
                style={{ fontSize: 'clamp(30px,4.8vw,58px)', marginTop: '6px' }}
              >
                Delivered.
              </span>
            </h1>

            {/* Description */}
            <p className="hfi-3 text-white/65 text-lg sm:text-xl leading-relaxed max-w-lg mb-10">
              Bangladesh's most premium tech store — handpicked gadgets,
              genuine products, and same-day delivery in Dhaka.
            </p>

            {/* CTA Buttons */}
            <div className="hfi-4 flex flex-wrap gap-4 mb-12">
              <ClickSpark sparkColor="#60a5fa" sparkSize={10} sparkRadius={18} sparkCount={8} duration={450}>
                <Link to="/shop" className="btn-primary inline-flex items-center gap-2 text-base px-8 py-4">
                  Shop Now <ArrowRight size={18} />
                </Link>
              </ClickSpark>
              <ClickSpark sparkColor="#93c5fd" sparkSize={8} sparkRadius={14} sparkCount={6} duration={400}>
                <Link to="/shop?filter=deals" className="btn-outline inline-flex items-center gap-2 text-base px-8 py-4">
                  View Deals
                </Link>
              </ClickSpark>
            </div>

            {/* Stats row */}
            <div className="hfi-4 grid grid-cols-4 gap-6 mb-10">
              {stats.map((stat, i) => (
                <div key={i}>
                  <div className="font-display font-bold text-2xl sm:text-3xl text-white">
                    {stat.value}
                  </div>
                  <div className="text-white/45 text-xs leading-tight mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Trust pills */}
            <div className="hfi-5 flex flex-wrap gap-2">
              {trustPills.map(({ icon: Icon, text, color, bg }) => (
                <span
                  key={text}
                  className={`flex items-center gap-1.5 text-xs font-medium px-4 py-2 rounded-full border ${bg} ${color}`}
                >
                  <Icon size={13} /> {text}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════
            BOTTOM CATEGORY STRIP
        ══════════════════════════════════════════════ */}
        <div
          className="relative z-10 border-t border-white/[0.12] py-5"
          style={{
            background: 'rgba(5,10,25,0.80)',
            backdropFilter: 'blur(20px)',
          }}
        >
          <div
            className="absolute top-0 left-0 right-0 h-px pointer-events-none"
            style={{ background: 'linear-gradient(90deg,transparent,rgba(37,99,235,0.55),transparent)' }}
          />
          <div className="section-container">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
              {categoryStrip.map(item => (
                <Link
                  key={item.label}
                  to={`/shop?category=${item.cat}`}
                  className="flex items-center gap-3 justify-center sm:justify-start group"
                >
                  <span className="text-2xl transition-transform duration-300 group-hover:scale-110">
                    {item.icon}
                  </span>
                  <div>
                    <p className="text-white font-semibold text-sm group-hover:text-blue-300 transition-colors">
                      {item.label}
                    </p>
                    <p className="text-white/40 text-xs">{item.value}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}