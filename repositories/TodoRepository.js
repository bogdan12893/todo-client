/* eslint-disable */
export default ($axios) => ({
  async getTodos(list_id) {
    const response = await $axios.get(`/lists/${list_id}`)
    return response.data
  },

  async addTodo(payload) {
    const response = await $axios.post(
      `/lists/${payload.list_id}/todos`,
      payload
    )
    return response.data
  },

  async updateTodo(payload) {
    const response = await $axios.put(
      `/lists/${payload.list_id}/todos/${payload.id}`,
      payload
    )
    return response.data
  },

  async deleteTodo(payload) {
    const response = await $axios.delete(
      `lists/${payload.list_id}/todos/${payload.id}`
    )
    return response.data
  },
})
