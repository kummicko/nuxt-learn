<script setup>
    const taskStore = useTaskStore()
    const userStore = useUserStore()
    userStore.removeCurrentUser()
    taskStore.tasks = []
    taskStore.tasksLoaded = false
    await navigateTo('/')
</script>