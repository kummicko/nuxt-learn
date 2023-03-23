<template>
  <div v-if="showEditModal">
    <textarea v-model="taskStore.currentTask.name" name="" id="" cols="25" rows="8"></textarea>
    <div class="flex justify-around mt-4">
    <button @click="updateCurrentTask()" class="mt-auto italic bg-green-500 text-sm py-1 px-2 text-white mr-1 rounded"><span>&#x2714;</span>Update</button>
    <button @click="showModal=false; showEditModal=false" class="mt-auto italic bg-red-600 text-sm py-1 px-2 text-white rounded"><span>&#x2717;</span>Cancel</button>
    </div>
  </div>
</template>

<script setup>
  const showModal = useModal()
  const showEditModal = useEditModal()
  const taskStore = useTaskStore()
  function updateCurrentTask() {
    taskStore.updateTask(taskStore.currentTask)
    showModal.value = false
    showEditModal.value = false
  }
</script>