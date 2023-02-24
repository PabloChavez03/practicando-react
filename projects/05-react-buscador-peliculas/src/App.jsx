import './App.css'
import responseMovies from './mocks/with-results.json'
// import withoutMovies from './mocks/no-results.json'

function App () {
  const movies = responseMovies.Search
  const hasMovies = movies.length > 0

  return (
    <div className='page'>
      <header>
        <h1>Buscador de películas</h1>
        <form className='form'>
          <input type='text' placeholder='Avenger, Matrix, Cars...' />
          <button type='submit'>Buscar</button>
        </form>
      </header>

      <main>
        {
          hasMovies
            ? (
              <ul>
                {
                movies.map((movie) => (
                  <li key={movie.imdbID}>
                    <h2>{movie.Title}</h2>
                    <img src={movie.Poster} alt={`Poster by movie ${movie.Title}`} />
                    <span>{movie.Year}</span>
                  </li>
                ))
              }
              </ul>
              )
            : (
              <p>No se encontraron resultados para está pelicula</p>
              )
        }
      </main>
    </div>
  )
}

export default App
