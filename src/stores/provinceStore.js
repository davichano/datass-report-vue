// src/stores/provinceStore.js
import { defineStore } from 'pinia'
import axiosInstance from '@/axios.js'

const useProvinceStore = defineStore('provinceStore', {
  state: () => ({
    provincesDataWater: [],
    provincesDataUBS: [],
    apiUrl: 'locations/provinces/',
    loading: false,
    error: null,
    provinces: [],
    districts: [],
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
      } finally {
        this.loading = false
      }
    },
    async initLists() {
      try {
        const response = await axiosInstance.get('locations/provinces/', {
          params: {
            option: 'list-p-d',
          },
        })
        this.provinces = response.data.provinces
        this.districts = response.data.districts
      } catch (e) {
        this.error = 'Error al obtener las listas'
      }
    },
  },
})

export default useProvinceStore
