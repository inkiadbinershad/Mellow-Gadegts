import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, Truck } from 'lucide-react'
import { CartContext } from '../context/CartContext'
import GlareHover from '../components/ui/GlareHover'

export default function Cart() {
  const { cartItems, updateQty, removeFromCart, cartTotal, clearCart } = useContext(CartContext)
  const [coupon, setCoupon] = useState('')
  const [couponApplied, setCouponApplied] = useState(false)

  const shipping = cartTotal >= 999 ? 0 : 80
  const discount = couponApplied ? Math.floor(cartTotal * 0.1) : 0
  const finalTotal = cartTotal - discount + shipping

  const applyCoupon = () => {
    if (coupon.toUpperCase() === 'MELLOW10') {
      setCouponApplied(true)
    }
  }

  if (cartItems.length === 0) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center py-20">
          <div className="w-24 h-24 rounded-full glass-card flex items-center justify-center mx-auto mb-6">
            <ShoppingBag size={36} className="text-white/30" />
          </div>
          <h2 className="font-display font-bold text-3xl text-white mb-3">Your cart is empty</h2>
          <p className="text-white/40 text-base mb-8">Looks like you haven't added anything yet.</p>
          <Link to="/shop" className="btn-primary inline-flex items-center gap-2">
            Start Shopping <ArrowRight size={16} />
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen">
      <div className="section-container py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="badge-blue mb-2">Your Cart</span>
            <h1 className="font-display font-bold text-3xl sm:text-4xl text-white">
              Shopping Cart
            </h1>
          </div>
          <button
            onClick={clearCart}
            className="text-white/35 hover:text-red-400 text-sm flex items-center gap-1.5 transition-colors"
          >
            <Trash2 size={14} />
            Clear All
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map(item => (
              <GlareHover
                key={item.id}
                borderRadius="16px"
                glareColor="#60a5fa"
                glareOpacity={0.15}
                glareSize={350}
                transitionDuration={900}
              >
                <div className="glass-card rounded-2xl p-4 sm:p-5 flex gap-4 sm:gap-5 items-center">
                  {/* Image */}
                  <Link to={`/product/${item.slug}`} className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden glass-card">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </Link>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-blue-400/70 text-[11px] font-medium uppercase tracking-wider capitalize mb-1">{item.category}</p>
                    <Link to={`/product/${item.slug}`}>
                      <h3 className="text-white font-semibold text-sm sm:text-base leading-snug hover:text-blue-300 transition-colors line-clamp-2 mb-2">
                        {item.name}
                      </h3>
                    </Link>
                    <div className="flex items-center justify-between flex-wrap gap-3">
                      {/* Qty control */}
                      <div className="flex items-center glass-card rounded-lg overflow-hidden">
                        <button
                          onClick={() => updateQty(item.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                        >
                          <Minus size={13} />
                        </button>
                        <span className="w-8 text-center text-sm font-semibold text-white">{item.quantity}</span>
                        <button
                          onClick={() => updateQty(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                        >
                          <Plus size={13} />
                        </button>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="font-bold text-white">৳{(item.price * item.quantity).toLocaleString()}</span>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="w-8 h-8 rounded-lg text-white/30 hover:text-red-400 hover:bg-red-500/10 flex items-center justify-center transition-all"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </GlareHover>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="glass-card rounded-2xl p-6 sticky top-24 space-y-5">
              <h2 className="font-display font-bold text-xl text-white">Order Summary</h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/50">Subtotal ({cartItems.reduce((s, i) => s + i.quantity, 0)} items)</span>
                  <span className="text-white font-medium">৳{cartTotal.toLocaleString()}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between">
                    <span className="text-emerald-400">Discount (MELLOW10)</span>
                    <span className="text-emerald-400 font-medium">-৳{discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-white/50 flex items-center gap-1.5">
                    <Truck size={13} />
                    Shipping
                  </span>
                  <span className={shipping === 0 ? 'text-emerald-400 font-medium' : 'text-white font-medium'}>
                    {shipping === 0 ? 'FREE' : `৳${shipping}`}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-white/30 text-xs">Add ৳{(999 - cartTotal).toLocaleString()} more for free shipping</p>
                )}
              </div>

              <div className="border-t border-white/[0.08] pt-4">
                <div className="flex justify-between items-center">
                  <span className="font-display font-semibold text-white">Total</span>
                  <span className="font-display font-bold text-2xl gradient-text">৳{finalTotal.toLocaleString()}</span>
                </div>
              </div>

              {/* Coupon */}
              <div>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
                    <input
                      type="text"
                      value={coupon}
                      onChange={e => setCoupon(e.target.value.toUpperCase())}
                      placeholder="Coupon code"
                      disabled={couponApplied}
                      className="input-field pl-9 text-sm py-2.5"
                    />
                  </div>
                  <button
                    onClick={applyCoupon}
                    disabled={couponApplied || !coupon}
                    className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                      couponApplied
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/20'
                        : 'btn-outline'
                    }`}
                  >
                    {couponApplied ? '✓' : 'Apply'}
                  </button>
                </div>
                {couponApplied && (
                  <p className="text-emerald-400 text-xs mt-2">✓ Coupon MELLOW10 applied — 10% off!</p>
                )}
                <p className="text-white/25 text-xs mt-1.5">Try: MELLOW10</p>
              </div>

              <button className="btn-primary w-full py-4 text-base flex items-center justify-center gap-2">
                Proceed to Checkout
                <ArrowRight size={16} />
              </button>

              <Link to="/shop" className="block text-center text-blue-400 hover:text-blue-300 text-sm transition-colors">
                ← Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
