import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Heart, ShoppingCart, Star } from 'lucide-react'
import GlareHover from './ui/GlareHover'
import { CartContext } from '../context/CartContext'
import { WishlistContext } from '../context/WishlistContext'

const badgeStyles = {
  orange: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
  red:    'bg-red-500/20 text-red-300 border-red-500/30',
  green:  'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  blue:   'bg-blue-500/20 text-blue-300 border-blue-500/30',
}

export default function ProductCard({ product, starBorder = false }) {
  const { addToCart }    = useContext(CartContext)
  const { toggleWishlist, isWishlisted } = useContext(WishlistContext)
  const wishlisted = isWishlisted(product.id)

  const handleAddToCart = (e) => { e.preventDefault(); e.stopPropagation(); addToCart(product) }
  const handleWishlist  = (e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(product) }

  const inner = (
    <GlareHover
      borderRadius="16px"
      glareColor="#60a5fa"
      glareOpacity={0.30}
      glareAngle={-30}
      glareSize={280}
      transitionDuration={900}
      className="w-full"
    >
      <div className="glass-card overflow-hidden transition-all duration-300 group-hover:border-white/[0.14] group-hover:shadow-xl group-hover:shadow-blue-500/10 cursor-pointer">
        <div className="relative overflow-hidden bg-white/[0.03]" style={{ paddingBottom: '100%' }}>
          <img src={product.image} alt={product.name}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy" />
          {product.badge && (
            <span className={`absolute top-3 left-3 text-[11px] font-semibold px-2.5 py-1 rounded-full border ${badgeStyles[product.badgeColor] || badgeStyles.blue}`}>
              {product.badge}
            </span>
          )}
          {product.discount > 0 && (
            <span className="absolute top-3 right-3 bg-red-500 text-white text-[11px] font-bold px-2 py-1 rounded-full">
              -{product.discount}%
            </span>
          )}
          <button onClick={handleWishlist}
            className={`absolute bottom-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-sm ${
              wishlisted ? 'bg-red-500/90 text-white' : 'bg-black/40 text-white/70 hover:bg-red-500/80 hover:text-white opacity-0 group-hover:opacity-100'
            }`} aria-label="Wishlist">
            <Heart size={14} fill={wishlisted ? 'currentColor' : 'none'} />
          </button>
        </div>
        <div className="p-4">
          <p className="text-blue-400/70 text-[11px] font-medium uppercase tracking-wider mb-1.5 capitalize">
            {product.category}
          </p>
          <h3 className="text-white/90 font-semibold text-sm leading-snug mb-2 line-clamp-2 group-hover:text-white transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center gap-1.5 mb-3">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={11}
                  className={i < Math.round(product.rating) ? 'text-yellow-400' : 'text-white/20'}
                  fill={i < Math.round(product.rating) ? 'currentColor' : 'none'} />
              ))}
            </div>
            <span className="text-white/40 text-[11px]">({product.reviewCount})</span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-white font-bold text-base">৳{product.price.toLocaleString()}</span>
              {product.originalPrice > product.price && (
                <span className="text-white/30 text-xs line-through ml-1.5">৳{product.originalPrice.toLocaleString()}</span>
              )}
            </div>
            <button onClick={handleAddToCart}
              className="w-8 h-8 rounded-xl bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 shadow-md shadow-blue-500/30"
              aria-label="Add to cart">
              <ShoppingCart size={14} />
            </button>
          </div>
        </div>
      </div>
    </GlareHover>
  )

  return (
    <Link to={`/product/${product.slug}`} className="block group">
      {starBorder ? (
        <div className="star-card w-full">
          <div className="star-card-inner">{inner}</div>
        </div>
      ) : inner}
    </Link>
  )
}
