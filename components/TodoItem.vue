<template>
  <div class="to-do-item rounded-lg" :class="{ completed: todoData.completed }">
    <h2 class="py-4 font-medium text-2xl">
      {{ todoData.title }}
      {{ todoData.completed ? '✅' : '' }}
    </h2>
    <div class="flex items-center mb-4"></div>
    <span>created: {{ timeSince(todoData.created_at) }}</span>
    <span> | </span>
    <span>updated: {{ timeSince(todoData.updated_at) }}</span>
    <div class="flex mt-4">
      <button
        class="text-white bg-red-400 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
        @click="remove(todoData.id)"
      >
        delete
      </button>
      <button
        class="text-white bg-blue-400 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        @click="edit(todoData)"
      >
        edit
      </button>
      <button
        class="text-white bg-gray-400 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-600 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
        @click="toggleComplete(todoData)"
      >
        {{ todoData.completed ? 'completed' : 'mark as completed' }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TodoItem',

  props: {
    todoData: {
      type: Object,
      default: () => {},
    },
  },

  methods: {
    remove(id) {
      this.$emit('remove', id)
    },

    edit(data) {
      this.$emit('edit', data)
    },

    toggleComplete(data) {
      this.$emit('toggleComplete', data)
    },

    timeSince(date) {
      const formatDate = new Date(date)

      const seconds = Math.floor((new Date() - formatDate) / 1000)

      let interval = seconds / 31536000

      if (interval > 1) {
        return Math.floor(interval) + ' years'
      }
      interval = seconds / 2592000
      if (interval > 1) {
        return Math.floor(interval) + ' months'
      }
      interval = seconds / 86400
      if (interval > 1) {
        return Math.floor(interval) + ' days'
      }
      interval = seconds / 3600
      if (interval > 1) {
        return Math.floor(interval) + ' hours'
      }
      interval = seconds / 60
      if (interval > 1) {
        return Math.floor(interval) + ' minutes'
      }
      return Math.floor(seconds) + ' seconds'
    },
  },
}
</script>

<style scoped>
.to-do-item {
  @apply bg-yellow-100 m-4 p-5;
}

.completed {
  @apply bg-green-200;
}
</style>
