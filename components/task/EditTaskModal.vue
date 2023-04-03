<template>
  <div v-if="showEditTaskModal">
    <textarea v-model="taskStore.currentTask.name" name="" id="" cols="25" rows="4" class="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 mb-2"></textarea>
    <label for="projects" class="block mb-2 text-sm font-medium text-gray-900 text-left">Assign to project</label>
    <select v-model="selected.value" id="projects" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
      <option></option>
      <option v-for="option in options" :value="option.id">{{ option.name }}</option>
    </select>
    <div class="flex justify-end mt-4">
    <button @click="updateCurrentTask()" class="small-button bg-green-500 text-white mr-2"><span>&#x2714;</span>Update</button>
    <button @click="showModal=false; showEditTaskModal=false; selected.value=''" class="small-button bg-red-600 text-white"><span>&#x2717;</span>Cancel</button>
    </div>
    {{ selected.id }}
  </div>
</template>

<script setup>
  const showModal = useModal()
  const showEditTaskModal = useEditTaskModal()
  const taskStore = useTaskStore()
  const selected = useSelected
  const options = taskStore.projects.map(project => {
    return { id: project.id, name: project.name }
  })
  function updateCurrentTask() {
    taskStore.updateTask(selected.value)
    showModal.value = false
    showEditTaskModal.value = false
    selected.value = ''
  }
</script>