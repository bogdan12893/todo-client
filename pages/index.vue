<template>
  <div class="content">
    <div class="w-100 flex justify-center m-10">
      <h1 class="text-4xl text-gray-600 font-bold">TO DO APP</h1>
    </div>
    <form @submit.prevent="handleAddTodo">
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
          type="button"
          @click="handleUpdate"
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
    <div v-for="todo in todos" :key="todo.id">
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
  name: 'IndexPage',

  data() {
    return {
      title: '',
      selectedTodo: null,
    }
  },

  async fetch() {
    await this.getTodos()
  },

  computed: {
    ...mapGetters({
      todos: 'todo/todos',
    }),
  },

  methods: {
    ...mapActions({
      getTodos: 'todo/getTodos',
      addTodo: 'todo/addTodo',
      deleteTodo: 'todo/deleteTodo',
      updateTodo: 'todo/updateTodo',
    }),

    async handleAddTodo() {
      await this.addTodo({ todo: { title: this.title } })
      this.title = ''
    },

    async handleDeleteTodo(id) {
      await this.deleteTodo(id)
    },

    selectToEdit(data) {
      this.title = data.title
      this.selectedTodo = data
    },

    async handleUpdate() {
      const payload = {
        title: this.title,
        id: this.selectedTodo.id,
        updated_at: Date.now(),
      }
      await this.updateTodo(payload)
      this.title = ''
    },

    async handleToggleComplete(data, completed) {
      const payload = {
        title: data.title,
        id: data.id,
        completed: !data.completed,
        updated_at: Date.now(),
      }
      await this.updateTodo(payload)
    },
  },
}
</script>
