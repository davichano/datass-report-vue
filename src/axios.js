// src/axios.js
import axios from 'axios'
import { ref } from 'vue'

const isLoading = ref(false) // Controlar el estado de carga

const axiosInstance = axios.create({
  // baseURL: 'https://datassreport-fkbnc3acedfecgd5.canadacentral-01.azurewebsites.net/',
  baseURL: 'http://localhost:8000/',
})

axiosInstance.interceptors.request.use(
  (config) => {
    isLoading.value = true
    return config
  },
  (error) => {
    isLoading.value = false
    return Promise.reject(error)
  },
)

axiosInstance.interceptors.response.use(
  (response) => {
    isLoading.value = false
    return response
  },
  (error) => {
    isLoading.value = false
    return Promise.reject(error)
  },
)

export { isLoading }
export default axiosInstance
