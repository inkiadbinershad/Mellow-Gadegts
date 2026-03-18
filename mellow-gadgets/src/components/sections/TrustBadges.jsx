import { ShieldCheck, Truck, RefreshCcw, Headphones, CreditCard, Award } from 'lucide-react'
import GlareHover from '../ui/GlareHover'

const badges = [
  {
    icon: ShieldCheck,
    title: '100% Genuine',
    description: 'Every product is verified authentic and sourced directly from authorized distributors.',
    color: 'text-emerald-400',
    bg: 'from-emerald-500/10 to-emerald-900/5',
    border: 'border-emerald-500/12',
  },
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: 'Same-day delivery in Dhaka. Express delivery across Bangladesh in 1–3 days.',
    color: 'text-blue-400',
    bg: 'from-blue-500/10 to-blue-900/5',
    border: 'border-blue-500/12',
  },
  {
    icon: RefreshCcw,
    title: 'Easy Returns',
    description: '7-day hassle-free return policy. No questions asked, full refund guaranteed.',
    color: 'text-violet-400',
    bg: 'from-violet-500/10 to-violet-900/5',
    border: 'border-violet-500/12',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Our expert team is always available to help you before and after purchase.',
    color: 'text-cyan-400',
    bg: 'from-cyan-500/10 to-cyan-900/5',
    border: 'border-cyan-500/12',
  },
  {
    icon: CreditCard,
    title: 'Secure Payment',
    description: 'Multiple secure payment options. bKash, Nagad, cards, and cash on delivery.',
    color: 'text-yellow-400',
    bg: 'from-yellow-500/10 to-yellow-900/5',
    border: 'border-yellow-500/12',
  },
  {
    icon: Award,
    title: 'Best Prices',
    description: 'Price match guarantee. Find it cheaper elsewhere? We\'ll beat it.',
    color: 'text-red-400',
    bg: 'from-red-500/10 to-red-900/5',
    border: 'border-red-500/12',
  },
]

export default function TrustBadges() {
  return (
    <section className="section-pad relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(37,99,235,0.3), transparent)' }}
        />
      </div>

      <div className="section-container relative">
        <div className="text-center mb-12">
          <span className="badge-blue mb-3">Why Choose Us</span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-white">
            The Mellow <span className="gradient-text">Promise</span>
          </h2>
          <p className="text-white/45 text-base mt-3 max-w-xl mx-auto">
            We don't just sell gadgets — we build lasting relationships with our customers
            through trust, quality, and outstanding service.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {badges.map((badge) => {
            const Icon = badge.icon
            return (
              <GlareHover
                key={badge.title}
                borderRadius="20px"
                glareColor="#60a5fa"
                glareOpacity={0.2}
                glareAngle={-30}
                glareSize={300}
                transitionDuration={850}
              >
                <div
                  className={`rounded-[20px] border ${badge.border} bg-gradient-to-br ${badge.bg} p-6 flex gap-5 items-start transition-all duration-300 hover:shadow-lg`}
                >
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 bg-white/[0.05] border border-white/[0.07]`}>
                    <Icon size={22} className={badge.color} />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-white text-base mb-1.5">
                      {badge.title}
                    </h3>
                    <p className="text-white/45 text-sm leading-relaxed">
                      {badge.description}
                    </p>
                  </div>
                </div>
              </GlareHover>
            )
          })}
        </div>
      </div>
    </section>
  )
}
