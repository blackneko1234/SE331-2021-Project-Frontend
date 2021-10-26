import apiClient from '@/services/AxiosClient.js'
export default {
    getUnEnableUser() {
        return apiClient.get('/admins/console')
    },
    changeAndAcceptRole(id, role) {
        return apiClient.patch('/changeRole/' + id, {
            authorities: [role]
        })
    },

}