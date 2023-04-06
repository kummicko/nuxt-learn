<template>
    <div>
        {{project.name}}
    </div>
    <div v-for="task in project.tasks">
        <ProjectTaskCard :task="task" />
    </div>
</template>

<script setup>
  const { project } = defineProps(['project'])
  const taskStore = useTaskStore()
</script>

<style scoped>

</style>