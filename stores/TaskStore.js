export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    tasks: [],
    currentTask: null,
    projects: [],
    tasksLoaded: false,
    projectsLoaded: false
  }),
  actions: {
      async getTasks() {
        if(!this.tasksLoaded) {
          const {data: tasks} = await useFetch('/api/tasks')
          this.tasks = tasks.value
          this.tasksLoaded = true
        }
      },
      setCurrentTask(id) {
        this.currentTask = this.tasks.find(task => task.id === id)
      },
      async createTask(newTask) {
        const taskToAdd = await useFetch('/api/tasks', { method: 'post', body: { name: newTask } })
        this.tasks.push((taskToAdd.data.value))
      },
      async updateTask(projectId) {
        const { data: taskFromDB } = await useFetch('/api/tasks/'+this.currentTask.id,
                      { method: 'PATCH',
                        body: JSON.stringify({
                          name: this.currentTask.name,
                          completed: this.currentTask.completed,
                          projectId: projectId
                        })
                      })
      const taskToUpdate = this.tasks.find(task => task.id === taskFromDB.value._id)
      if(taskToUpdate) {
        taskToUpdate.name = taskFromDB.value.name
        taskToUpdate.completed = taskFromDB.value.completed
        if(projectId) {
          if(!taskToUpdate.project) {
            const projectToAddTask = this.projects.find(project => project.id === taskFromDB.value.project._id)
            taskToUpdate.project = taskFromDB.value.project
            projectToAddTask.taskCount++
          }
          if(taskFromDB.value.project.id !== projectId) {
            const projectToRemoveTask = this.projects.find(project => project.id === taskToUpdate.project._id)
            const projectToAddTask = this.projects.find(project => project.id === taskFromDB.value.project._id)
            taskToUpdate.project = taskFromDB.value.project
            projectToRemoveTask.tasks = projectToRemoveTask.tasks.filter(task => task.id !== taskToUpdate.id)
            projectToRemoveTask.taskCount--
            projectToAddTask.tasks.push(taskToUpdate)
            projectToAddTask.taskCount++
          }
        }
      }
      },
      async deleteTask() {
        // remove task from Store
        this.tasks = this.tasks.filter(task => task.id !== this.currentTask.id)
        // remove task from project tasks if exists
        const projectTask = this.projects.find(project => project.tasks.includes(this.currentTask))
        projectTask.tasks = projectTask.tasks.filter(task => task.id !== this.currentTask.id)
        projectTask.taskCount--
        // delete task in database
        await useFetch('/api/tasks/'+this.currentTask.id, { method: 'delete' })
      },
      async getProjects() {
        if(!this.projectsLoaded) {
          const {data: projects} = await useFetch('/api/projects')
          this.projects = projects.value
          this.projectsLoaded = true
        }
        // Set empty array for tasks and count to zero
        this.projects.forEach(project => {project.tasks = [], project.taskCount = 0})
        // Find projects with tasks
        const tasksWithProjects = this.tasks.filter(task => task.project)
        tasksWithProjects.forEach(task => {
          let projectWithTask = this.projects.find(project => project.id === task.project._id)
          projectWithTask.tasks.push(task)
          projectWithTask.taskCount++
        })
      },
      async createProject(newProject, newProjectStartDate, newProjectEndDate) {
        const projectToAdd = await useFetch('/api/projects', { method: 'post', body: { name: newProject, 
                                                                                       startDate: newProjectStartDate,
                                                                                       endDate: newProjectEndDate } })
        this.projects.push((projectToAdd.data.value))
      },
      getProject(projectId) {
        const project = this.projects.find(project => project.id === projectId)
        return project
      }
  }
})