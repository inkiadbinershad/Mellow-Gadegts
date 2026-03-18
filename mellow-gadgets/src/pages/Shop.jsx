import { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SlidersHorizontal, X, ChevronDown, Search } from 'lucide-react'
import { products, categories } from '../data/products'
import ProductCard from '../components/ProductCard'
import GlareHover from '../components/ui/GlareHover'

const sortOptions = [
  { value: 'featured',   label: 'Featured' },
  { value: 'newest',     label: 'Newest First' },
  { value: 'price-asc',  label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating',     label: 'Top Rated' },
]

export default function Shop() {
  const [searchParams] = useSearchParams()
  const initCategory = searchParams.get('category') || ''
  const initFilter   = searchParams.get('filter') || ''

  const [selectedCategory, setSelectedCategory] = useState(initCategory)
  const [priceRange, setPriceRange] = useState([0, 40000])
  const [sortBy, setSortBy] = useState('featured')
  const [searchQuery, setSearchQuery] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const filtered = useMemo(() => {
    let list = [...products]

    if (initFilter === 'deals') list = list.filter(p => p.isOnSale && p.discount > 0)
    if (initFilter === 'new')   list = list.filter(p => p.isNew)

    if (selectedCategory) list = list.filter(p => p.category === selectedCategory)
    if (searchQuery)       list = list.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))

    list = list.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1])

    switch (sortBy) {
      case 'newest':     return list.sort((a, b) => b.id - a.id)
      case 'price-asc':  return list.sort((a, b) => a.price - b.price)
      case 'price-desc': return list.sort((a, b) => b.price - a.price)
      case 'rating':     return list.sort((a, b) => b.rating - a.rating)
      default:           return list.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0))
    }
  }, [selectedCategory, priceRange, sortBy, searchQuery, initFilter])

  const clearFilters = () => {
    setSelectedCategory('')
    setPriceRange([0, 40000])
    setSearchQuery('')
    setSortBy('featured')
  }

  const hasFilters = selectedCategory || priceRange[0] > 0 || priceRange[1] < 40000 || searchQuery

  return (
    <main className="min-h-screen">
      {/* Page Header */}
      <div className="relative border-b border-white/[0.07] py-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 to-transparent pointer-events-none" />
        <div className="section-container relative">
          <span className="badge-blue mb-3">All Products</span>
          <h1 className="font-display font-bold text-4xl text-white">
            {initFilter === 'deals' ? '🔥 Flash Deals' :
             initFilter === 'new'   ? '✨ New Arrivals' :
             selectedCategory       ? categories.find(c => c.id === selectedCategory)?.label || 'Shop'
                                    : 'Shop Everything'}
          </h1>
          <p className="text-white/40 text-sm mt-2">{filtered.length} products found</p>
        </div>
      </div>

      <div className="section-container py-10">
        <div className="flex gap-8">

          {/* ── Sidebar ──────────────────────────────────── */}
          {/* Mobile overlay */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          <aside
            className={`fixed lg:static inset-y-0 left-0 z-50 lg:z-auto w-72 lg:w-64 flex-shrink-0 bg-navy-900 lg:bg-transparent border-r border-white/[0.08] lg:border-none overflow-y-auto transition-transform duration-300 lg:translate-x-0 lg:block ${
              sidebarOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            <div className="p-6 lg:p-0 space-y-6">
              {/* Mobile close */}
              <div className="flex items-center justify-between lg:hidden mb-2">
                <span className="font-semibold text-white">Filters</span>
                <button onClick={() => setSidebarOpen(false)} className="p-1.5 rounded-lg hover:bg-white/10 text-white/60">
                  <X size={18} />
                </button>
              </div>

              {/* Search within shop */}
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="input-field pl-9 text-sm"
                />
              </div>

              {/* Categories */}
              <div>
                <h3 className="font-display font-semibold text-white/80 text-sm uppercase tracking-wider mb-4">Categories</h3>
                <div className="space-y-1">
                  <button
                    onClick={() => setSelectedCategory('')}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-all ${
                      !selectedCategory ? 'bg-blue-600/20 text-blue-300 border border-blue-500/20' : 'text-white/55 hover:text-white hover:bg-white/[0.05]'
                    }`}
                  >
                    <span>All Categories</span>
                    <span className="text-xs text-white/30">{products.length}</span>
                  </button>
                  {categories.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-all ${
                        selectedCategory === cat.id ? 'bg-blue-600/20 text-blue-300 border border-blue-500/20' : 'text-white/55 hover:text-white hover:bg-white/[0.05]'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{cat.icon}</span>
                        {cat.label}
                      </span>
                      <span className="text-xs text-white/30">{cat.count}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="font-display font-semibold text-white/80 text-sm uppercase tracking-wider mb-4">Price Range</h3>
                <div className="px-1">
                  <div className="flex justify-between text-xs text-white/40 mb-3">
                    <span>৳{priceRange[0].toLocaleString()}</span>
                    <span>৳{priceRange[1].toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={40000}
                    step={500}
                    value={priceRange[1]}
                    onChange={e => setPriceRange([priceRange[0], Number(e.target.value)])}
                    className="w-full accent-blue-500 cursor-pointer"
                  />
                </div>
              </div>

              {/* Clear Filters */}
              {hasFilters && (
                <button
                  onClick={clearFilters}
                  className="w-full btn-outline text-sm py-2.5 flex items-center justify-center gap-2"
                >
                  <X size={14} />
                  Clear Filters
                </button>
              )}
            </div>
          </aside>

          {/* ── Main Content ─────────────────────────────── */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex items-center justify-between gap-4 mb-6">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden flex items-center gap-2 btn-outline text-sm py-2"
              >
                <SlidersHorizontal size={15} />
                Filters
              </button>

              <span className="hidden lg:block text-white/40 text-sm">
                {filtered.length} results
              </span>

              <div className="flex items-center gap-2 ml-auto">
                <span className="text-white/40 text-sm hidden sm:inline">Sort by:</span>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value)}
                    className="input-field text-sm py-2 pl-3 pr-8 appearance-none cursor-pointer w-auto"
                  >
                    {sortOptions.map(opt => (
                      <option key={opt.value} value={opt.value} className="bg-slate-900">
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Product Grid */}
            {filtered.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {filtered.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="glass-card rounded-2xl py-20 text-center">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="font-display font-semibold text-white text-xl mb-2">No products found</h3>
                <p className="text-white/40 text-sm mb-6">Try adjusting your filters or search term.</p>
                <button onClick={clearFilters} className="btn-primary">Clear Filters</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
