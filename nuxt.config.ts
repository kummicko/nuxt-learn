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
      title: 'Manager',
      meta: [
        { name: 'description', content: 'Simple Project Manager'}
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
