<template>
  <div v-if="showCreateTaskModal">
    <form>
      <textarea v-model="newTask.value" name="" id="" cols="25" rows="8" class="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"></textarea>
    </form>
    <div class="flex justify-end mt-4">
      <button @click="createNewTask()" class="small-button bg-green-500 text-white mr-2"><span>&#x2714;</span>Create</button>
      <button @click="showModal=false; showCreateTaskModal=false" class="small-button bg-red-600 text-white"><span>&#x2717;</span>Cancel</button>
    </div>
  </div>
  </template>
  
  <script setup>
    const showModal = useModal()
    const showCreateTaskModal = useCreateTaskModal()
    const taskStore = useTaskStore()
    const userStore = useUserStore()
    const newTask = useNewTask
    function createNewTask() {
      if (newTask.value.length > 0) {
        taskStore.createTask(newTask.value, userStore.currentUser.id)
        newTask.value = ''
        showModal.value = false
        showCreateTaskModal.value = false
      }
    }
  </script>