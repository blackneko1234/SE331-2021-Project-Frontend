import apiClient from '@/services/AxiosClient.js'
import Vaccination from '@/store'
export default {
    login(user) {
        return apiClient.post('/auth', {
            username: user.username,
            password: user.password
        }).then((response) => {
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('user', JSON.stringify(response.data.user))
            Vaccination.currentUser = response.data.user
            return Promise.resolve(response.data)
        }).catch((error) => {
            return Promise.reject(error)
        })
    },
    logout() {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        Vaccination.currentUser = null
    },
    getUser() {
        return JSON.parse(localStorage.getItem('user'))
    },
    hasRoles(roles) {
        if (Vaccination.currentUser && roles) {
            let containRoles = Vaccination.currentUser.authorities.filter((authority) => roles.includes(authority))
            if (containRoles.length > 0) {
                return true
            } else {
                return false
            }
        } else {
            return false
        }
    },
    register(user) {
        return apiClient.post('/auth/registers', {
            username: user.username,
            password: user.password,
            firstname: user.firstname,
            lastname: user.lastname,
            gender: user.gender,
            hometown: user.hometown,
            birthdate: user.birthdate,
            image: user.image,
            age: user.age,
        })
    },
    uploadFile(file) {
        let formData = new FormData()
        formData.append('file', file)
        return apiClient.post('/uploadFile', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }

}
