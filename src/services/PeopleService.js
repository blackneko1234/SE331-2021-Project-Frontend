//import axios from 'axios'
import apiClient from '@/services/AxiosClient.js'

/* const apiClient = axios.create({
  baseURL: 'http://localhost:3004',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
}) */

export default {
  getAllPeople(perPage, page) {
    return apiClient.get('/patients?_limit=' + perPage + '&_page=' + page)
  },
  getPeople(id) {
    return apiClient.get('/patients/' + id)
  }
}
