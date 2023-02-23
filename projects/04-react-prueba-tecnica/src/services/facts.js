import { API_FACT_RANDOM } from '../constants'

export function getRandomFact () {
  return (
    fetch(API_FACT_RANDOM)
      .then((res) => res.json())
      .then((data) => {
        const { fact } = data
        return fact
      })
      // entra al catch si solo hubo un error con la peticion, no con la respuesta
      .catch((err) => {
        throw new Error(err.message)
      })
  )
}
