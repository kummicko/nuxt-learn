<template>
    <div v-if="showDeleteTaskModal">
      <Icon name="material-symbols:delete-forever-rounded" size="96px" color="red" />
      <h3>Are you sure You want to delete task?</h3>
      <h4 class="italic">"{{ taskStore.currentTask.name }}"</h4>
      <div class="flex justify-end mt-4">
        <button @click="deleteCurrentTask()" class="small-button bg-red-500 text-white mr-2"><span>&#x2714;</span>Yes, delete</button>
        <button @click="showModal=false; showDeleteTaskModal=false" class="small-button bg-green-600 text-white"><span>&#x2717;</span>No, cancel</button>
      </div>
    </div>
  </template>
  
  <script setup>
    const showModal = useModal()
    const showDeleteTaskModal = useDeleteTaskModal()
    const taskStore = useTaskStore()
    function deleteCurrentTask() {
      taskStore.deleteTask()
      showModal.value = false
      showDeleteTaskModal.value = false
    }
  </script>