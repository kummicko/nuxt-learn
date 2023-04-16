const userStore = useUserStore()

export default defineNuxtRouteMiddleware((to, from) => {
    const user = userStore.currentUser
    if(!user) {
        return navigateTo('/auth/login')
    }
})