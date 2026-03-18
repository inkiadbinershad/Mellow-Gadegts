import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Zap, ArrowRight, ShoppingCart } from 'lucide-react'
import GlareHover from '../ui/GlareHover'
import { CartContext } from '../../context/CartContext'
import { getOnSaleProducts } from '../../data/products'

function useCountdown(targetHours = 8) {
  const [timeLeft, setTimeLeft] = useState(() => {
    const end = new Date()
    end.setHours(end.getHours() + targetHours, 0, 0, 0)
    return Math.max(0, Math.floor((end - Date.now()) / 1000))
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => Math.max(0, prev - 1))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const h = String(Math.floor(timeLeft / 3600)).padStart(2, '0')
  const m = String(Math.floor((timeLeft % 3600) / 60)).padStart(2, '0')
  const s = String(timeLeft % 60).padStart(2, '0')
  return { h, m, s }
}

function TimeBlock({ value, label }) {
  return (
    <div className="flex flex-col items-center">
      <div className="glass-card min-w-[52px] h-[52px] flex items-center justify-center rounded-xl">
        <span className="font-display font-bold text-xl text-white tabular-nums">{value}</span>
      </div>
      <span className="text-white/35 text-[10px] mt-1 uppercase tracking-wider">{label}</span>
    </div>
  )
}

export default function FlashDeals() {
  const { addToCart } = useContext(CartContext)
  const { h, m, s } = useCountdown(8)
  const saleProducts = getOnSaleProducts()

  return (
    <section className="section-pad relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(37,99,235,0.4), transparent)' }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(37,99,235,0.4), transparent)' }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px]"
          style={{
            background: 'radial-gradient(ellipse, rgba(37,99,235,0.08) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
      </div>

      <div className="section-container relative">
        {/* Header with countdown */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-red-500/20 flex items-center justify-center">
                <Zap size={14} className="text-red-400" fill="currentColor" />
              </div>
              <span className="badge bg-red-500/15 text-red-300 border border-red-500/20">Flash Sale</span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white">
              Deals of the <span className="gradient-text">Day</span>
            </h2>
          </div>

          {/* Countdown */}
          <div className="flex items-center gap-3">
            <span className="text-white/40 text-sm font-medium">Ends in:</span>
            <div className="flex items-center gap-2">
              <TimeBlock value={h} label="Hrs" />
              <span className="font-display font-bold text-blue-400 text-xl mb-4">:</span>
              <TimeBlock value={m} label="Min" />
              <span className="font-display font-bold text-blue-400 text-xl mb-4">:</span>
              <TimeBlock value={s} label="Sec" />
            </div>
          </div>
        </div>

        {/* Deals Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {saleProducts.map((product) => (
            <Link key={product.id} to={`/product/${product.slug}`} className="group">
              <GlareHover
                borderRadius="20px"
                glareColor="#ef4444"
                glareOpacity={0.2}
                glareAngle={-25}
                glareSize={300}
                transitionDuration={900}
              >
                <div className="glass-card overflow-hidden rounded-[20px] transition-all duration-300 group-hover:border-white/[0.14] group-hover:shadow-2xl group-hover:shadow-blue-500/10">
                  {/* Image */}
                  <div className="relative overflow-hidden bg-white/[0.03]" style={{ paddingBottom: '75%' }}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className="bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                        -{product.discount}%
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <p className="text-blue-400/70 text-[11px] font-medium uppercase tracking-wider mb-1 capitalize">
                      {product.category}
                    </p>
                    <h3 className="text-white font-semibold text-sm leading-snug mb-3 line-clamp-2 group-hover:text-white/90">
                      {product.name}
                    </h3>

                    {/* Savings bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-[11px] mb-1.5">
                        <span className="text-white/40">Savings</span>
                        <span className="text-emerald-400 font-semibold">
                          ৳{(product.originalPrice - product.price).toLocaleString()} off
                        </span>
                      </div>
                      <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400"
                          style={{ width: `${Math.min(85, 30 + product.discount * 1.5)}%` }}
                        />
                      </div>
                      <p className="text-white/30 text-[10px] mt-1">Limited stock</p>
                    </div>

                    {/* Price + Cart */}
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-white font-bold text-lg">
                          ৳{product.price.toLocaleString()}
                        </div>
                        <div className="text-white/30 text-xs line-through">
                          ৳{product.originalPrice.toLocaleString()}
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          addToCart(product)
                        }}
                        className="flex items-center gap-2 btn-primary text-xs px-4 py-2.5"
                      >
                        <ShoppingCart size={13} />
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              </GlareHover>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-8 text-center">
          <Link
            to="/shop?filter=deals"
            className="inline-flex items-center gap-2 btn-outline"
          >
            See All Deals
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}
