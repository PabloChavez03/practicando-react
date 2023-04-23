import { Form } from 'react-bootstrap'
import { AUTO_LANGUAGE, SUPPORTED_LANGUAGES } from '../constants'
import { type FromLanguage, type Language } from '../types/types'
import { SectionType } from '../types/enum'

type Props =
  | { type: SectionType.From, value: FromLanguage, onChange: (language: FromLanguage) => void }
  | { type: SectionType.To, value: Language, onChange: (langauge: Language) => void }

const LanguageSelector = ({ onChange, type, value }: Props) => {
  const handleChange = (evt: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(evt.target.value as Language)
  }

  return (
    <Form.Select aria-label='Selecciona el idioma' onChange={handleChange} value={value}>
      {type === SectionType.From && <option value={AUTO_LANGUAGE}>Detectar idioma</option>}

      {Object.entries(SUPPORTED_LANGUAGES).map(([key, literal]) => (
        <option key={key} value={key}>
          {literal}
        </option>
      ))}
    </Form.Select>
  )
}

export default LanguageSelector
