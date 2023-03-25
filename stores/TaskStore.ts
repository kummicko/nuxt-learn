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
        toggleCompleted() {
          //let taskToUpdate = this.tasks.find(task => task.id === this.currentTask.id)
          //if(taskToUpdate) {
            if(this.currentTask.completed === 'false') {
              this.currentTask.completed = 'true'
              //taskToUpdate.completed = this.currentTask.completed
            } else {
              this.currentTask.completed = 'false'
              //taskToUpdate.completed = 'false'
              // taskToUpdate.completed = this.currentTask.completed
            }
            // this.updateTask()
          //}
        },
        async updateTask() {
          // const taskToUpdate = this.tasks.find(task => task.id === this.currentTask.id)
          // if(taskToUpdate) {
          //   taskToUpdate.name = this.currentTask.name
          //   taskToUpdate.completed = this.currentTask.completed
            await useFetch('/api/tasks/'+this.currentTask.id,
                { method: 'PATCH',
                  body: JSON.stringify({
                    name: this.currentTask.name,
                    completed: this.currentTask.completed
                  })
                })
        }
    }
})