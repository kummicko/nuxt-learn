export const useTaskStore = defineStore('taskStore', {
    state: () => ({
      tasks: []
    }),
    actions: {
        async getTasks() {
            const res = await useFetch('/api/tasks')
            this.tasks = res.data.value
        }
    }
})