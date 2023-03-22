<template>
  <Modal />
    <div class="grid gap-2">
      <div v-for="task in taskStore.tasks">
        <TaskCard :task="task" />
      </div>
    </div>
</template>

<script setup>
    const taskStore = useTaskStore()
    taskStore.getTasks()
    //const showModal = useModal()
</script>

<style scoped>

</style>