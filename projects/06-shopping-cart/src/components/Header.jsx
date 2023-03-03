import Filters from './Filters'
import { CartIcon } from './Icons'

function Header () {
  return (
    <header>
      <h1>React Cart <CartIcon /></h1>
      <Filters />
    </header>
  )
}

export default Header
