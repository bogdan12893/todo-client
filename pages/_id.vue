<template>
  <div class="content">
    <div class="w-100 flex justify-center m-10">
      <div class="text-center">
        <h1 class="text-4xl text-gray-600 font-bold">
          TO DO list {{ listId }}
        </h1>
        <nuxt-link to="/" class="text-blue-500">Go to lists</nuxt-link>
      </div>
    </div>
    <form @submit.prevent="handleTodo">
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
          v-if="selectedTodo"
          class="text-white bg-yellow-400 hover:bg-yellow-800 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-yellow-600 dark:hover:bg-yellow-700 focus:outline-none dark:focus:ring-yellow-800 whitespace-nowrap"
          type="submit"
        >
          update
        </button>
        <button
          v-else
          class="text-white bg-green-400 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800 whitespace-nowrap"
          type="submit"
        >
          add to do
        </button>
      </div>
    </form>
    <div v-if="todos.length < 1" class="text-center p-10 text-xl text-gray-500">
      No To do's yet
    </div>
    <div v-for="todo in todos" v-else :key="todo.id">
      <TodoItem
        :todo-data="todo"
        @remove="handleDeleteTodo"
        @edit="selectToEdit"
        @toggleComplete="handleToggleComplete"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'ListPage',

  data() {
    return {
      title: '',
      selectedTodo: null,
    }
  },

  async fetch() {
    await this.getTodos(this.$route.params.id)
  },

  computed: {
    ...mapGetters({
      todos: 'todo/todos',
    }),

    listId() {
      return this.$route.params.id
    },
  },

  methods: {
    ...mapActions({
      getTodos: 'todo/getTodos',
      addTodo: 'todo/addTodo',
      deleteTodo: 'todo/deleteTodo',
      updateTodo: 'todo/updateTodo',
    }),

    async handleTodo() {
      if (this.selectedTodo) {
        this.handleUpdate()
      } else {
        await this.addTodo({
          todo: { title: this.title, list_id: this.listId },
        })
      }
      this.title = ''
      this.selectedTodo = null
    },

    async handleDeleteTodo(id) {
      await this.deleteTodo({ list_id: this.listId, id })
    },

    selectToEdit(data) {
      this.title = data.title
      this.selectedTodo = data
    },

    async handleUpdate() {
      const payload = {
        id: this.selectedTodo.id,
        list_id: this.listId,
        title: this.title,
        updated_at: Date.now(),
      }
      await this.updateTodo(payload)
      this.title = ''
    },

    async handleToggleComplete(data) {
      const payload = {
        id: data.id,
        list_id: this.listId,
        title: data.title,
        completed: !data.completed,
        updated_at: Date.now(),
      }
      await this.updateTodo(payload)
    },
  },
}
</script>
