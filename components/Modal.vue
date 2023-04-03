<template>
    <transition name="fade" appear>
        <div class="modal-overlay" v-if="showModal"></div>
    </transition>
    <transition name="pop" appear>
        <div class="modal" role="dialog" v-if="showModal">
          <EditTaskModal v-if="showEditTaskModal" />
          <DeleteTaskModal v-if="showDeleteTaskModal" />
          <CreateTaskModal v-if="showCreateTaskModal" />
          <CreateProjectModal v-if="showCreateProjectModal"/>
        </div>
    </transition>
</template>

<script setup>
  const showModal = useModal()
  const showEditTaskModal = useEditTaskModal()
  const showDeleteTaskModal = useDeleteTaskModal()
  const showCreateTaskModal = useCreateTaskModal()
  const showCreateProjectModal = useCreateProjectModal()
</script>

<style scoped>
.modal {
  position: absolute;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  text-align: center;
  width: fit-content;
  height: fit-content;
  max-width: 22em;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.2);
  background: #FFF;
  z-index: 999;
  transform: none;
}
.modal-overlay {
  content: '';
  position: absolute;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 998;
  background: #2c3e50;
  opacity: 0.6;
  cursor: pointer;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .4s linear;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.pop-enter-active,
.pop-leave-active {
  transition: transform 0.4s cubic-bezier(0.5, 0, 0.5, 1), opacity 0.4s linear;
}

.pop-enter-from,
.pop-leave-to {
  opacity: 0;
  transform: scale(0.3) translateY(-50%);
}
</style>