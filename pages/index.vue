<template>
    <div class="bg-slate-200">
        <div v-if="userStore.currentUser" class="m-4">
          <NuxtLink to="/projects" class="btn mr-2">Projects</NuxtLink>
          <NuxtLink to="/tasks" class="btn">Tasks</NuxtLink>
        </div>
    </div>
</template>

<script setup>
    const userStore = useUserStore()
</script>

<style scoped>

</style>