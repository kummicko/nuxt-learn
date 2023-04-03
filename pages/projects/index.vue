<template>
  <Modal />
    <div>
        <button @click="showModal=true; showCreateProjectModal=true" class="bg-blue-500 rounded shadow shadow-black text-md italic text-white mb-1 px-3 py-1">Create New Project</button>
        <div class="grid gap-3 mt-2">
          <div v-for="project in taskStore.projects">
            <ProjectCard :project="project" />
          </div>
        </div>
    </div>
</template>

<script setup>
  const showModal = useModal()
  const showCreateProjectModal = useCreateProjectModal()
  const taskStore = useTaskStore()
  useHead({
    title: 'Manager | Projects',
    meta: [
      { name: 'description', content: 'Project Manager'}
    ]
  })
</script>

<style scoped>

</style>