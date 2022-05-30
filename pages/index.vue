<template>
  <div class="content">
    <div class="w-100 flex justify-center m-10">
      <h1 class="text-4xl text-gray-600 font-bold">TO DO APP</h1>
    </div>
    <form @submit.prevent="handleList">
      <div class="flex items-center m-4">
        <input
          id="todo"
          v-model="title"
          type="todo"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mr-2"
          placeholder="add to do..."
          required
        />
        <button
          class="text-white bg-green-400 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800 whitespace-nowrap"
          type="submit"
        >
          Create List
        </button>
      </div>
    </form>
    <div v-for="list in lists" :key="list.id">
      <nuxt-link :to="`/${list.id}`">
        <div class="rounded-lg bg-purple-100 m-4 p-8 hover:bg-purple-200">
          <h2 class="text-xl font-medium">{{ list.title }}</h2>
          <p>created: {{ timeSince(list.created_at) }}</p>
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { timeSince } from '~/utils/commonUtil'

export default {
  name: 'IndexPage',

  data() {
    return {
      title: '',
    }
  },

  async fetch() {
    await this.getLists()
  },

  computed: {
    ...mapGetters({
      lists: 'list/lists',
    }),
  },

  methods: {
    ...mapActions({
      getLists: 'list/getLists',
      addList: 'list/addList',
    }),

    timeSince,

    async handleList() {
      await this.addList({ list: { title: this.title } })
    },
  },
}
</script>
