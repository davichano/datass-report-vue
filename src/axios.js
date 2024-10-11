// src/axios.js
import axios from 'axios'

const axiosInstance = axios.create({
  // baseURL: 'https://datassreport-fkbnc3acedfecgd5.canadacentral-01.azurewebsites.net/',
  baseURL: 'http://localhost:8000/'
})

export default axiosInstance
