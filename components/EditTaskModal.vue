<template>
  <div v-if="showEditTaskModal">
    <textarea v-model="taskStore.currentTask.name" name="" id="" cols="25" rows="8"></textarea>
    <div class="flex justify-end mt-4">
    <button @click="updateCurrentTask()" class="small-button bg-green-500 text-white mr-2"><span>&#x2714;</span>Update</button>
    <button @click="showModal=false; showEditTaskModal=false" class="small-button bg-red-600 text-white"><span>&#x2717;</span>Cancel</button>
    </div>
  </div>
</template>

<script setup>
  const showModal = useModal()
  const showEditTaskModal = useEditTaskModal()
  const taskStore = useTaskStore()
  function updateCurrentTask() {
    taskStore.updateTask()
    showModal.value = false
    showEditTaskModal.value = false
  }
</script>