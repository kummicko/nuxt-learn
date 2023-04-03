<template>
    <div class="card">
        <p>{{ project.name }} {{ project.taskCount }}</p>
        <p>{{ project.tasks }}</p>
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