const OMDB_API_URL = 'https://www.omdbapi.com/?apiKey=bc5cec3e&s='

export function searchMovies ({ search }) {
  return fetch(`${OMDB_API_URL}${search}`)
    .then((response) => {
      if (response.ok) {
        return response.json()
      }

      throw new Error('Error in resquest')
    })
    .then((json) => {
      const movies = json.Search

      return movies.map(movie => ({
        id: movie.imdbID,
        title: movie.Title,
        year: movie.Year,
        poster: movie.Poster
      }))
    })
    .catch((e) => new Error('Error in api url or api key'))
}
