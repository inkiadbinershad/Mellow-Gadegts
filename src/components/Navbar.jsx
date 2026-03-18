import { useState, useEffect, useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Search, ShoppingCart, Heart, Sun, Moon, Menu, X, Zap, ChevronDown } from 'lucide-react'
import { CartContext } from '../context/CartContext'
import { WishlistContext } from '../context/WishlistContext'
import { ThemeContext } from '../context/ThemeContext'
import { products } from '../data/products'

const navLinks = [
  { label: 'Home',    path: '/' },
  { label: 'Shop',    path: '/shop' },
  { label: 'Deals',   path: '/shop?filter=deals' },
  { label: 'Contact', path: '/contact' },
]

const topbarMessages = [
  '🚀 Free Shipping on orders above ৳999',
  '⚡ Flash Sale — Up to 30% Off Today Only',
  '🔒 100% Genuine Products Guaranteed',
  '💳 Easy EMI on 0% Interest',
  '🎧 New Arrivals Every Week',
  '📦 Express Delivery in Dhaka: Same Day',
]

export default function Navbar() {
  const [scrolled,      setScrolled]      = useState(false)
  const [mobileOpen,    setMobileOpen]    = useState(false)
  const [searchOpen,    setSearchOpen]    = useState(false)
  const [searchQuery,   setSearchQuery]   = useState('')
  const [searchResults, setSearchResults] = useState([])

  const { cartCount }          = useContext(CartContext)
  const { wishlist }           = useContext(WishlistContext)
  const { theme, toggleTheme } = useContext(ThemeContext)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setSearchOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  useEffect(() => {
    if (!searchQuery.trim()) { setSearchResults([]); return }
    const q = searchQuery.toLowerCase()
    setSearchResults(
      products.filter(p =>
        p.name.toLowerCase().includes(q) || p.category.includes(q)
      ).slice(0, 5)
    )
  }, [searchQuery])

  const isActive = (path) => location.pathname === path

  return (
    <>
      <style>{`
        /* ── Marquee keyframes defined here so they always work ── */
        @keyframes topbarMarquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .topbar-track {
          display: inline-flex;
          white-space: nowrap;
          animation: topbarMarquee 30s linear infinite;
        }
        .topbar-track:hover {
          animation-play-state: paused;
        }

        /* ── Glassmorphism navbar classes ── */
        .nav-glass {
          background: rgba(10, 15, 35, 0.45);
          backdrop-filter: blur(28px) saturate(200%) brightness(1.1);
          -webkit-backdrop-filter: blur(28px) saturate(200%) brightness(1.1);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.06),
            inset 0 -1px 0 rgba(37, 99, 235, 0.06),
            0 8px 32px rgba(0, 0, 0, 0.28),
            0 1px 0 rgba(255, 255, 255, 0.03);
        }
        .nav-glass-scrolled {
          background: rgba(8, 12, 30, 0.88);
          backdrop-filter: blur(40px) saturate(220%) brightness(1.05);
          -webkit-backdrop-filter: blur(40px) saturate(220%) brightness(1.05);
          border-bottom: 1px solid rgba(37, 99, 235, 0.22);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.08),
            inset 0 -1px 0 rgba(37, 99, 235, 0.10),
            0 8px 40px rgba(0, 0, 0, 0.45),
            0 0 80px rgba(37, 99, 235, 0.07);
        }
      `}</style>

      {/* ── TOPBAR ─────────────────────────────────────── */}
      <div
        className="relative z-50 overflow-hidden py-2"
        style={{ background: 'linear-gradient(90deg,#1d4ed8,#2563eb,#1d4ed8)' }}
      >
        {/* Fade masks on left and right edges */}
        <div
          className="absolute inset-y-0 left-0 w-16 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, #1d4ed8, transparent)' }}
        />
        <div
          className="absolute inset-y-0 right-0 w-16 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, #1d4ed8, transparent)' }}
        />

        {/* Marquee track — content duplicated so loop is seamless */}
        <div className="topbar-track">
          {/* First copy */}
          {topbarMessages.map((msg, i) => (
            <span
              key={`a-${i}`}
              className="text-white/90 text-[12px] font-medium tracking-wide"
              style={{ marginRight: '56px' }}
            >
              {msg}
            </span>
          ))}
          {/* Second copy — makes seamless loop */}
          {topbarMessages.map((msg, i) => (
            <span
              key={`b-${i}`}
              className="text-white/90 text-[12px] font-medium tracking-wide"
              style={{ marginRight: '56px' }}
            >
              {msg}
            </span>
          ))}
        </div>
      </div>

      {/* ── NAVBAR ─────────────────────────────────────── */}
      <nav
        className={`sticky top-0 z-40 transition-all duration-500 ${
          scrolled ? 'nav-glass-scrolled' : 'nav-glass'
        }`}
      >
        {/* Top shimmer line */}
        <div
          className="h-px"
          style={{
            background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.10),rgba(96,165,250,0.15),rgba(255,255,255,0.10),transparent)',
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[68px]">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group flex-shrink-0">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50 group-hover:scale-105 transition-all duration-300">
                <Zap size={18} className="text-white" fill="white" />
              </div>
              <div className="font-display font-bold text-xl leading-none">
                <span className="gradient-text">Mellow</span>
                <span className="text-white"> Gadgets</span>
              </div>
            </Link>

            {/* Desktop nav links */}
            <ul className="hidden lg:flex items-center gap-1">
              {navLinks.map(link => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 group ${
                      isActive(link.path)
                        ? 'text-blue-300 bg-blue-500/10'
                        : 'text-white/65 hover:text-white hover:bg-white/[0.07]'
                    }`}
                  >
                    {link.label}
                    <span
                      className={`absolute bottom-0.5 left-1/2 -translate-x-1/2 h-0.5 bg-blue-400 rounded-full transition-all duration-300 ${
                        isActive(link.path) ? 'w-4' : 'w-0 group-hover:w-4'
                      }`}
                    />
                  </Link>
                </li>
              ))}
            </ul>

            {/* Right actions */}
            <div className="flex items-center gap-1">

              {/* Search */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className={`p-2.5 rounded-xl transition-all duration-200 ${
                  searchOpen
                    ? 'bg-blue-500/20 text-blue-300'
                    : 'text-white/60 hover:text-white hover:bg-white/[0.08]'
                }`}
              >
                <Search size={19} />
              </button>

              {/* Wishlist */}
              <Link
                to="/wishlist"
                className="relative p-2.5 rounded-xl text-white/60 hover:text-white hover:bg-white/[0.08] transition-all duration-200"
              >
                <Heart size={19} />
                {wishlist.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-gradient-to-br from-blue-400 to-blue-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link
                to="/cart"
                className="relative p-2.5 rounded-xl text-white/60 hover:text-white hover:bg-white/[0.08] transition-all duration-200"
              >
                <ShoppingCart size={19} />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-gradient-to-br from-blue-400 to-blue-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-xl text-white/60 hover:text-white hover:bg-white/[0.08] transition-all duration-300"
                title={theme === 'dark' ? 'Switch to Day Mode' : 'Switch to Night Mode'}
              >
                <span
                  className="block transition-transform duration-500"
                  style={{ transform: theme === 'dark' ? 'rotate(0deg)' : 'rotate(180deg)' }}
                >
                  {theme === 'dark' ? <Sun size={19} /> : <Moon size={19} />}
                </span>
              </button>

              {/* Mobile menu */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2.5 rounded-xl text-white/60 hover:text-white hover:bg-white/[0.08] transition-all duration-200"
              >
                {mobileOpen ? <X size={19} /> : <Menu size={19} />}
              </button>
            </div>
          </div>
        </div>

        {/* Search dropdown */}
        <div className={`overflow-hidden transition-all duration-300 ${searchOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div
            className="border-t border-white/[0.07]"
            style={{ background: 'rgba(8,12,30,0.94)', backdropFilter: 'blur(24px)' }}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="relative">
                <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/35 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search headphones, speakers, watches..."
                  autoFocus={searchOpen}
                  className="input-field pl-11"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              {searchResults.length > 0 && (
                <div className="mt-3 space-y-1">
                  {searchResults.map(p => (
                    <Link
                      key={p.id}
                      to={`/product/${p.slug}`}
                      onClick={() => { setSearchOpen(false); setSearchQuery('') }}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/[0.06] transition-colors group"
                    >
                      <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-white/90 text-sm font-medium truncate group-hover:text-white">{p.name}</p>
                        <p className="text-white/40 text-xs capitalize">{p.category}</p>
                      </div>
                      <span className="text-blue-300 text-sm font-semibold flex-shrink-0">
                        ৳{p.price.toLocaleString()}
                      </span>
                    </Link>
                  ))}
                </div>
              )}

              {searchQuery && searchResults.length === 0 && (
                <p className="text-white/40 text-sm text-center py-4">
                  No results for "{searchQuery}"
                </p>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-30 lg:hidden transition-all duration-300 ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className="absolute inset-0 backdrop-blur-sm"
          style={{ background: 'rgba(5,10,25,0.80)' }}
          onClick={() => setMobileOpen(false)}
        />
        <div
          className={`absolute top-0 right-0 h-full w-72 border-l border-white/[0.08] transition-transform duration-300 ${
            mobileOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          style={{ background: 'rgba(8,12,30,0.97)', backdropFilter: 'blur(32px)' }}
        >
          <div className="flex items-center justify-between p-6 border-b border-white/[0.08]">
            <div className="font-display font-bold text-lg">
              <span className="gradient-text">Mellow</span>
              <span className="text-white"> Gadgets</span>
            </div>
            <button
              onClick={() => setMobileOpen(false)}
              className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10"
            >
              <X size={18} />
            </button>
          </div>

          <nav className="p-6 space-y-1">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive(link.path)
                    ? 'bg-blue-600/20 text-blue-300 border border-blue-500/20'
                    : 'text-white/70 hover:text-white hover:bg-white/[0.06]'
                }`}
              >
                {link.label}
                <ChevronDown size={14} className="-rotate-90 text-white/30" />
              </Link>
            ))}
          </nav>

          <div className="px-6 border-t border-white/[0.08]">
            <div className="flex gap-3 mt-4">
              <Link to="/wishlist" className="flex-1 btn-outline text-center text-sm py-2.5">
                Wishlist ({wishlist.length})
              </Link>
              <Link to="/cart" className="flex-1 btn-primary text-center text-sm py-2.5">
                Cart ({cartCount})
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}