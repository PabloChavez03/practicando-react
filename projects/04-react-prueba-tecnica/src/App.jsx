import { useCatFact } from './hooks/useCatFact'
import { useCatImage } from './hooks/useCatImage'

function App () {
  const { fact, refreshFact } = useCatFact()
  const { imageUrl } = useCatImage({ fact })

  function handleClick () {
    return refreshFact()
  }

  return (
    <div>
      <h1>Cats Facts</h1>
      {imageUrl && (
        <img
          src={imageUrl}
          alt={`image extracted with first word of ${fact}`}
        />
      )}
      <h2>Hecho aleatorio de gatos</h2>
      {fact && <p>{fact}</p>}

      <button onClick={handleClick}>Cambiar</button>
    </div>
  )
}

export default App
