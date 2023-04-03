<template>
    <div v-if="showCreateProjectModal">
      <form>
        <div class="grid gap-2">
          <div>
            <label for="project_name" class="block mb-2 text-sm font-medium text-gray-600 text-left">Project Name</label>
            <input v-model="newProject.value" type="text" id="project_name" class="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2" required>
          </div>
          <div>
            <label for="startdate" class="block mb-2 text-sm font-medium text-gray-600  text-left">Start Date</label>
            <input v-model="newProjectStartDate.value" type="date" id="startdate" name="startdate" class="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2" required>
          </div>
          <div>
            <label for="enddate" class="block mb-2 text-sm font-medium text-gray-600 dark:text-white text-left">End Date</label>
            <input v-model="newProjectEndDate.value" type="date" id="enddate" name="enddate" class="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2">
          </div>
        </div>
      </form>
      <div class="flex justify-end mt-4">
        <button @click="createNewProject()" class="small-button bg-green-500 text-white mr-2"><span>&#x2714;</span>Create</button>
        <button @click="showModal=false; showCreateProjectModal=false; newProject.value=''" class="small-button bg-red-600 text-white"><span>&#x2717;</span>Cancel</button>
      </div>
    </div>
</template>

<script setup>
  const showModal = useModal()
  const showCreateProjectModal = useCreateProjectModal()
  const taskStore = useTaskStore()
  const newProject = useNewProject
  const newProjectStartDate = useNewProjectStartDate
  const newProjectEndDate = useNewProjectEndDate
    function createNewProject() {
      if (newProject.value.length > 0) {
        taskStore.createProject(newProject.value, newProjectStartDate.value, newProjectEndDate.value)
        newProject.value = ''
        newProjectStartDate.value = ''
        newProjectEndDate.value = ''
        showModal.value = false
        showCreateProjectModal.value = false
      }
    }
</script>