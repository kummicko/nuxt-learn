<script setup>
import { useVuelidate } from '@vuelidate/core';
import { required, email, sameAs, minLength, helpers } from '@vuelidate/validators';
const formData = reactive({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: null,
})
const rules = computed(() => {
  return {
    firstName: {
      required: helpers.withMessage('The FirstName field is required', required),
      minLength: minLength(2),
    },
    lastName: {
      required: helpers.withMessage('The LastName field is required', required),
      minLength: minLength(2),
    },
    email: {
      required: helpers.withMessage('The email field is required', required),
      email: helpers.withMessage('Invalid email format', email),
    },
    password: {
      required: helpers.withMessage('The password field is required', required),
      minLength: minLength(6),
    },
    confirmPassword: {
      required: helpers.withMessage('The password confirmation field is required', required),
      sameAs: helpers.withMessage("Passwords don't match", sameAs(formData.password)),
    },
  };
});
const v$ = useVuelidate(rules, formData)

async function submitForm () {
  v$.value.$validate();
  if (!v$.value.$error) {
    await useFetch('/api/users', {
          method: 'post',
          body: { firstName: formData.firstName,
                  lastName: formData.lastName,
                  password: formData.password,
                  email: formData.email 
                }
        })
      
    }
};
</script>

<template>
  <main class="min-h-screen">
    <section class="container mx-auto px-2 py-24">
      <form
        @submit.prevent="submitForm"
        class="mx-auto my-auto flex w-full flex-col rounded-lg p-4 shadow-lg md:mt-0 md:w-1/2 lg:w-2/6"
      >
        <h2 class="mb-5 text-lg font-medium">Register</h2>

        <!-- First Name input -->

        <div class="relative mb-4">
          <label for="firstName" class="text-sm leading-7 text-gray-900">First Name</label>
          <div class="relative">
            <input
              v-model="formData.firstName"
              type="text"
              id="firstName"
              name="firstName"
              placeholder="Your First Name"
              class="w-full rounded border border-gray-600 bg-transparent bg-opacity-20 py-1 px-3 text-base leading-8 text-gray-700 italic outline-none transition-colors duration-200 ease-in-out placeholder:text-gray-500 focus:border-blue-500 focus:bg-transparent focus:ring-2 focus:ring-transparent"
              :class="{
                'border-red-500 focus:border-red-500': v$.firstName.$error,
                'border-[#42d392] ': !v$.firstName.$invalid,
              }"
              @change="v$.firstName.$touch"
              autocomplete="off"
            />
            <Icon
              v-if="!v$.firstName.$invalid || v$.firstName.$error"
              class="absolute right-2 h-full text-xl text-green-500"
              :class="{ 'text-green-500': !v$.firstName.$invalid, 'text-yellow-500': v$.firstName.$error }"
              :name="`heroicons-solid:${!v$.firstName.$error ? 'check-circle' : 'exclamation'}`"
            />
          </div>
          <span class="text-xs text-red-500" v-if="v$.firstName.$error">{{
            v$.firstName.$errors[0].$message
          }}</span>
        </div>

        <!-- Last Name input -->

        <div class="relative mb-4">
          <label for="lastName" class="text-sm leading-7 text-gray-900">Last Name</label>
          <div class="relative">
            <input
              v-model="formData.lastName"
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Your Last Name"
              class="w-full rounded border border-gray-600 bg-transparent bg-opacity-20 py-1 px-3 text-base leading-8 text-gray-700 italic outline-none transition-colors duration-200 ease-in-out placeholder:text-gray-500 focus:border-blue-500 focus:bg-transparent focus:ring-2 focus:ring-transparent"
              :class="{
                'border-red-500 focus:border-red-500': v$.lastName.$error,
                'border-[#42d392] ': !v$.lastName.$invalid,
              }"
              @change="v$.lastName.$touch"
              autocomplete="off"
            />
            <Icon
              v-if="!v$.lastName.$invalid || v$.lastName.$error"
              class="absolute right-2 h-full text-xl text-green-500"
              :class="{ 'text-green-500': !v$.lastName.$invalid, 'text-yellow-500': v$.lastName.$error }"
              :name="`heroicons-solid:${!v$.lastName.$error ? 'check-circle' : 'exclamation'}`"
            />
          </div>
          <span class="text-xs text-red-500" v-if="v$.lastName.$error">{{
            v$.lastName.$errors[0].$message
          }}</span>
        </div>

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

        <!-- Confirm Password input -->
        <div class="relative mb-4">
          <label for="confirmPassword" class="text-sm leading-7 text-gray-900"
            >Confirm password</label
          >
          <div class="relative">
            <input
              v-model="formData.confirmPassword"
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="******"
              class="w-full rounded border border-gray-600 bg-transparent bg-opacity-20 py-1 px-3 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-blue-500 focus:bg-transparent focus:ring-2 focus:ring-transparent"
              :class="{
                ' border-red-500 focus:border-red-500': v$.confirmPassword.$error,
                'border-[#42d392]': !v$.confirmPassword.$invalid,
              }"
              @change="v$.confirmPassword.$touch"
            />
            <Icon
              v-if="!v$.confirmPassword.$invalid || v$.confirmPassword.$error"
              class="absolute right-2 h-full text-xl text-green-500"
              :class="{
                'text-green-500': !v$.confirmPassword.$invalid,
                'text-yellow-500': v$.confirmPassword.$error,
              }"
              :name="`heroicons-solid:${
                !v$.confirmPassword.$error ? 'check-circle' : 'exclamation'
              }`"
            />
          </div>
          <span class="text-xs text-red-500" v-if="v$.confirmPassword.$error">{{
            v$.confirmPassword.$errors[0].$message
          }}</span>
        </div>

        <button
          type="submit"
          class="rounded border-0 bg-blue-500 py-2 px-8 font-bold text-[#213547] transition-colors duration-500 hover:bg-blue-600 focus:outline-none"
        >
          Submit
        </button>
      </form>
    </section>
  </main>
</template>