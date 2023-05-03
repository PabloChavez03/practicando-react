import { useState } from 'react'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Todos } from './components/Todos'
import { TODOS_FILTERS } from './consts'
import { type FilterValue, type TodoId, type TodoTitle, type Todo as TodoType } from './types'

const mocks = [{
  id: '1',
  title: 'First todo',
  completed: false
}, {
  id: '2',
  title: 'Second todo',
  completed: false
}, {
  id: '3',
  title: 'Three todo',
  completed: false
}]

const App = (): JSX.Element => {
  const [todos, setTodos] = useState(mocks)
  const [filterSelected, setFilterSelected] = useState<FilterValue>(TODOS_FILTERS.ALL)

  const handleRemove = ({ id }: TodoId): void => {
    const newTodos = todos.filter((todo) => todo.id !== id)
    setTodos(newTodos)
  }

  const handleComplete = ({ id, completed }: Pick<TodoType, 'id' | 'completed'>): void => {
    const newTodos = todos.map((todo) => todo.id === id ? { ...todo, completed } : todo)
    setTodos(newTodos)
  }

  const handleFilterChange = (filter: FilterValue): void => {
    setFilterSelected(filter)
  }

  const handleDeleteCompleted = (): void => {
    const newTodos = todos.filter((todo) => !todo.completed)
    setTodos(newTodos)
  }

  const handleAddTodo = ({ title }: TodoTitle): void => {
    const newTodo = {
      title,
      id: crypto.randomUUID(),
      completed: false
    }

    setTodos([...todos, newTodo])
  }

  const handleEditTodo = ({ id, title }: Pick<TodoType, 'id' | 'title'>): void => {

  }

  const activeCount = todos.filter((todo) => !todo.completed).length
  const completedCount = todos.length - activeCount

  const filteredTodos = todos.filter((todo) => {
    if (filterSelected === TODOS_FILTERS.ACTIVE) return !todo.completed
    if (filterSelected === TODOS_FILTERS.COMPLETED) return todo.completed
    return todo
  })

  return (
    <div className='todoapp'>

      <Header onAddTodo={handleAddTodo} />

      <Todos
        onCheckTodo={handleComplete}
        onRemoveTodo={handleRemove}
        todos={filteredTodos}
      />

      <Footer
        activeCount={activeCount}
        completedCount={completedCount}
        filterSelected={filterSelected}
        handleFilterChange={handleFilterChange}
        onClearCompleted={handleDeleteCompleted}
      />
    </div>
  )
}

export default App
