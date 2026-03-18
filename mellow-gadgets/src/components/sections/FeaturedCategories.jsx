import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import GlareHover from '../ui/GlareHover'

const categories = [
  {
    id: 'headphones',
    label: 'Headphones',
    subtitle: 'Noise-cancelling & wireless',
    count: '6 products',
    emoji: '🎧',
    gradient: 'from-blue-600/20 to-blue-900/40',
    border: 'border-blue-500/15',
    glow: 'rgba(37,99,235,0.2)',
  },
  {
    id: 'speakers',
    label: 'Speakers',
    subtitle: 'Portable & bookshelf',
    count: '5 products',
    emoji: '🔊',
    gradient: 'from-cyan-600/20 to-cyan-900/40',
    border: 'border-cyan-500/15',
    glow: 'rgba(8,145,178,0.2)',
  },
  {
    id: 'watches',
    label: 'Smartwatches',
    subtitle: 'Track your every move',
    count: '5 products',
    emoji: '⌚',
    gradient: 'from-indigo-600/20 to-indigo-900/40',
    border: 'border-indigo-500/15',
    glow: 'rgba(99,102,241,0.2)',
  },
  {
    id: 'accessories',
    label: 'Accessories',
    subtitle: 'Chargers, cases & more',
    count: '4 products',
    emoji: '⚡',
    gradient: 'from-violet-600/20 to-violet-900/40',
    border: 'border-violet-500/15',
    glow: 'rgba(139,92,246,0.2)',
  },
  {
    id: 'peripherals',
    label: 'Peripherals',
    subtitle: 'Keyboards, mice & more',
    count: '4 products',
    emoji: '⌨️',
    gradient: 'from-sky-600/20 to-sky-900/40',
    border: 'border-sky-500/15',
    glow: 'rgba(14,165,233,0.2)',
  },
]

export default function FeaturedCategories() {
  return (
    <section className="section-pad relative overflow-hidden">
      {/* Subtle orb */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(37,99,235,0.06) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="section-container relative">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="badge-blue mb-3">Browse by Category</span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white">
              Shop by <span className="gradient-text">Category</span>
            </h2>
          </div>
          <Link
            to="/shop"
            className="hidden sm:flex items-center gap-1.5 text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors group"
          >
            All Categories
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((cat, index) => (
            <Link key={cat.id} to={`/shop?category=${cat.id}`} className="group">
              <GlareHover
                borderRadius="16px"
                glareColor="#60a5fa"
                glareOpacity={0.25}
                glareAngle={-40}
                glareSize={260}
                transitionDuration={800}
                className="w-full"
              >
                <div
                  className={`relative overflow-hidden rounded-2xl border ${cat.border} bg-gradient-to-br ${cat.gradient} backdrop-blur-sm p-6 flex flex-col items-center text-center transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-lg`}
                  style={{
                    boxShadow: `0 0 0 0 ${cat.glow}`,
                    transition: 'box-shadow 0.3s ease, transform 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = `0 8px 32px ${cat.glow}`
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = `0 0 0 0 ${cat.glow}`
                  }}
                >
                  {/* Emoji icon */}
                  <img src={`https://picsum.photos/seed/${cat.emoji || 'cat'}/96/96`} alt={cat.label} className="w-16 h-16 rounded-xl object-cover mb-4 aspect-square transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1" />

                  {/* Label */}
                  <h3 className="font-display font-semibold text-white text-sm sm:text-base leading-tight mb-1">
                    {cat.label}
                  </h3>
                  <p className="text-white/40 text-[11px] leading-tight mb-2">
                    {cat.subtitle}
                  </p>
                  <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-white/[0.06] border border-white/[0.08] text-white/50">
                    {cat.count}
                  </span>

                  {/* Arrow on hover */}
                  <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight size={14} className="text-white/50" />
                  </div>
                </div>
              </GlareHover>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
