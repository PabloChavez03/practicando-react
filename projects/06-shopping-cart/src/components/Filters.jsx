import { useId } from 'react'
import './Filters.css'
import { useFilterContextProvider } from '../contexts/filters'

function Filters () {
  const idPrice = useId()
  const idCategory = useId()
  const { filters, setFilters } = useFilterContextProvider()

  function handleChangeFilters (evt) {
    const name = evt.target.name
    const value = evt.target.value
    setFilters(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <section className='filters'>
      <div>
        <label htmlFor={idPrice}>Precio</label>
        <input onChange={handleChangeFilters} type='range' id={idPrice} min='0' max='1000' name='minPrice' value={filters.minPrice} />
        <span>${filters.minPrice}</span>
      </div>
      <div>
        <label htmlFor={idCategory}>Categorías</label>
        <select name='category' id={idCategory} onChange={handleChangeFilters}>
          <option value='all'>Todas</option>
          <option value='laptops'>Notebooks</option>
          <option value='smartphones'>Celulares</option>
        </select>
      </div>
    </section>
  )
}

export default Filters
