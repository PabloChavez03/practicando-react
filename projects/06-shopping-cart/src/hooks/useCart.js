import { useContext } from 'react'
import { CartContext } from '../contexts/cart'

export function useCart () {
  const context = useContext(CartContext)
  return context === undefined ? new Error('useCart should be called in CartContext') : context
}
