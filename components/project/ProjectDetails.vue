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
</script>

<style scoped>

</style>