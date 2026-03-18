import { createContext, useContext, useEffect, useState } from 'react'

export const WishlistContext = createContext()

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(() => {
    return JSON.parse(localStorage.getItem('mg-wishlist') || '[]')
  })

  useEffect(() => {
    localStorage.setItem('mg-wishlist', JSON.stringify(wishlist))
  }, [wishlist])

  const addToWishlist = (product) => {
    setWishlist(prev => {
      if (prev.find(i => i.id === product.id)) return prev
      return [...prev, product]
    })
  }

  const removeFromWishlist = (id) => {
    setWishlist(prev => prev.filter(i => i.id !== id))
  }

  const toggleWishlist = (product) => {
    if (wishlist.find(i => i.id === product.id)) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  const isWishlisted = (id) => wishlist.some(i => i.id === id)

  return (
    <WishlistContext.Provider value={{
      wishlist,
      addToWishlist,
      removeFromWishlist,
      toggleWishlist,
      isWishlisted,
    }}>
      {children}
    </WishlistContext.Provider>
  )
}

export const useWishlist = () => useContext(WishlistContext)
