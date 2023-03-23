<template>
    <div v-if="showDeleteModal">
      <!-- <textarea v-model="taskStore.currentTask.name" name="" id="" cols="25" rows="8"></textarea>
      <div class="flex justify-around mt-4">
      <button @click="updateCurrentTask()" class="mt-auto italic bg-green-500 text-sm py-1 px-2 text-white mr-1 rounded"><span>&#x2714;</span>Update</button>
      <button @click="showModal=false; showDeleteModal=false" class="mt-auto italic bg-red-600 text-sm py-1 px-2 text-white rounded"><span>&#x2717;</span>Cancel</button>
      </div> -->
      <Icon name="material-symbols:delete-forever-rounded" size="96px" color="red" />
      <h3>Are you sure?</h3>
      <h4>delete task</h4>
      <h4>{{ taskStore.currentTask.name }}</h4>
    </div>
  </template>
  
  <script setup>
    const showModal = useModal()
    const showDeleteModal = useDeleteModal()
    const taskStore = useTaskStore()
    // function deleteCurrentTask() {
    //   taskStore.deleteTask(taskStore.currentTask)
    //   showModal.value = false
    //   showDeleteModal.value = false
    // }
  </script>