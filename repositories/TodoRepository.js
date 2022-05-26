export default ($axios) => ({
  async getTodos() {
    const response = await $axios.get('/todos')
    return response.data
  },

  async addTodo(payload) {
    const response = await $axios.post('/todos', payload)
    return response.data
  },

  async updateTodo(payload) {
    const response = await $axios.put(`/todos/${payload.id}`, payload)
    return response.data
  },

  async deleteTodo(id) {
    const response = await $axios.delete(`/todos/${id}`)
    return response.data
  },
})
