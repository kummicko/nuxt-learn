<template>
    <div class="flex flex-col min-h-screen">
      <header class="shadow-sm bg-white">
        <nav class="container mx-auto p-4 flex justify-between">
          <NuxtLink to="/" class="font-bold">Manager</NuxtLink>
          <ul class="flex gap-4">
            <li v-if="userStore.currentUser"><NuxtLink to="/auth/logout">Logout</NuxtLink></li>
            <li v-if="!userStore.currentUser"><NuxtLink to="/auth/login">Login</NuxtLink></li>
            <li v-if="!userStore.currentUser"><NuxtLink to="/auth/register">Register</NuxtLink></li>
            <!-- <li><NuxtLink to="/products" class="btn">Products</NuxtLink></li> -->
          </ul>
        </nav>
      </header>

      <div class="container mx-auto p-4 grow flex flex-col">
        <div v-if="userStore.currentUser">
          <p>Current user</p>
          <p>Id: {{ userStore.currentUser.id }}</p>
          <p>First Name: {{ userStore.currentUser.firstName }}</p>
          <p>Last Name: {{ userStore.currentUser.lastName }}</p>
          <p>Email: {{ userStore.currentUser.email }}</p>
        </div>
        <slot />
      </div>
    </div>
</template>

<script setup>
  const userStore = useUserStore()
</script>

<style scoped>
  .router-link-exact-active {
    color: #12b488;
  }
</style>