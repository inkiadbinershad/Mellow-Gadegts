import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { getFeaturedProducts } from '../../data/products'
import ProductCard from '../ProductCard'
import FadeIn from '../ui/FadeIn'

export default function OurProducts() {
  const featured = getFeaturedProducts()

  return (
    <section className="section-pad relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[500px] h-[500px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse,rgba(37,99,235,0.06) 0%,transparent 70%)', filter: 'blur(80px)' }} />
      <div className="section-container relative">
        <FadeIn>
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="badge-blue mb-3">Handpicked for You</span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-white">
                Our <span className="gradient-text">Products</span>
              </h2>
            </div>
            <Link to="/shop" className="hidden sm:flex items-center gap-1.5 text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors group">
              View All <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </FadeIn>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {featured.map((product, i) => (
            <FadeIn key={product.id} delay={i * 60}>
              <ProductCard product={product} starBorder />
            </FadeIn>
          ))}
        </div>

        <div className="sm:hidden mt-6 text-center">
          <Link to="/shop" className="btn-outline text-sm">View All Products</Link>
        </div>
      </div>
    </section>
  )
}
