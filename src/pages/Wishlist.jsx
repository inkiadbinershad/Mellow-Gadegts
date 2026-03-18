import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Heart, ArrowRight } from 'lucide-react'
import { WishlistContext } from '../context/WishlistContext'
import ProductCard from '../components/ProductCard'

export default function Wishlist() {
  const { wishlist, removeFromWishlist } = useContext(WishlistContext)

  if (wishlist.length === 0) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center py-20">
          <div className="w-24 h-24 rounded-full glass-card flex items-center justify-center mx-auto mb-6">
            <Heart size={36} className="text-white/20" />
          </div>
          <h2 className="font-display font-bold text-3xl text-white mb-3">Your wishlist is empty</h2>
          <p className="text-white/40 text-base mb-8">Save products you love for later.</p>
          <Link to="/shop" className="btn-primary inline-flex items-center gap-2">
            Browse Products <ArrowRight size={16} />
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen">
      <div className="section-container py-10">
        <div className="mb-8">
          <span className="badge-blue mb-3">Saved Items</span>
          <h1 className="font-display font-bold text-3xl sm:text-4xl text-white">
            My Wishlist
          </h1>
          <p className="text-white/40 text-sm mt-1">{wishlist.length} saved item{wishlist.length !== 1 ? 's' : ''}</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {wishlist.map(product => <ProductCard key={product.id} product={product} />)}
        </div>
      </div>
    </main>
  )
}
