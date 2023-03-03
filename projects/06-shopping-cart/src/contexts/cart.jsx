import { createContext, useReducer } from 'react'
import { reducerCart, initialCartState } from '../reducers/cart'
import { CART_ACTIONS } from '../constants/actionsTypes'
import { saveInLocalStorage } from '../utils/storage'

export const CartContext = createContext()

function useCartReducer () {
  const [state, dispatch] = useReducer(reducerCart, initialCartState)

  function addToCart ({ product }) {
    return dispatch({ type: CART_ACTIONS.ADD_TO_CART, payload: product })
  }

  function removeToCart ({ product }) {
    return dispatch({ type: CART_ACTIONS.REMOVE_TO_CART, payload: product })
  }

  function clearCart () {
    return dispatch({ type: CART_ACTIONS.CLEAR_CART })
  }

  return { state: saveInLocalStorage(state), addToCart, removeToCart, clearCart }
}

export function CartProvider ({ children }) {
  const { state, addToCart, removeToCart, clearCart } = useCartReducer()
  return (
    <CartContext.Provider value={{
      cart: state,
      addToCart,
      removeToCart,
      clearCart
    }}
    >
      {children}
    </CartContext.Provider>
  )
}
