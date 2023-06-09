<script setup>
import { useToast, POSITION } from 'vue-toastification'
import { useVuelidate } from '@vuelidate/core';
import { required, email, minLength, helpers } from '@vuelidate/validators';

const userStore = useUserStore()

const formData = reactive({
  email: '',
  password: ''
})
const rules = computed(() => {
  return {
    email: {
      required: helpers.withMessage('The email field is required', required),
      email: helpers.withMessage('Invalid email format', email),
    },
    password: {
      required: helpers.withMessage('The password field is required', required),
      minLength: minLength(6),
    }
  };
});

const v$ = useVuelidate(rules, formData)

async function submitForm () {
  v$.value.$validate();
  if (!v$.value.$error) {
    const { data, error } = await useFetch('/api/users/signin', {
      method: 'post',
      body: { 
              password: formData.password,
              email: formData.email 
            },
      })
      if(data.value){
        // Set Current User
        userStore.setCurrentUser(data.value.id, data.value.firstName, data.value.lastName, data.value.email)
        await navigateTo('/')
      }else if(error.value){
        console.log(error.value.data.message)
        useToast().error(error.value.data.message, { position: POSITION.TOP_CENTER })
      }
    }
};
</script>

<template>
  <div class="grow flex align-middle px-2">
    <form
      @submit.prevent="submitForm"
      class="flex w-full flex-col my-auto rounded-lg p-4 shadow-lg md:mt-0 md:w-1/2 lg:w-2/6"
    >
    <h2 class="mb-5 text-lg font-medium">Login</h2>

    <!-- Email input -->
    <div class="relative mb-4">
        <label for="email" class="text-sm leading-7 text-gray-900">Email</label>
        <div class="relative">
            <input
            v-model="formData.email"
            type="text"
            id="email"
            name="email"
            placeholder="Your email address"
            class="w-full rounded border border-gray-600 bg-transparent bg-opacity-20 py-1 px-3 text-base leading-8 text-gray-700 italic outline-none transition-colors duration-200 ease-in-out placeholder:text-gray-500 focus:border-blue-500 focus:bg-transparent focus:ring-2 focus:ring-transparent"
            :class="{
                'border-red-500 focus:border-red-500': v$.email.$error,
                'border-[#42d392] ': !v$.email.$invalid,
            }"
            @change="v$.email.$touch"
            autocomplete="off"
            />
            <Icon
            v-if="!v$.email.$invalid || v$.email.$error"
            class="absolute right-2 h-full text-xl text-green-500"
            :class="{ 'text-green-500': !v$.email.$invalid, 'text-yellow-500': v$.email.$error }"
            :name="`heroicons-solid:${!v$.email.$error ? 'check-circle' : 'exclamation'}`"
            />
        </div>
        <span class="text-xs text-red-500" v-if="v$.email.$error">{{
            v$.email.$errors[0].$message
        }}</span>
    </div>

    <!-- Password input -->
    <div class="relative mb-4">
        <label for="password" class="text-sm leading-7 text-gray-900">Password</label>
        <div class="relative">
            <input
            v-model="formData.password"
            type="password"
            id="password"
            name="password"
            placeholder="******"
            class="w-full rounded border border-gray-600 bg-transparent bg-opacity-20 py-1 px-3 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-blue-500 focus:bg-transparent focus:ring-2 focus:ring-transparent"
            :class="{
                ' border-red-500 focus:border-red-500': v$.password.$error,
                'border-[#42d392]': !v$.password.$invalid,
            }"
            @change="v$.password.$touch"
            />
            <Icon
            v-if="!v$.password.$invalid || v$.password.$error"
            class="absolute right-2 h-full text-xl text-green-500"
            :class="{
                'text-green-500': !v$.password.$invalid,
                'text-yellow-500': v$.password.$error,
            }"
            :name="`heroicons-solid:${!v$.password.$error ? 'check-circle' : 'exclamation'}`"
            />
        </div>
        <span class="text-xs text-red-500" v-if="v$.password.$error">{{
            v$.password.$errors[0].$message
        }}</span>
    </div>

    <button
        type="submit"
        class="rounded border-0 bg-blue-500 py-2 px-8 font-bold text-[#213547] transition-colors duration-500 hover:bg-blue-600 focus:outline-none"
      >
        Submit
      </button>

    </form>
  </div>
</template>