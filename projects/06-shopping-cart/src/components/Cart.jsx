import './Cart.css'
import { useId } from 'react'
import { CartIcon, ClearCartIcon } from './Icons'
import { useCart } from '../hooks/useCart'
import CartItem from './CartItem'

function Cart () {
  const cartCheckboxId = useId()

  const { cart, addToCart, clearCart } = useCart()

  const hasCart = cart.length > 0

  return (
    <>
      <label htmlFor={cartCheckboxId} className='cart-button'><CartIcon /></label>
      <input type='checkbox' name='' id={cartCheckboxId} hidden />

      <aside className='cart'>
        <ul>
          {hasCart
            ? cart.map(cartItem => (
              <CartItem key={cartItem.id} addToCart={() => addToCart({ product: cartItem })} {...cartItem} />
            ))
            : <>Nada</>}
        </ul>

        <button onClick={clearCart}>
          <ClearCartIcon />
        </button>
      </aside>

    </>
  )
}

export default Cart
