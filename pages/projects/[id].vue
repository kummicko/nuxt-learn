<template>
  <Modal />
    <div>
      <Head>
        <Title>Project | {{ project.name }}</Title>
        <Meta name="description" :content="project.name" />
      </Head>
      <ProjectDetails :project="project" />
    </div>
</template>

<script setup>
  const { id } = useRoute().params
  const taskStore = useTaskStore()
  const showModal = useModal()
  const project = taskStore.getProject(id)
  if(!project) {
    throw createError({  statusCode: 404, statusMessage: 'Project not found', fatal: true })
  }
</script>

<style scoped>

</style>