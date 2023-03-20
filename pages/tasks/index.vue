<template>
    <div v-for="task in taskStore.tasks">
        {{ task.name }} - {{ task.completed }}
    </div>
</template>

<script setup>
    const taskStore = useTaskStore()
    taskStore.getTasks()
</script>

<style scoped>

</style>