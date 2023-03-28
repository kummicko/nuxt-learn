type TaskObject = {
    name: string;
    completed: string;
    created: string;
    id: string;
}
type ProjectObject = {
    name: string;
    id: string;
}

export const useTaskStore = defineStore('taskStore', {
    state: () => ({
      tasks: [] as TaskObject[],
      currentTask: null as unknown as TaskObject || null,
      projects: [] as ProjectObject[]
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
        async createTask(newTask: string) {
          const taskToAdd = await useFetch('/api/tasks', { method: 'post', body: { name: newTask } })
          this.tasks.push((taskToAdd.data.value as unknown as TaskObject))
        },
        async updateTask() {
          const taskToUpdate = this.tasks.find(task => task.id === this.currentTask.id)
          if(taskToUpdate) {
            taskToUpdate.name = this.currentTask.name
          }
          await useFetch('/api/tasks/'+this.currentTask.id,
                        { method: 'PATCH',
                          body: JSON.stringify({
                            name: this.currentTask.name,
                            completed: this.currentTask.completed
                          })
                        })
        },
        async deleteTask() {
          this.tasks = this.tasks.filter(task => task.id !== this.currentTask.id)
          await useFetch('api/tasks/'+this.currentTask.id, { method: 'delete' })
        },
        async getProjects() {
          const {data: projects} = await useFetch('/api/projects')
          if(projects.value) {
            this.projects = Array.from(JSON.parse(JSON.stringify(projects.value)))
          }
        },
        async createProject(newProject: string, newProjectStartDate: string ) {
          const projectToAdd = await useFetch('/api/projects', { method: 'post', body: { name: newProject, startDate: newProjectStartDate } })
          this.projects.push((projectToAdd.data.value as unknown as ProjectObject))
        }
    }
})