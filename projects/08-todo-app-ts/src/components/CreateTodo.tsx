import { useState } from 'react'
import { type TodoTitle } from '../types'

interface Props {
  saveTodo: ({ title }: TodoTitle) => void
}

export const CreateTodo: React.FC<Props> = ({ saveTodo }) => {
  const [inputValue, setInputValue] = useState('')

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(evt.target.value)
  }

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>): void => {
    evt.preventDefault()
    saveTodo({ title: inputValue })
    setInputValue(' ')
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        className='new-todo'
        value={inputValue}
        onChange={handleChange}
        placeholder='¿Qué quiere hacer?'
        autoFocus
      />
    </form>
  )
}
