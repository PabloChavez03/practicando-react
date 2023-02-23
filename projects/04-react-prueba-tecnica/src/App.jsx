import { useState, useEffect } from 'react'
import { IMAGE_PREFIX_CAT_URL } from './constants'
import { getRandomFact } from './services/facts'

function App () {
  const [fact, setFact] = useState('')
  const [imageUrl, setImageUrl] = useState('')

  useEffect(() => {
    getRandomFact().then(setFact)
  }, [])

  useEffect(() => {
    if (fact) {
      const singleWord = fact.split(' ')[0]
      fetch(`https://cataas.com/cat/says/${singleWord}?json=true`)
        .then((res) => res.json())
        .then((data) => {
          const { url } = data
          setImageUrl(url)
        })
    }
  }, [fact])

  function handleClick () {
    getRandomFact().then(setFact)
  }

  return (
    <div>
      <h1>Cats Facts</h1>
      {imageUrl && (
        <img
          src={`${IMAGE_PREFIX_CAT_URL}${imageUrl}`}
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
