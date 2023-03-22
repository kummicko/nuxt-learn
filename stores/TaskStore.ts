type TaskObject = {
    name: string;
    completed: string;
    created: string;
    id: string;
}

export const useTaskStore = defineStore('taskStore', {
    state: () => ({
      tasks: [] as TaskObject[],
      currentTask: null as unknown as TaskObject || null
    }),
    actions: {
        async getTasks() {
          const {data: tasks} = await useFetch('/api/tasks')
          if(tasks.value) {
            this.tasks = Array.from(JSON.parse(JSON.stringify(tasks.value)))
          }
        },
        setCurrentTask(id: string) {
          this.currentTask = JSON.parse(JSON.stringify(this.tasks.find(task => task.id === id)))
        },
        async updateTask(incomingTask: TaskObject) {
          const taskToUpdate = this.tasks.find(task => task.id === incomingTask.id)
          if(taskToUpdate) {
            taskToUpdate.name = incomingTask.name
            // async (incomingTask: TaskObject) => {
              console.log('task:', incomingTask)
              const body = JSON.stringify({ id: incomingTask.id, name: incomingTask.name, completed: incomingTask.completed })
              console.log(body)
              //await useFetch('/api/tasks', { method: 'PATCH', body: body })
              const res = await fetch('/api/tasks', {
                method: 'PATCH',
                body: body,
                headers: {'Content-Type': 'application/json'}
              })
           }
         }
        // }
    }
})