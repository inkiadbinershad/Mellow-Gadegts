import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ShoppingCart } from 'lucide-react'
import TiltedCard from '../ui/TiltedCard'
import { CartContext } from '../../context/CartContext'
import { getNewArrivals } from '../../data/products'

export default function NewArrivals() {
  const { addToCart } = useContext(CartContext)
  const newProducts = getNewArrivals()

  const mainProduct  = newProducts[0]
  const sideProduct1 = newProducts[1]
  const sideProduct2 = newProducts[2]

  return (
    <section className="section-pad relative overflow-hidden">
      <div className="section-container relative">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="badge-blue mb-3">Just Dropped</span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white">
              New <span className="gradient-text">Arrivals</span>
            </h2>
          </div>
          <Link to="/shop?filter=new" className="hidden sm:flex items-center gap-1.5 text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors group">
            View All
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="hidden sm:grid gap-4" style={{ gridTemplateColumns: '1fr 1fr', gridTemplateRows: '220px 220px' }}>
          <div style={{ gridColumn: '1', gridRow: '1 / 3' }}>
            {mainProduct && (
              <TiltedCard
                imageSrc={mainProduct.images?.[0] || mainProduct.image}
                altText={mainProduct.name}
                captionText={mainProduct.name}
                containerHeight="452px"
                imageHeight="452px"
                imageWidth="100%"
                rotateAmplitude={18}
                scaleOnHover={1.1}
                showTooltip
                displayOverlayContent
                overlayContent={
                  <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/90 via-black/50 to-transparent rounded-b-2xl">
                    {mainProduct.badge && <div className="badge-blue mb-2 w-fit text-[10px]">{mainProduct.badge}</div>}
                    <h3 className="text-white font-semibold text-base leading-tight mb-3">{mainProduct.name}</h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-white font-bold text-lg">৳{mainProduct.price.toLocaleString()}</span>
                        {mainProduct.originalPrice > mainProduct.price && (
                          <span className="text-white/35 text-sm line-through ml-2">৳{mainProduct.originalPrice.toLocaleString()}</span>
                        )}
                      </div>
                      <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); addToCart(mainProduct) }} className="flex items-center gap-2 btn-primary text-xs px-4 py-2.5">
                        <ShoppingCart size={13} /> Add
                      </button>
                    </div>
                  </div>
                }
              />
            )}
          </div>

          <div style={{ gridColumn: '2', gridRow: '1' }}>
            {sideProduct1 && (
              <TiltedCard
                imageSrc={sideProduct1.images?.[0] || sideProduct1.image}
                altText={sideProduct1.name}
                captionText={sideProduct1.name}
                containerHeight="220px"
                imageHeight="220px"
                imageWidth="100%"
                rotateAmplitude={18}
                scaleOnHover={1.1}
                showTooltip
                displayOverlayContent
                overlayContent={
                  <div className="absolute bottom-0 left-0 right-0 p-3.5 bg-gradient-to-t from-black/90 via-black/50 to-transparent rounded-b-2xl">
                    <p className="text-white font-semibold text-sm truncate mb-1">{sideProduct1.name}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-blue-300 font-bold text-sm">৳{sideProduct1.price.toLocaleString()}</span>
                      <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); addToCart(sideProduct1) }} className="w-7 h-7 rounded-lg bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center transition-all">
                        <ShoppingCart size={12} />
                      </button>
                    </div>
                  </div>
                }
              />
            )}
          </div>

          <div style={{ gridColumn: '2', gridRow: '2' }}>
            {sideProduct2 && (
              <TiltedCard
                imageSrc={sideProduct2.images?.[0] || sideProduct2.image}
                altText={sideProduct2.name}
                captionText={sideProduct2.name}
                containerHeight="220px"
                imageHeight="220px"
                imageWidth="100%"
                rotateAmplitude={18}
                scaleOnHover={1.1}
                showTooltip
                displayOverlayContent
                overlayContent={
                  <div className="absolute bottom-0 left-0 right-0 p-3.5 bg-gradient-to-t from-black/90 via-black/50 to-transparent rounded-b-2xl">
                    <p className="text-white font-semibold text-sm truncate mb-1">{sideProduct2.name}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-blue-300 font-bold text-sm">৳{sideProduct2.price.toLocaleString()}</span>
                      <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); addToCart(sideProduct2) }} className="w-7 h-7 rounded-lg bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center transition-all">
                        <ShoppingCart size={12} />
                      </button>
                    </div>
                  </div>
                }
              />
            )}
          </div>
        </div>

        <div className="sm:hidden mb-6">
          {mainProduct && (
            <TiltedCard
              imageSrc={mainProduct.images?.[0] || mainProduct.image}
              altText={mainProduct.name}
              captionText={mainProduct.name}
              containerHeight="300px"
              imageHeight="300px"
              imageWidth="100%"
              rotateAmplitude={14}
              scaleOnHover={1.05}
              showTooltip
              displayOverlayContent
              overlayContent={
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent rounded-b-2xl">
                  <p className="text-white font-semibold text-sm mb-1">{mainProduct.name}</p>
                  <span className="text-blue-300 font-bold">৳{mainProduct.price.toLocaleString()}</span>
                </div>
              }
            />
          )}
        </div>

        <div className="sm:hidden text-center">
          <Link to="/shop?filter=new" className="btn-outline text-sm">View All New Arrivals</Link>
        </div>
      </div>
    </section>
  )
}
