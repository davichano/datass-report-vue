//src/stores/provinceStore.js
import { defineStore } from 'pinia'
import axiosInstance from '@/axios.js'

export const useProvinceStore = defineStore('provinceStore', {
  state: () => ({
    provincesDataWater: [],
    provincesDataUBS: [],
    apiUrl: 'locations/provinces/',
    loading: false,
    error: null
  }),
  actions: {
    async fetchProvincesData() {
      this.loading = true
      this.error = null
      try {
        const response = await axiosInstance.get(this.apiUrl)
        this.provincesDataWater = response.data.water_access
        this.provincesDataUBS = response.data.ubs_access
      } catch (error) {
        this.error = 'Error al obtener los datos de las provincias'
        console.log(error)
      } finally {
        this.loading = false
      }
    }
  }
})