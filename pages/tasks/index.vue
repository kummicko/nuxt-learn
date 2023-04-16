<template>
  <Modal />
    <div class="grid gap-2">
      <div class="flex">
        <button @click="showModal=true; showCreateTaskModal=true" class="bg-blue-500 rounded shadow shadow-black text-md italic text-white mb-1 px-3 py-1">Create New Task</button>
      </div>
      <TransitionGroup name="list" tag="ul" appear>
        <li class="list-item" v-for="task in taskStore.tasks" :key="task.id">
          <TaskCard :task="task" />
        </li>
      </TransitionGroup>
    </div>
</template>

<script setup>
  definePageMeta({
    middleware: [
      'auth'
    ]
  })
  const taskStore = useTaskStore()
  const userStore = useUserStore()
  taskStore.getTasks(userStore.currentUser.id)
  const showModal = useModal()
  const showCreateTaskModal = useCreateTaskModal()
  useHead({
  title: 'Manager | Tasks',
  meta: [
    { name: 'description', content: 'Task Manager'}
  ]
  })
</script>

<style scoped>
  .list-item {
    margin-bottom: 0.5rem;
  }
  .list-enter-from{
    opacity: 0;
    transform: scale(0.6);
  }
  .list-enter-to {
    opacity: 1;
    transform: scale(1);
  }
  .list-enter-active {
    transition: all 0.4s ease;
  }
  .list-leave-from {
    opacity: 1;
    transform: scale(1)
  }
  .list-leave-to {
    opacity: 0;
    transform: scale(0.6);
  }
  .list-leave-active {
    transition: all 0.6s ease;
    position: absolute;
  }
  .list-move {
    transition: all 0.6s ease;
  }
</style>