import TodoRepository from './TodoRepository'
import ListRepository from './ListRepository'

export default ($axios) => ({
  todo: TodoRepository($axios),
  list: ListRepository($axios),
})
