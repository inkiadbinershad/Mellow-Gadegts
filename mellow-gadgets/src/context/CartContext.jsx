import { createContext, useContext, useEffect, useReducer } from 'react'

export const CartContext = createContext()

const initialState = {
  items: JSON.parse(localStorage.getItem('mg-cart') || '[]'),
}

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find(i => i.id === action.payload.id)
      if (existing) {
        return {
          ...state,
          items: state.items.map(i =>
            i.id === action.payload.id
              ? { ...i, quantity: i.quantity + (action.payload.quantity || 1) }
              : i
          ),
        }
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: action.payload.quantity || 1 }],
      }
    }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(i => i.id !== action.payload) }
    case 'UPDATE_QTY':
      return {
        ...state,
        items: state.items.map(i =>
          i.id === action.payload.id ? { ...i, quantity: action.payload.quantity } : i
        ),
      }
    case 'CLEAR_CART':
      return { ...state, items: [] }
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  useEffect(() => {
    localStorage.setItem('mg-cart', JSON.stringify(state.items))
  }, [state.items])

  const addToCart = (product, qty = 1) =>
    dispatch({ type: 'ADD_ITEM', payload: { ...product, quantity: qty } })

  const removeFromCart = id => dispatch({ type: 'REMOVE_ITEM', payload: id })

  const updateQty = (id, quantity) => {
    if (quantity < 1) return removeFromCart(id)
    dispatch({ type: 'UPDATE_QTY', payload: { id, quantity } })
  }

  const clearCart = () => dispatch({ type: 'CLEAR_CART' })

  const cartCount = state.items.reduce((sum, i) => sum + i.quantity, 0)
  const cartTotal = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0)

  return (
    <CartContext.Provider value={{
      cartItems: state.items,
      addToCart,
      removeFromCart,
      updateQty,
      clearCart,
      cartCount,
      cartTotal,
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
