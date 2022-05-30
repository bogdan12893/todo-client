export default ($axios) => ({
  async getTodos(id) {
    const response = await $axios.get(`/lists/${id}/todos`)
    return response.data
  },

  async addTodo(id, payload) {
    const response = await $axios.post(`/lists/${id}/todos`, payload)
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
