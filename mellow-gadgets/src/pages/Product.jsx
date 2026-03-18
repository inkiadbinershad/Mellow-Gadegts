import { useState, useContext } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Star, ShoppingCart, Heart, Truck, ShieldCheck, RefreshCcw, ArrowLeft, Plus, Minus, Check } from 'lucide-react'
import { getProductBySlug, products } from '../data/products'
import { CartContext } from '../context/CartContext'
import { WishlistContext } from '../context/WishlistContext'
import ProductCard from '../components/ProductCard'

export default function Product() {
  const { slug } = useParams()
  const product = getProductBySlug(slug)

  const { addToCart } = useContext(CartContext)
  const { toggleWishlist, isWishlisted } = useContext(WishlistContext)

  const [activeImg, setActiveImg] = useState(0)
  const [qty, setQty] = useState(1)
  const [activeTab, setActiveTab] = useState('description')
  const [addedToCart, setAddedToCart] = useState(false)

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="font-display font-bold text-2xl text-white mb-3">Product not found</h2>
          <Link to="/shop" className="btn-primary">Back to Shop</Link>
        </div>
      </div>
    )
  }

  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4)
  const wishlisted = isWishlisted(product.id)

  const handleAddToCart = () => {
    addToCart(product, qty)
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  const mockReviews = [
    { name: 'Rafiq Ahmed', rating: 5, date: '2 weeks ago', comment: 'Absolutely love this product! The quality is top-notch and delivery was super fast.' },
    { name: 'Nusrat Jahan', rating: 4, date: '1 month ago', comment: 'Great product, exactly as described. Very satisfied with the purchase.' },
    { name: 'Tanvir Islam', rating: 5, date: '1 month ago', comment: 'Best gadget store in Bangladesh. Genuine product, excellent packaging.' },
  ]

  return (
    <main className="min-h-screen">
      <div className="section-container py-8">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-white/35 mb-8">
          <Link to="/" className="hover:text-white/60 transition-colors">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-white/60 transition-colors">Shop</Link>
          <span>/</span>
          <Link to={`/shop?category=${product.category}`} className="hover:text-white/60 transition-colors capitalize">{product.category}</Link>
          <span>/</span>
          <span className="text-white/60 truncate max-w-[200px]">{product.name}</span>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">

          {/* ── Image Gallery ─────────────────────────── */}
          <div className="space-y-4">
            <div className="glass-card rounded-2xl overflow-hidden aspect-square relative group">
              <img
                src={product.images ? product.images[activeImg] : product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {product.discount > 0 && (
                <span className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                  -{product.discount}% OFF
                </span>
              )}
            </div>

            {product.images && product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                      activeImg === i ? 'border-blue-500 shadow-lg shadow-blue-500/20' : 'border-white/[0.08] hover:border-white/20'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Product Info ───────────────────────────── */}
          <div className="py-2">
            <div className="flex items-start justify-between gap-4 mb-3">
              <span className="badge-blue capitalize">{product.category}</span>
              {product.badge && (
                <span className="badge bg-orange-500/15 text-orange-300 border border-orange-500/20">
                  {product.badge}
                </span>
              )}
            </div>

            <h1 className="font-display font-bold text-3xl sm:text-4xl text-white leading-tight mb-4">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-5">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className={i < Math.round(product.rating) ? 'text-yellow-400' : 'text-white/20'} fill={i < Math.round(product.rating) ? 'currentColor' : 'none'} />
                ))}
              </div>
              <span className="text-white font-semibold">{product.rating}</span>
              <span className="text-white/35 text-sm">({product.reviewCount} reviews)</span>
              <span className={`badge ${product.inStock ? 'badge-green' : 'badge-red'}`}>
                {product.inStock ? '✓ In Stock' : '✗ Out of Stock'}
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="font-display font-bold text-4xl text-white">
                ৳{product.price.toLocaleString()}
              </span>
              {product.originalPrice > product.price && (
                <>
                  <span className="text-white/35 text-xl line-through">
                    ৳{product.originalPrice.toLocaleString()}
                  </span>
                  <span className="badge-red">
                    Save ৳{(product.originalPrice - product.price).toLocaleString()}
                  </span>
                </>
              )}
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-2 mb-6">
              {product.features?.map(f => (
                <div key={f} className="flex items-center gap-2 text-sm text-white/65">
                  <Check size={13} className="text-blue-400 flex-shrink-0" />
                  {f}
                </div>
              ))}
            </div>

            {/* Quantity + Add to Cart */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              {/* Qty */}
              <div className="flex items-center glass-card rounded-xl overflow-hidden">
                <button
                  onClick={() => setQty(q => Math.max(1, q - 1))}
                  className="w-10 h-11 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/[0.07] transition-colors"
                >
                  <Minus size={15} />
                </button>
                <span className="w-10 text-center font-semibold text-white text-sm">{qty}</span>
                <button
                  onClick={() => setQty(q => q + 1)}
                  className="w-10 h-11 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/[0.07] transition-colors"
                >
                  <Plus size={15} />
                </button>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`flex-1 flex items-center justify-center gap-2.5 font-semibold py-3 px-6 rounded-xl transition-all duration-300 ${
                  addedToCart
                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25'
                    : 'btn-primary'
                } ${!product.inStock ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {addedToCart ? <><Check size={17} /> Added to Cart</> : <><ShoppingCart size={17} /> Add to Cart</>}
              </button>

              {/* Wishlist */}
              <button
                onClick={() => toggleWishlist(product)}
                className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all border ${
                  wishlisted
                    ? 'bg-red-500/20 border-red-500/30 text-red-400'
                    : 'glass-card text-white/50 hover:text-red-400 hover:border-red-500/20'
                }`}
              >
                <Heart size={18} fill={wishlisted ? 'currentColor' : 'none'} />
              </button>
            </div>

            {/* Delivery info */}
            <div className="glass-card rounded-xl p-4 space-y-3">
              {[
                { icon: Truck, text: 'Free delivery in Dhaka. Express delivery 1–3 days nationwide.', label: 'Delivery' },
                { icon: RefreshCcw, text: '7-day easy return policy. Full refund if not satisfied.', label: 'Returns' },
                { icon: ShieldCheck, text: 'Official warranty. 100% genuine product guaranteed.', label: 'Warranty' },
              ].map(({ icon: Icon, text, label }) => (
                <div key={label} className="flex items-start gap-3">
                  <Icon size={15} className="text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-white/80 text-sm font-medium">{label}: </span>
                    <span className="text-white/45 text-sm">{text}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Tabs ─────────────────────────────────────── */}
        <div className="mb-16">
          <div className="flex border-b border-white/[0.08] mb-8 gap-1">
            {['description', 'specs', 'reviews'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-3 text-sm font-medium capitalize transition-all border-b-2 -mb-px ${
                  activeTab === tab
                    ? 'text-blue-300 border-blue-400'
                    : 'text-white/45 border-transparent hover:text-white/70'
                }`}
              >
                {tab === 'reviews' ? `Reviews (${product.reviewCount})` : tab}
              </button>
            ))}
          </div>

          {activeTab === 'description' && (
            <div className="glass-card rounded-2xl p-6">
              <p className="text-white/65 leading-relaxed text-base">{product.description}</p>
              <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-4">
                {product.features?.map(f => (
                  <div key={f} className="flex items-center gap-2.5 glass-card rounded-xl px-4 py-3">
                    <Check size={14} className="text-blue-400 flex-shrink-0" />
                    <span className="text-white/75 text-sm">{f}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'specs' && (
            <div className="glass-card rounded-2xl overflow-hidden">
              {[
                ['Brand', product.name.split(' ')[0]],
                ['Category', product.category],
                ['Rating', `${product.rating}/5`],
                ['Reviews', product.reviewCount],
                ['Availability', product.inStock ? 'In Stock' : 'Out of Stock'],
                ['Warranty', '1 Year Manufacturer Warranty'],
              ].map(([key, val], i) => (
                <div
                  key={key}
                  className={`flex items-center justify-between px-6 py-4 ${i % 2 === 0 ? 'bg-white/[0.02]' : ''} border-b border-white/[0.05] last:border-none`}
                >
                  <span className="text-white/45 text-sm">{key}</span>
                  <span className="text-white/85 text-sm font-medium capitalize">{val}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-4">
              {mockReviews.map((review, i) => (
                <div key={i} className="glass-card rounded-2xl p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center font-bold text-sm text-white">
                        {review.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-white text-sm">{review.name}</p>
                        <p className="text-white/35 text-xs">{review.date}</p>
                      </div>
                    </div>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, si) => (
                        <Star key={si} size={12} className={si < review.rating ? 'text-yellow-400' : 'text-white/20'} fill={si < review.rating ? 'currentColor' : 'none'} />
                      ))}
                    </div>
                  </div>
                  <p className="text-white/55 text-sm leading-relaxed">{review.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div>
            <h2 className="font-display font-bold text-2xl text-white mb-6">Related Products</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
