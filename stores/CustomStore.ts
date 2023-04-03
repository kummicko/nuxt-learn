export const useCustomStore = defineStore('customStore', {
    actions: {
        formatDate(d: string) {
            const datum = new Date(d)
            const months = [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December'
            ]
            const days = [
                'Sun',
                'Mon',
                'Tue',
                'Wed',
                'Thu',
                'Fri',
                'Sat'
            ]
            const year = datum.getFullYear()
            const monthName = months[datum.getMonth()]
            const dayName = days[datum.getDay()]
            const date = datum.getDate()
            return `${date} ${monthName} ${year}`
        }
    }
})