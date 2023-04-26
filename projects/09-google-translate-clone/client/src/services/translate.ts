import { type FromLanguage, type Language } from '../types/types'

interface Translate {
  fromLanguage: FromLanguage
  toLanguage: Language
  fromText: string
}

export async function translate ({ fromLanguage, toLanguage, fromText }: Translate) {
  if (fromText === '') return

  if (fromLanguage === toLanguage) {
    return fromText
  }

  if (fromLanguage === 'auto') {
    const auto = await fetch('http://localhost:3001/translator/auto', {
      method: 'POST',
      body: JSON.stringify({ fromLanguage, toLanguage, fromText }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(async res => await res.json())

    return auto
  }

  const translated = await fetch('http://localhost:3001/translator/translate', {
    method: 'POST',
    body: JSON.stringify({ fromLanguage, toLanguage, fromText }),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(async res => await res.json())

  return translated
}
