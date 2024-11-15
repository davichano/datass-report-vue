//services/systems.service.js
import axiosInstance from '@/axios.js'

export const fetchRegionResume = async () => {
  try {
    const response = await axiosInstance.get('reports/api/systems/system_resume')
    return response.data
  } catch (error) {
    console.error('Error al obtener los datos de las regiones')
    throw error
  }
}