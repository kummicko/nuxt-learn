<template>
  <Modal />
    <!-- <div class="grid gap-2">
      <div class="flex">
        <button @click="showModal=true; showCreateModal=true" class="bg-blue-500 rounded shadow shadow-black text-md text-white mb-1 px-3 py-1">Create New Task</button>
      </div>
      <div v-for="task in taskStore.tasks">
        <TaskCard :task="task" />
      </div>
    </div> -->
    <div class="grid gap-2">
      <div class="flex">
        <button @click="showModal=true; showCreateModal=true" class="bg-blue-500 rounded shadow shadow-black text-md text-white mb-1 px-3 py-1">Create New Task</button>
      </div>
      <TransitionGroup name="list" tag="ul">
        <li class="list-item" v-for="task in taskStore.tasks">
          <TaskCard :task="task" />
        </li>
      </TransitionGroup>
    </div>
</template>

<script setup>
    const taskStore = useTaskStore()
    taskStore.getTasks()
    const showModal = useModal()
    const showCreateModal = useCreateModal()
</script>

<style scoped>
  .list-item {
    margin-bottom: 0.5rem;
  }
</style>