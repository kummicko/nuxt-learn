// type TaskObject = {
//     name: string;
//     completed: string;
//     created: string;
//     id: string;
//     project: object;
// }
// type ProjectObject = {
//     name: string;
//     id: string;
//     startDate: string;
// }

// export const useTaskStore = defineStore('taskStore', {
//     state: () => ({
//       tasks: [] as TaskObject[],
//       currentTask: null as unknown as TaskObject || null,
//       projects: [] as ProjectObject[]
//     }),
//     actions: {
//         async getTasks() {
//           const {data: tasks} = await useFetch('/api/tasks')
//           if(tasks.value) {
//             this.tasks = Array.from(JSON.parse(JSON.stringify(tasks.value)))
//           }
//         },
//         setCurrentTask(id: string) {
//           this.currentTask = JSON.parse(JSON.stringify(this.tasks.find(task => task.id === id)))
//         },
//         async createTask(newTask: string) {
//           const taskToAdd = await useFetch('/api/tasks', { method: 'post', body: { name: newTask } })
//           this.tasks.push((taskToAdd.data.value as unknown as TaskObject))
//         },
//         async updateTask(projectId: string) {
//           const { data: taskFromDB }: any = await useFetch('/api/tasks/'+this.currentTask.id,
//                         { method: 'PATCH',
//                           body: JSON.stringify({
//                             name: this.currentTask.name,
//                             completed: this.currentTask.completed,
//                             projectId: projectId
//                           })
//                         })
//         const taskToUpdate: any = this.tasks.find(task => task.id === this.currentTask.id)
//         if(taskToUpdate) {
//           taskToUpdate.name = taskFromDB.value.name
//           taskToUpdate.completed = taskFromDB.value.completed
//           if(taskFromDB.value.project) {
//             console.log(taskFromDB.value.project.name)
//             taskToUpdate.project = taskFromDB.value.project
//           }
//         }
//         },
//         async deleteTask() {
//           this.tasks = this.tasks.filter(task => task.id !== this.currentTask.id)
//           await useFetch('api/tasks/'+this.currentTask.id, { method: 'delete' })
//         },
//         async getProjects() {
//           const {data: projects} = await useFetch('/api/projects')
//           if(projects.value) {
//             this.projects = Array.from(JSON.parse(JSON.stringify(projects.value)))
//           }
//         },
//         async createProject(newProject: string, newProjectStartDate: string, newProjectEndDate: string) {
//           const projectToAdd = await useFetch('/api/projects', { method: 'post', body: { name: newProject, 
//                                                                                          startDate: newProjectStartDate,
//                                                                                          endDate: newProjectEndDate } })
//           this.projects.push((projectToAdd.data.value as unknown as ProjectObject))
//         },
//     }
// })
// import { isProxy, toRaw } from 'vue';
// import project from '~~/server/dbModels/project';
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
          // console.log(this.tasks)
          this.tasksLoaded = true
        }
      },
      setCurrentTask(id) {
        this.currentTask = JSON.parse(JSON.stringify(this.tasks.find(task => task.id === id)))
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
      const taskToUpdate = this.tasks.find(task => task.id === this.currentTask.id)
      if(taskToUpdate) {
        taskToUpdate.name = taskFromDB.value.name
        taskToUpdate.completed = taskFromDB.value.completed
        if(taskFromDB.value.project) {
          // console.log(taskFromDB.value.project.name)
          taskToUpdate.project = taskFromDB.value.project
        }
      }
      },
      async deleteTask() {
        this.tasks = this.tasks.filter(task => task.id !== this.currentTask.id)
        await useFetch('api/tasks/'+this.currentTask.id, { method: 'delete' })
      },
      async getProjects() {
        if(!this.projectsLoaded) {
          const {data: projects} = await useFetch('/api/projects')
          this.projects = projects.value
          // console.log(this.projects)
          this.projectsLoaded = true
        }
        const tasksWithProjects = this.tasks.filter(task => task.project)
        // console.log(tasksWithProjects)
        this.projects.forEach(project => {project.tasks = [], project.taskCount = 0})
        tasksWithProjects.forEach(task => {
          let projectWithTask = this.projects.find(project => project.id === task.project._id)
          // projectWithTask.tasks = []
          projectWithTask.tasks.push(task)
          projectWithTask.taskCount++
        })
        console.log(this.projects)
      },
      async createProject(newProject, newProjectStartDate, newProjectEndDate) {
        const projectToAdd = await useFetch('/api/projects', { method: 'post', body: { name: newProject, 
                                                                                       startDate: newProjectStartDate,
                                                                                       endDate: newProjectEndDate } })
        this.projects.push((projectToAdd.data.value))
      },
      async countTasks() {
        // const filtered = this.tasks.filter(task => task.project)
        // const {data: sub} = await useFetch('/api/tasks')
        // sub.value.filter((task) => {
        //   if(task.project && task.project.name === 'Website') {
        //     console.log(task.project.name)
        //   }
        // })
        // console.log(sub.value.length)
        // return sub.value.length
        const {data: sub} = await useFetch('/api/tasks')
        const projectsWithTasks = sub.value.filter(task => {
          return task.project
        })
        const webProjects = projectsWithTasks.filter((newtask) => {
          return newtask.project.name === 'Website'
        })
        // console.log(projectsWithTasks)
        // console.log(webProjects)
        return projectsWithTasks.length
      }
  }
})