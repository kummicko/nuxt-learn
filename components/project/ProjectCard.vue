<template>
    <div class="card">
        <p>{{ project.name }}</p>
    </div>
</template>

<script setup>
  const { project } = defineProps(['project'])
</script>

<style scoped>

</style>