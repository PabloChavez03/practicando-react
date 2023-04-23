import { Form } from 'react-bootstrap'
import { SectionType } from '../types/enum'

interface Props {
  type: SectionType
  loading?: boolean
  onChange: (value: string) => void
  value: string
}

const commonStyles = { border: 0, height: '200px', width: '300px' }

const getPlaceholder = ({ type, loading }: { type: SectionType, loading?: boolean }) => {
  if (type === SectionType.From) return 'Introducir texto'
  if (loading === true) return 'Cargando...'

  return 'Traducción'
}

export const TextArea = ({ loading, type, value, onChange }: Props) => {
  const styles = type === SectionType.From ? commonStyles : { ...commonStyles, backgroundColor: '#f5f5f5' }

  const handleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(evt.target.value)
  }
  return (
    <Form.Control
      as='textarea'
      onChange={handleChange}
      placeholder={getPlaceholder({ type, loading })}
      autoFocus={type === SectionType.From}
      style={styles}
      value={value}
    />
  )
}

export default TextArea
