<template>
    <div class="card flex flex-col lg:flex-row">
      <div>
          <p class="inline-block align-middle italic mr-4 font-light text-sm text-gray-600"><span class="mr-1">Created:</span>{{ formatDate(task.created) }}</p>
      </div>
      <div class="flex-1">
          <p class="inline-block align-middle font-bold text-gray-500 text-lg" :class="task.completed ? 'text-decoration: line-through': 'text-decoration: none'">{{ task.name }}</p>
      </div>
      <div class="flex justify-end mt-2 md:mt-0">
          <button v-if="!task.completed" @click="sendTaskToModal(task); showEditTaskModal=true" class="small-button mt-auto bg-blue-500 text-white mr-2"><span class="mr-1">&#x270E;</span>Edit</button>
          <button v-if="!task.completed" @click="task.completed=true; toggleCompleted(task)" class="small-button mt-auto bg-green-500 text-white mr-1"><span class="mr-2">&#x2714;</span>Mark completed</button>
          <button v-if="task.completed" @click="task.completed=false; toggleCompleted(task)" class="small-button mt-auto bg-yellow-500 mr-1"><span class="mr-2">&#x2714;</span>Mark uncompleted</button>
          <button v-if="task.completed" @click="sendTaskToModal(task); showDeleteTaskModal=true" class="small-button mt-auto bg-red-600 text-white"><span class="mr-1">&#x2717;</span>Delete</button> 
      </div>
    </div>
</template>

<script setup>
  const { task } = defineProps(['task'])
  const showModal = useModal()
  const showEditTaskModal = useEditTaskModal()
  const showDeleteTaskModal = useDeleteTaskModal()
  const taskStore = useTaskStore()
  function toggleCompleted(task) {
    taskStore.setCurrentTask(task.id)
    taskStore.updateTask()
  }
  function sendTaskToModal(task) {
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