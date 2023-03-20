export const useCounterStore = defineStore('counter', {
    state: () => {
        return { count: 0}
    },
    actions: {
        increment() {
            this.count++
        }
    }
})