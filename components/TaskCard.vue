<template>
    <div class="card flex flex-col lg:flex-row">
      <div>
          <p class="inline-block align-middle italic mr-4 font-light text-sm text-gray-600"><span class="mr-1">Created:</span>{{ formatDate(task.created) }}</p>
      </div>
      <div class="flex-1">
          <p class="inline-block align-middle font-bold text-gray-500 m4">{{ task.name }} {{ task.id }}</p>
      </div>
      <div class="flex justify-end">
          <!-- <p>delete</p>
          <Icon name="uil:github" size="2rem" /> -->
          <button @click="sendToModal(task)" class="mt-auto italic bg-blue-500 text-sm py-1 px-2 text-white mr-1 rounded" :data-id="task.id"><span>&#x270E;</span> Edit</button>
          <button class="mt-auto italic bg-green-500 text-sm py-1 px-2 text-white mr-1 rounded" :data-id="task.id"><span>&#x2714;</span> Mark completed</button>
          <button v-if="task.completed" class="mt-auto italic bg-red-600 text-sm py-1 px-2 text-white rounded" :data-id="task.id"><span>&#x2717;</span> Delete</button>
      </div>
    </div>
</template>

<script setup>
  const { task } = defineProps(['task'])
  const showModal = useModal()
  const taskStore = useTaskStore()
  function sendToModal(task) {
    taskStore.setCurrentTask(task.id)
    showModal.value = true
  }
// custom Date format
  const formatDate = (d) => {
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
</script>

<style scoped>

</style>