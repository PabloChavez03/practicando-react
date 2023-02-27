import './App.css'
import { useState, useCallback } from 'react'
import Movies from './components/Movies'
import { useMovies } from './hooks/useMovies'
import { useSearch } from './hooks/useSearch'
import debounce from 'just-debounce-it'

function App () {
  const [sort, setSort] = useState(false)
  const { search, updateSearch, error } = useSearch()
  const { movies, getMovies, loading } = useMovies({ search, sort })

  const debounceGetMovie = useCallback(debounce(search => {
    console.log('search', search)
    getMovies({ search })
  }, 300), [getMovies])

  function handleChange (evt) {
    const newSearch = evt.target.value
    updateSearch(newSearch)
    debounceGetMovie(newSearch)
  }

  function handleSort () {
    setSort(!sort)
  }

  function handleSubmit (evt) {
    evt.preventDefault()
    getMovies({ search })
  }

  return (
    <div className='page'>
      <header>
        <h1>Buscador de películas</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input value={search} type='text' placeholder='Avenger, Matrix, Cars...' onChange={handleChange} style={{ border: '1px solid transparent', borderColor: error ? 'red' : 'transparent' }} />
          <input type='checkbox' onChange={handleSort} checked={sort} />
          <button type='submit'>Buscar</button>
        </form>
        {error && <p style={{ color: 'red', fontSize: 13 }}>{error}</p>}
      </header>

      <main>
        {loading ? <p>Cargando...</p> : <Movies movies={movies} />}
      </main>
    </div>
  )
}

export default App
