import { type TodoId, type ListOfTodos, type Todo as TodoType } from '../types'
import { Todo } from './Todo'

interface Props {
  todos: ListOfTodos
  onRemoveTodo: ({ id }: TodoId) => void
  onCheckTodo: ({ id, completed }: Pick<TodoType, 'id' | 'completed'>) => void
}

export const Todos: React.FC<Props> = ({ todos, onRemoveTodo, onCheckTodo }) => {
  // para activar el edit, la clase de la lista tiene que ser editing

  return (
    <ul className='todo-list'>
      {todos.map((todo) => {
        let className = `${todo.completed ? 'completed' : ''}`
        return (
          <li key={todo.id} onDoubleClick={() => { className = className + ' editing' }} className={className}>
            <Todo key={todo.id} id={todo.id} title={todo.title} completed={todo.completed} onRemoveTodo={onRemoveTodo} onCheckTodo={onCheckTodo} />
            <input className='edit' value={todo.title} />
          </li>
        )
      })}
    </ul>
  )
}
