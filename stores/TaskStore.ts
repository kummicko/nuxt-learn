type TaskObject = {
    name: string;
    completed: boolean;
}

import { isProxy, toRaw } from 'vue';

let niz = [1,2,3]
console.log(typeof(niz[1]))

export const useTaskStore = defineStore('taskStore', {
    state: () => ({
      tasks: [] as TaskObject[],
    }),
    actions: {
        async getTasks() {
            const {data: tasks} = await useFetch('/api/tasks')
            if(tasks.value) {
                this.tasks = Array.from(JSON.parse(JSON.stringify(tasks.value)))
            }
        }
    }
})