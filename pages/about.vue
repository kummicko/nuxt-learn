<template>
    <div>
        <h2>About</h2>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta praesentium reprehenderit commodi neque labore ad vero eos, possimus repudiandae facilis.</p>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta praesentium reprehenderit commodi neque labore ad vero eos, possimus repudiandae facilis.</p>
        <button @click="counter.increment()" data-testid="increment">+1</button>
        <pre>{{ counter.$state }}</pre>
        <FormKit
          type="form"
          submit-label="SEND"
          @submit="sendTask"
        >
          <FormKit
            type="text"
            name="name"
            label="New Task"
            validation="required"
          />
        </FormKit><br>
        <div v-for="user in users">
          <h3>{{ user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1) }}</h3>
          <h3>{{ user.lastName }}</h3>
          <h3>{{ user.email }}</h3>
          <p>{{ user.id }}</p><hr>
        </div>
        <!-- <div>{{ users }}</div> -->
        <div>{{ tasks }}</div>
    </div>
</template>

<script setup>
  const { data: users } = await useFetch('/api/users')
  const { data: tasks } = await useFetch('/api/tasks')
  // const data = await useFetch('/api/users', {
  //   method: 'post',
  //   body: {
  //     firstName: 'Jane',
  //     lastName: 'Doe',
  //     email: 'jane@doe.com',
  //     password: 'password'
  //   }
  // })


  const sendTask = async (fields) => {
  const res = await useFetch('/api/tasks', { method: 'post', body: { name: fields['name'], completed: false } })
}
const counter = useCounterStore();
</script>

<style scoped>
  h2 {
    margin-bottom: 1.25rem;
    font-size: 2.25rem;
  }
  p {
    margin: 1.25rem 0;
  }
</style>