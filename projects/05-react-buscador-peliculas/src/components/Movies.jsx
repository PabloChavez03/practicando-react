function ListOfMovies ({ movies }) {
  return (
    <ul className='movies'>
      {
    movies.map((movie) => (
      <li className='movie' key={movie.id}>
        <h2 style={{ textAlign: 'center' }}>{movie.title}</h2>
        <span>{movie.year}</span>
        <img style={{ height: 300, marginTop: 26 }} src={movie.poster} alt={`Poster by movie ${movie.Title}`} />
      </li>
    ))
  }
    </ul>
  )
}

function NoResultsMovies () {
  return <p>No se encontraron resultados para está pelicula</p>
}

function Movies ({ movies }) {
  const hasMovies = movies.length > 0

  return hasMovies ? <ListOfMovies movies={movies} /> : <NoResultsMovies />
}

export default Movies
