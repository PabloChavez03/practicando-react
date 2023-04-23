import { type TodoId, type Todo as TodoType } from '../types'

interface Props extends TodoType {
  onRemoveTodo: ({ id }: TodoId) => void
  onCheckTodo: ({ id, completed }: Pick<TodoType, 'id' | 'completed'>) => void
}

export const Todo: React.FC<Props> = ({ id, title, completed, onRemoveTodo, onCheckTodo }) => {
  return (
    <>
      <div className='view'>
        <input
          type='checkbox'
          className='toggle'
          checked={completed}
          onChange={(evt) => { onCheckTodo({ id, completed: evt.target.checked }) }}
        />
        <label>{title}</label>
        <button className='destroy' onClick={() => { onRemoveTodo({ id }) }} />
      </div>
    </>
  )
}
