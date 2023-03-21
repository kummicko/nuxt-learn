<template>
    <div class="grid gap-2">
      <div v-for="task in taskStore.tasks">
        <TaskCard :task="task" />
      </div>
    </div>
</template>

<script setup>
    const taskStore = useTaskStore()
    taskStore.getTasks()
</script>

<style scoped>

</style>