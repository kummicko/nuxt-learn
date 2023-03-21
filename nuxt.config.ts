// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@formkit/nuxt',
    ['@pinia/nuxt', {
      autoImports: ['defineStore','definePiniaStore', 'acceptHMRUpdate'],
    }],
    'nuxt-icon'
  ],
  app: {
    head: {
      title: 'Learn Nuxt',
      meta: [
        { name: 'description', content: 'Everything about Nuxt 3'}
      ],
      link: [
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' }
      ]
    }
  },
  runtimeConfig: {
    mongoUrl: process.env.MONGO_URL,
  },
  nitro: {
    plugins: ["~/server/index.ts"],
  },
  imports: {
    dirs: ['stores'],
  },
})
