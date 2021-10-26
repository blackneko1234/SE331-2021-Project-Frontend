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
    deleteUser(id) {
        return apiClient.delete('/delete/' + id)
    },
    getVaccine() {
        return apiClient.get('/vaccines')
    },
    saveVaccine(id, vaccine) {
        return apiClient.post('/AddVaccineToPatient/' + id, vaccine)
    }

}