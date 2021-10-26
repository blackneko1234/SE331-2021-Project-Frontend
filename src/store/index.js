import { reactive } from 'vue'
export default reactive({ DoctorNotify: '', people: null, currentUser: JSON.parse(localStorage.getItem('user')) })
