export const state = () => ({
  lists: [],
})

export const getters = {
  lists: (state) => state.lists,
}

export const actions = {
  async getLists({ commit }, payload) {
    try {
      const response = await this.$repositories.list.getLists(payload)
      commit('setLists', response)
      return true
    } catch (error) {
      return error
    }
  },

  async addList({ commit }, payload) {
    try {
      const response = await this.$repositories.list.addList(payload)
      commit('createList', response)
      return true
    } catch (error) {
      return error
    }
  },
}

export const mutations = {
  setLists(state, data) {
    state.lists = data
  },

  createList(state, data) {
    state.lists.unshift(data)
  },
}
