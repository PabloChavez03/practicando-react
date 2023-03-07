import { useEffect } from 'react'

function SearchPage ({ routeParams }) {
  const { query } = routeParams

  useEffect(() => {
    document.title = query
  }, [])
  return (
    <div>Usted a buscado: {query}</div>
  )
}

export default SearchPage
