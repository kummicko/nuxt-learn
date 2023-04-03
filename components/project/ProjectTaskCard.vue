<template>
    <div class="card flex flex-col lg:flex-row">
          <p class="italic mr-4 my-auto font-light text-sm text-gray-600"><span class="mr-1">Created:</span>{{ customStore.formatDate(task.created) }}</p>
      <div class="flex-1 my-auto">
          <p class="font-bold text-gray-500 text-lg" :class="task.completed ? 'text-decoration: line-through': 'text-decoration: none'">{{ task.name }}</p>
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
  const customStore = useCustomStore()
  function toggleCompleted(task) {
    taskStore.setCurrentTask(task.id)
    taskStore.updateTask()
  }
  function sendTaskToModal(task) {
    taskStore.setCurrentTask(task.id)
    showModal.value = true
  }
</script>

<style scoped>

</style>