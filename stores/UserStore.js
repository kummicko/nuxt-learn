export const useUserStore = defineStore('userStore', {
    state: () => ({
        currentUser: null
    }),
    actions: {
        setCurrentUser(id, firstName, lastName, email) {
            this.currentUser = {  
                                id: id,
                                firstName: firstName,
                                lastName: lastName,
                                email: email
                               };
        },
        removeCurrentUser() {
            this.currentUser = null
        }
    }
})