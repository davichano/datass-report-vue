<template>
  <section class="flex w-full justify-center mx-auto px-6 py-8 bg-blue-100">
    <div class="flex items-center container">
      <div class="w-full lg:w-1/2">
        <h1 class="text-5xl font-bold">Cerrando la brecha del <span class="text-blue-900">acceso al agua</span> en zonas
          rurales</h1>
        <h2 class="mt-4 text-2xl text-justify">Con datos precisos y reportes detallados, apoyamos la mejora de la
          calidad
          de vida en las
          comunidades rurales de Cajamarca
        </h2>
        <button type="button" role="button"
                class="bg-blue-600 text-white mt-[35px] px-10 py-3 rounded-lg shadow hover:bg-blue-700">
          Explora los Reportes
        </button>
      </div>
      <div class="w-full lg:w-1/2 text-center">
        <img :src="welcomeImage" alt="Bienvenido a DATASS" class="w-full" />
      </div>
    </div>
  </section>
  <section class="w-full justify-center mx-auto py-[100px] bg-white container">
    <h2 class="text-3xl font-bold mb-1 text-center uppercase">Resumen de <span class="text-blue-900">acceso a servicios básicos</span>
    </h2>
    <h3 class="text-2xl font-medium mb-16 text-center">Monitoreo del progreso en el acceso a agua y saneamiento en
      Cajamarca</h3>
    <div v-if="resumeData" class="flex flex-wrap justify-center gap-6">
      <div class="flex flex-wrap justify-around gap-6 w-full">
        <div
          class="p-6 bg-blue-100 rounded-lg shadow-md text-center flex-1 min-w-[250px] max-w-[300px] flex flex-col border-l-4 border-l-blue-900">
          <h2 class="font-bold min-h-[4rem]">Centros Poblados Totales</h2>
          <p class="text-3xl mt-auto font-light">{{ formatNumber(resumeData.total_pc) }}</p>
        </div>

        <div
          class="p-6 bg-blue-100 rounded-lg shadow-md text-center flex-1 min-w-[250px] max-w-[300px] flex flex-col border-l-4 border-l-blue-900">
          <h2 class="font-bold min-h-[4rem]">Centros Poblados con Agua</h2>
          <p class="text-3xl mt-auto font-light">{{ formatNumber(resumeData.total_pc_with_water) }}</p>
        </div>

        <div
          class="p-6 bg-blue-100 rounded-lg shadow-md text-center flex-1 min-w-[250px] max-w-[300px] flex flex-col border-l-4 border-l-blue-900">
          <h2 class="font-bold min-h-[4rem]">Centros Poblados con UBS</h2>
          <p class="text-3xl mt-auto font-light">{{ formatNumber(resumeData.total_pc_with_sanitation) }}</p>
        </div>

        <div
          class="p-6 bg-blue-100 rounded-lg shadow-md text-center flex-1 min-w-[250px] max-w-[300px] flex flex-col border-l-4 border-l-blue-900">
          <h2 class="font-bold min-h-[4rem]">Centros Poblados con UBIGEO '99'</h2>
          <p class="text-3xl mt-auto font-light">{{ formatNumber(resumeData.total_pc_with_99) }}</p>
        </div>
      </div>
      <div class="flex flex-wrap justify-around gap-6 w-full">
        <div
          class="p-6 bg-blue-100 rounded-lg shadow-md text-center flex-1 min-w-[250px] max-w-[300px] flex flex-col border-l-4 border-l-blue-900">
          <h2 class="font-bold min-h-[4rem]">Población total</h2>
          <p class="text-3xl mt-auto font-light">{{ formatNumber(resumeData.total_people) }}</p>
        </div>

        <div
          class="p-6 bg-blue-100 rounded-lg shadow-md text-center flex-1 min-w-[250px] max-w-[300px] flex flex-col border-l-4 border-l-blue-900">
          <h2 class="font-bold min-h-[4rem]">Población con acceso a agua</h2>
          <p class="text-3xl mt-auto font-light">{{ formatNumber(resumeData.total_people_with_water) }}</p>
        </div>

        <div
          class="p-6 bg-blue-100 rounded-lg shadow-md text-center flex-1 min-w-[250px] max-w-[300px] flex flex-col border-l-4 border-l-blue-900">
          <h2 class="font-bold min-h-[4rem]">Número de viviendas</h2>
          <p class="text-3xl mt-auto font-light">{{ formatNumber(resumeData.total_houses) }}</p>
        </div>

        <div
          class="p-6 bg-blue-100 rounded-lg shadow-md text-center flex-1 min-w-[250px] max-w-[300px] flex flex-col border-l-4 border-l-blue-900">
          <h2 class="font-bold min-h-[4rem]">Número de viviendas con conexión a agua</h2>
          <p class="text-3xl mt-auto font-light">{{ formatNumber(resumeData.total_houses_with_connection) }}</p>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Cargando resumen...</p>
    </div>
  </section>
  <section class="flex flex-col w-full justify-center mx-auto py-[100px] bg-blue-100">
    <!-- Contenedor del título y subtítulo -->
    <div class="w-full text-center mb-16">
      <h2 class="text-3xl font-bold mb-1 uppercase">Porcentaje de <span
        class="text-blue-900">acceso a servicios de agua</span> por provincia</h2>
      <h3 class="text-2xl font-medium">Monitoreo del acceso a agua potable en las provincias de Cajamarca</h3>
    </div>

    <!-- Contenedor del mapa y la tabla -->
    <div class="container mx-auto flex flex-col lg:flex-row justify-center items-center lg:items-start w-full gap-8">
      <!-- Mapa -->
      <div class="w-full lg:w-1/2">
        <div v-if="provincesDataWater.length > 0">
          <MapCajamarcaWater :provincesData="provincesDataWater" />
        </div>
        <div v-else>
          <p>Cargando mapa...</p>
        </div>
      </div>

      <!-- Tabla -->
      <div class="w-full lg:w-1/2">
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-4 py-3 text-center">Provincia</th>
              <th scope="col" class="px-4 py-3 text-center">Población Total</th>
              <th scope="col" class="px-4 py-3 text-center">Con Acceso a Agua</th>
              <th scope="col" class="px-4 py-3 text-center">Porcentaje</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="province in provincesDataWater" :key="province.name"
                @click="goToProvinceReport(province.name)"
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:cursor-pointer">
              <td class="px-4 py-3 text-center">{{ province.name }}</td>
              <td class="px-4 py-3 text-center">{{ formatNumber(province.total_population) }}</td>
              <td class="px-4 py-3 text-center">{{ formatNumber(province.total_population_with_water) }}</td>
              <td class="px-4 py-3 text-center">{{ (province.percentage_with_water || 0).toFixed(2) }}%</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>
  <section class="flex flex-col w-full justify-center mx-auto py-[100px] bg-white">
    <!-- Contenedor del título y subtítulo -->
    <div class="w-full text-center mb-16">
      <h2 class="text-3xl font-bold mb-1 uppercase">Porcentaje de <span class="text-blue-900">Acceso a Unidades Básicas de Saneamiento</span>
        por Provincia</h2>
      <h3 class="text-2xl font-medium">Monitoreo del acceso a saneamiento en las provincias de Cajamarca</h3>
    </div>

    <!-- Contenedor del mapa y la tabla -->
    <div class="container mx-auto flex flex-col lg:flex-row justify-center items-center lg:items-start w-full gap-8">
      <!-- Mapa -->
      <div class="w-full lg:w-1/2">
        <div v-if="provincesDataUBS.length > 0">
          <MapCajamarcaUBS :provincesData="provincesDataUBS" />
        </div>
        <div v-else>
          <p>Cargando mapa...</p>
        </div>
      </div>

      <!-- Tabla -->
      <div class="w-full lg:w-1/2">
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-blue-100 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-4 py-3 text-center">Provincia</th>
              <th scope="col" class="px-4 py-3 text-center">Población Total</th>
              <th scope="col" class="px-4 py-3 text-center">Con Acceso a UBS</th>
              <th scope="col" class="px-4 py-3 text-center">Porcentaje</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="province in provincesDataUBS" :key="province.name"
                @click="goToProvinceReport(province.name)"
                class="bg-blue-50 border-b dark:bg-gray-800 dark:border-gray-700 hover:cursor-pointer">
              <td class="px-4 py-3 text-center">{{ province.name }}</td>
              <td class="px-4 py-3 text-center">{{ formatNumber(province.total_population) }}</td>
              <td class="px-4 py-3 text-center">{{ formatNumber(province.total_population_with_ubs) }}</td>
              <td class="px-4 py-3 text-center">{{ (province.percentage_with_ubs || 0).toFixed(2) }}%</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>

</template>

<script>
import useProvinceStore from '@/stores/provinceStore'
import welcomeImage from '@/assets/images/home/welcome.svg'
import MapCajamarcaWater from '@/components/maps/MapCajamarcaWater.vue'
import { computed, onMounted, ref } from 'vue'
import axiosInstance from '@/axios.js'
import { formatNumber } from '@/utils/utils.js'
import MapCajamarcaUBS from '@/components/maps/MapCajamarcaUbs.vue'
import { useRouter } from 'vue-router'

export default {
  name: 'Home',
  components: {
    MapCajamarcaUBS,
    MapCajamarcaWater
  },
  setup() {
    const provinceStore = useProvinceStore()
    const resumeData = ref(null)

    const fetchHomeResume = async () => {
      try {
        const response = await axiosInstance.get('reports/api/general' +
          'home_resume')
        resumeData.value = response.data
      } catch (error) {
        console.error('Error fetching home resume:', error)
      }
    }

    const router = useRouter()
    const goToProvinceReport = (provinceName) => {
      router.push({ name: 'provinceReport', params: { provinceName } })
    }

    onMounted(() => {
      provinceStore.fetchProvincesData()
      fetchHomeResume()
    })

    const provincesDataWater = computed(() => provinceStore.provincesDataWater)
    const provincesDataUBS = computed(() => provinceStore.provincesDataUBS)

    return {
      provincesDataWater,
      provincesDataUBS,
      welcomeImage,
      resumeData,
      formatNumber,
      goToProvinceReport
    }
  }
}
</script>