import { useTaskStore } from "~~/stores/TaskStore"

export default defineNuxtPlugin(async (nuxtApp) => {
    console.log('Getting data')
    const taskStore = useTaskStore(nuxtApp.$pinia)
    // await taskStore.getTasks()
    // await taskStore.getProjects()
})