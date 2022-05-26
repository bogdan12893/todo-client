export const state = () => ({
  todos: [],
})

export const getters = {
  todos: (state) => state.todos,
}

export const actions = {
  async getTodos({ commit }, payload) {
    try {
      const response = await this.$repositories.todo.getTodos(payload)
      commit('setTodos', response)
      return true
    } catch (error) {
      return error
    }
  },

  async addTodo({ commit }, payload) {
    try {
      const response = await this.$repositories.todo.addTodo(payload)
      commit('setTodo', response)
      return true
    } catch (error) {
      return error
    }
  },

  async updateTodo({ commit }, payload) {
    try {
      await this.$repositories.todo.updateTodo(payload)
      commit('updateTodoList', payload)
      return true
    } catch (error) {
      return error
    }
  },

  async deleteTodo({ commit }, id) {
    try {
      await this.$repositories.todo.deleteTodo(id)
      commit('removeTodo', id)
      return true
    } catch (error) {
      return error
    }
  },
}

export const mutations = {
  setTodos(state, data) {
    state.todos = data
  },

  setTodo(state, data) {
    state.todos.unshift(data)
  },

  removeTodo(state, id) {
    state.todos = state.todos.filter((todo) => todo.id !== id)
  },

  updateTodoList(state, todoItem) {
    state.todos = state.todos.map((t) => {
      return t.id === todoItem.id ? { ...t, ...todoItem } : t
    })
  },
}
