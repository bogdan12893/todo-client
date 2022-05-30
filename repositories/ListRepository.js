export default ($axios) => ({
  async getLists() {
    const response = await $axios.get('/lists')
    return response.data
  },

  async addList(payload) {
    const response = await $axios.post('/lists', payload)
    return response.data
  },
})
