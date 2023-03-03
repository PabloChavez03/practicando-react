import { createContext, useState, useContext } from 'react'

export const FiltersContext = createContext()

export function FiltersProvider ({ children }) {
  const [filters, setFilters] = useState({
    category: 'all',
    minPrice: 0
  })
  return (
    <FiltersContext.Provider value={{ filters, setFilters }}>
      {children}
    </FiltersContext.Provider>
  )
}

export function useFilterContextProvider () {
  const context = useContext(FiltersContext)
  return context === undefined ? new Error('FiltersContext deberia usarse dentro de FilterProvider') : context
}
