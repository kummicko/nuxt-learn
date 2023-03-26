<template>
  <div v-if="showCreateModal">
    <form>
      <textarea v-model="newTask.value" name="" id="" cols="25" rows="8"></textarea>
    </form>
    <div class="flex justify-end mt-4">
    <button @click="createNewTask()" class="small-button bg-green-500 text-white mr-2"><span>&#x2714;</span>Create</button>
    <button @click="showModal=false; showCreateModal=false" class="small-button bg-red-600 text-white"><span>&#x2717;</span>Cancel</button>
    </div>
  </div>
  </template>
  
  <script setup>
    const showModal = useModal()
    const showCreateModal = useCreateModal()
    const taskStore = useTaskStore()
    const newTask = useNewTask
    function createNewTask() {
      if (newTask.value.length > 0) {
        taskStore.createTask(newTask.value)
        newTask.value = ''
        showModal.value = false
        showCreateModal.value = false
      }
    }
  </script>