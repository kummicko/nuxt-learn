import { useTaskStore } from "~~/stores/TaskStore"

export default defineNuxtPlugin(async (nuxtApp) => {
    console.log('Getting data')
    const getData = useTaskStore(nuxtApp.$pinia)
    await getData.getTasks()
    await getData.getProjects()
})