import TodoRepository from './TodoRepository'

export default ($axios) => ({
  todo: TodoRepository($axios),
})
