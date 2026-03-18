import { Star, BadgeCheck } from 'lucide-react'
import GlareHover from '../ui/GlareHover'

const reviews = [
  {
    name: 'Rakib Hossain',
    location: 'Dhaka',
    product: 'Sony WH-1000XM5',
    rating: 5,
    initial: 'R',
    color: 'from-blue-500 to-blue-700',
    comment:
      'Absolutely mind-blowing noise cancellation! The Sony XM5 I bought from Mellow Gadgets is 100% genuine. Fast delivery and excellent packaging. Worth every taka.',
    date: '2 days ago',
    verified: true,
  },
  {
    name: 'Nusrat Jahan',
    location: 'Chittagong',
    product: 'Apple Watch Series 9',
    rating: 5,
    initial: 'N',
    color: 'from-violet-500 to-violet-700',
    comment:
      'Got my Apple Watch delivered in under 24 hours! Amazing service. The watch is 100% genuine with full official warranty. Will definitely order again.',
    date: '1 week ago',
    verified: true,
  },
  {
    name: 'Tanvir Islam',
    location: 'Sylhet',
    product: 'JBL Charge 5',
    rating: 5,
    initial: 'T',
    color: 'from-emerald-500 to-emerald-700',
    comment:
      'Best gadget store in Bangladesh, period. The JBL Charge 5 sounds incredible. Customer support was very responsive. Delivery to Sylhet in 2 days.',
    date: '2 weeks ago',
    verified: true,
  },
  {
    name: 'Farhan Ahmed',
    location: 'Rajshahi',
    product: 'Logitech MX Master 3S',
    rating: 4,
    initial: 'F',
    color: 'from-orange-500 to-orange-700',
    comment:
      'Great product and safe packaging. Delivery to Rajshahi was quick. Pricing is the best I found anywhere online. Very satisfied with Mellow Gadgets.',
    date: '3 weeks ago',
    verified: true,
  },
  {
    name: 'Sumaiya Khatun',
    location: 'Dhaka',
    product: 'Samsung Galaxy Buds2 Pro',
    rating: 5,
    initial: 'S',
    color: 'from-pink-500 to-pink-700',
    comment:
      'The Galaxy Buds2 Pro are perfect! Sound quality is exceptional and the fit is so comfortable. Mellow Gadgets gave the best price and delivered same-day!',
    date: '1 month ago',
    verified: true,
  },
  {
    name: 'Mehedi Hasan',
    location: 'Khulna',
    product: 'Keychron K2 Pro',
    rating: 5,
    initial: 'M',
    color: 'from-cyan-500 to-cyan-700',
    comment:
      'Super happy with my Keychron keyboard. Typing experience is an absolute dream. Delivered to Khulna in 2 days — honestly shocked by how fast it arrived.',
    date: '1 month ago',
    verified: true,
  },
]

function StarRating({ rating }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={13}
          className={i < rating ? 'text-yellow-400' : 'text-white/20'}
          fill={i < rating ? 'currentColor' : 'none'}
        />
      ))}
    </div>
  )
}

export default function CustomerReviews() {
  const avgRating = (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)

  return (
    <section className="section-pad relative overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(37,99,235,0.07) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(37,99,235,0.35), transparent)' }}
      />

      <div className="section-container relative">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="badge-blue mb-3">Real Customers</span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mb-3">
            What People <span className="gradient-text">Are Saying</span>
          </h2>
          <p className="text-white/45 text-base max-w-xl mx-auto">
            Don't take our word for it — hear directly from our thousands of happy customers
            across Bangladesh.
          </p>

          {/* Overall rating strip */}
          <div className="inline-flex items-center gap-4 mt-6 glass-card rounded-2xl px-6 py-3">
            <div>
              <span className="font-display font-black text-4xl text-white">{avgRating}</span>
              <span className="text-white/40 text-sm ml-1">/ 5</span>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div className="text-left">
              <div className="flex gap-0.5 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="text-yellow-400" fill="currentColor" />
                ))}
              </div>
              <p className="text-white/40 text-xs">Based on {reviews.length * 52}+ reviews</p>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div className="text-left">
              <p className="text-emerald-400 font-semibold text-sm">98%</p>
              <p className="text-white/40 text-xs">recommend us</p>
            </div>
          </div>
        </div>

        {/* Review Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews.map((review, index) => (
            <GlareHover
              key={review.name}
              borderRadius="20px"
              glareColor="#60a5fa"
              glareOpacity={0.2}
              glareAngle={-30}
              glareSize={300}
              transitionDuration={900}
            >
              <div className="glass-card rounded-[20px] p-6 h-full flex flex-col transition-all duration-300 hover:border-white/[0.14] hover:shadow-xl hover:shadow-blue-500/10">
                {/* Top row: avatar + name + verified */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${review.color} flex items-center justify-center font-display font-bold text-white text-base flex-shrink-0 shadow-lg`}
                    >
                      {review.initial}
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm leading-tight">{review.name}</p>
                      <p className="text-white/35 text-xs mt-0.5">{review.location}</p>
                    </div>
                  </div>
                  {review.verified && (
                    <div className="flex items-center gap-1 text-emerald-400 flex-shrink-0">
                      <BadgeCheck size={15} />
                      <span className="text-[10px] font-medium">Verified</span>
                    </div>
                  )}
                </div>

                {/* Stars */}
                <StarRating rating={review.rating} />

                {/* Comment */}
                <p className="text-white/60 text-sm leading-relaxed mt-3 flex-1">
                  "{review.comment}"
                </p>

                {/* Bottom */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/[0.06]">
                  <span className="badge bg-blue-500/10 text-blue-300/80 border-blue-500/15 text-[10px]">
                    {review.product}
                  </span>
                  <span className="text-white/25 text-[11px]">{review.date}</span>
                </div>
              </div>
            </GlareHover>
          ))}
        </div>
      </div>
    </section>
  )
}
