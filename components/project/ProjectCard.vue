<template>
    <div class="card">
      <div class="flex justify-between">
        <p>{{ project.name }}</p>
        <NuxtLink :to="`/projects/${project.id}`" class="small-button bg-blue-500 text-white">Open</NuxtLink>
      </div>
        <p>Tasks {{ project.taskCount }}</p>
        <p v-if="project.startDate" class="italic font-light text-sm text-gray-600">Start: {{ customStore.formatDate(project.startDate) }}</p>
        <p v-if="project.endDate" class="italic font-light text-sm text-gray-600">End: {{ customStore.formatDate(project.endDate) }}</p>
    </div>
</template>

<script setup>
  const { project } = defineProps(['project'])
  const customStore = useCustomStore()
</script>

<style scoped>

</style>