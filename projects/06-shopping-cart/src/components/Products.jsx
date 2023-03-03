import { useCart } from '../hooks/useCart'
import { AddToCartIcon, RemoveFromCartIcon } from './Icons'
import './Products.css'

function Products ({ products }) {
  const { cart, addToCart, removeToCart } = useCart()
  const checkProductInCart = (product) => cart.some((p) => p.id === product.id)

  return (
    <main className='products'>
      <ul>
        {products.slice(0, 10).map((product) => {
          const isProductInCart = checkProductInCart(product)
          return (
            <li key={product.id}>
              <img
                src={product.thumbnail}
                alt={`product by category ${product.category}`}
              />
              <div>
                <span>
                  <strong>{product.title}</strong> - ${product.price}
                </span>
              </div>
              <button style={{ backgroundColor: isProductInCart ? '#ee2255' : '#77aaee', opacity: 0.9 }} onClick={() => isProductInCart ? removeToCart({ product }) : addToCart({ product })}>
                {isProductInCart ? <RemoveFromCartIcon /> : <AddToCartIcon />}
              </button>
            </li>
          )
        })}
      </ul>
    </main>
  )
}

export default Products
