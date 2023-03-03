import { useFilterContextProvider } from '../contexts/filters'

export function useFilters () {
  const { filters } = useFilterContextProvider()

  function filterProducts ({ products }) {
    return products.filter((product) => product.price >= filters.minPrice && (filters.category === 'all' || product.category === filters.category))
  }

  return {
    filters,
    filterProducts
  }
}
