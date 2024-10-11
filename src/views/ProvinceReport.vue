<template>
  <div v-if="provinceData">
    <section class="flex w-full justify-center mx-auto px-6 py-8 bg-blue-100">
      <div class="flex items-center container">
        <div class="w-full lg:w-1/2">
          <h1 class="text-5xl font-bold mb-16">
            Cerrando la brecha del <span class="text-blue-900">acceso al agua</span> en
            {{ provinceName }}
          </h1>

          <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-4 py-3 text-center">Distrito</th>
                <th scope="col" class="px-4 py-3 text-center">Población Total</th>
                <th scope="col" class="px-4 py-3 text-center">Con Acceso a Agua</th>
                <th scope="col" class="px-4 py-3 text-center">Porcentaje</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="district in provinceData.water_access" :key="district.name"
                  class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:cursor-pointer">
                <td class="px-4 py-3 text-center">{{ district.name }}</td>
                <td class="px-4 py-3 text-center">{{ formatNumber(district.total_population) }}</td>
                <td class="px-4 py-3 text-center">{{ formatNumber(district.total_population_with_water) }}</td>
                <td class="px-4 py-3 text-center">{{ (district.percentage_with_water || 0).toFixed(2) }}%</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="w-full lg:w-1/2 text-center px-10">
          <MapProvince :districts-data="provinceData.water_access" :province="provinceData.province" />
        </div>
      </div>
    </section>
    <section class="w-full justify-center mx-auto py-[100px] bg-white container">
      <h2 class="text-3xl font-bold mb-1 text-center uppercase">Resumen de <span class="text-blue-900">acceso a servicios básicos</span>
      </h2>
      <h3 class="text-2xl font-medium mb-16 text-center uppercase">Monitoreo del progreso en el acceso a agua y
        saneamiento en
        {{ provinceData.province.name }}</h3>
      <div v-if="provinceData" class="flex flex-wrap justify-center gap-6">
        <div class="flex flex-wrap justify-around gap-6 w-full">
          <div
            class="p-6 bg-blue-100 rounded-lg shadow-md text-center flex-1 min-w-[250px] max-w-[300px] flex flex-col border-l-4 border-l-blue-900">
            <h2 class="font-bold min-h-[4rem]">Centros Poblados Totales</h2>
            <p class="text-3xl mt-auto font-light">{{ formatNumber(provinceData.total_pc) }}</p>
          </div>

          <div
            class="p-6 bg-blue-100 rounded-lg shadow-md text-center flex-1 min-w-[250px] max-w-[300px] flex flex-col border-l-4 border-l-blue-900">
            <h2 class="font-bold min-h-[4rem]">Centros Poblados con Agua</h2>
            <p class="text-3xl mt-auto font-light">{{ formatNumber(provinceData.total_pc_with_water) }}</p>
          </div>

          <div
            class="p-6 bg-blue-100 rounded-lg shadow-md text-center flex-1 min-w-[250px] max-w-[300px] flex flex-col border-l-4 border-l-blue-900">
            <h2 class="font-bold min-h-[4rem]">Centros Poblados con UBS</h2>
            <p class="text-3xl mt-auto font-light">{{ formatNumber(provinceData.total_pc_with_sanitation) }}</p>
          </div>

          <div
            class="p-6 bg-blue-100 rounded-lg shadow-md text-center flex-1 min-w-[250px] max-w-[300px] flex flex-col border-l-4 border-l-blue-900">
            <h2 class="font-bold min-h-[4rem]">Centros Poblados con UBIGEO '99'</h2>
            <p class="text-3xl mt-auto font-light">{{ formatNumber(provinceData.total_pc_with_99) }}</p>
          </div>
        </div>
        <div class="flex flex-wrap justify-around gap-6 w-full">
          <div
            class="p-6 bg-blue-100 rounded-lg shadow-md text-center flex-1 min-w-[250px] max-w-[300px] flex flex-col border-l-4 border-l-blue-900">
            <h2 class="font-bold min-h-[4rem]">Población total</h2>
            <p class="text-3xl mt-auto font-light">{{ formatNumber(provinceData.total_people) }}</p>
          </div>

          <div
            class="p-6 bg-blue-100 rounded-lg shadow-md text-center flex-1 min-w-[250px] max-w-[300px] flex flex-col border-l-4 border-l-blue-900">
            <h2 class="font-bold min-h-[4rem]">Población con acceso a agua</h2>
            <p class="text-3xl mt-auto font-light">{{ formatNumber(provinceData.total_people_with_water) }}</p>
          </div>

          <div
            class="p-6 bg-blue-100 rounded-lg shadow-md text-center flex-1 min-w-[250px] max-w-[300px] flex flex-col border-l-4 border-l-blue-900">
            <h2 class="font-bold min-h-[4rem]">Número de viviendas</h2>
            <p class="text-3xl mt-auto font-light">{{ formatNumber(provinceData.total_houses) }}</p>
          </div>

          <div
            class="p-6 bg-blue-100 rounded-lg shadow-md text-center flex-1 min-w-[250px] max-w-[300px] flex flex-col border-l-4 border-l-blue-900">
            <h2 class="font-bold min-h-[4rem]">Número de viviendas con conexión a agua</h2>
            <p class="text-3xl mt-auto font-light">{{ formatNumber(provinceData.total_houses_with_connection) }}</p>
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
          class="text-blue-900">acceso a servicios de UBS </span> por distrito</h2>
        <h3 class="text-2xl font-medium">Monitoreo del acceso a UBS/DSE en los distritos de {{ provinceName }}</h3>
      </div>

      <!-- Contenedor del mapa y la tabla -->
      <div class="container mx-auto flex flex-col lg:flex-row justify-center items-center w-full gap-8">
        <!-- Mapa -->
        <div class="w-full lg:w-1/2">
          <div v-if="provinceData!==null||provinceData!==undefined">
            <MapProvince
              :percentageType="'ubs'"
              :districts-data="provinceData.ubs_access"
              :province="provinceData.province" />
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
                <th scope="col" class="px-4 py-3 text-center">Distrito</th>
                <th scope="col" class="px-4 py-3 text-center">Población Total</th>
                <th scope="col" class="px-4 py-3 text-center">Con Acceso a UBS</th>
                <th scope="col" class="px-4 py-3 text-center">Porcentaje</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="district in provinceData.ubs_access" :key="district.name"
                  class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:cursor-pointer">
                <td class="px-4 py-3 text-center">{{ district.name }}</td>
                <td class="px-4 py-3 text-center">{{ formatNumber(district.total_population) }}</td>
                <td class="px-4 py-3 text-center">{{ formatNumber(district.total_population_with_ubs) }}</td>
                <td class="px-4 py-3 text-center">{{ (district.percentage_with_ubs || 0).toFixed(2) }}%</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
    <section v-if="provinceData" class="w-full justify-center mx-auto py-[100px] bg-white container">
      <h2 class="text-3xl font-bold mb-1 text-center uppercase">Resumen de <span class="text-blue-900">acceso por viviendas</span>
      </h2>
      <h3 class="text-2xl font-medium mb-16 text-center uppercase">Monitoreo del progreso en el acceso a agua y
        saneamiento en
        {{ provinceData.province.name }}</h3>
      <div class="flex justify-center gap-6 w-full mb-[80px]">
        <!-- Gráfico de barras -->
        <div class="w-full h-full">
          <h2 class="font-bold min-h-[4rem] text-center">Porcentaje de viviendas con acceso a <span
            class="text-blue-900">Sistemas de Agua</span></h2>
          <div class="h-full"> <!-- Agregamos un contenedor para asegurar que el gráfico use el espacio completo -->
            <BarChart :data="housesWaterArray" />
          </div>
        </div>

        <!-- Tabla de datos -->
        <div class="w-full h-full">
          <h2 class="font-bold min-h-[4rem] text-center">Reporte de viviendas con acceso a <span class="text-blue-900">Sistemas de Agua</span>
          </h2>
          <div class="relative overflow-x-auto shadow-md sm:rounded-lg h-full">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-blue-100 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-4 py-3 text-center">Distrito</th>
                <th scope="col" class="px-4 py-3 text-center">Viviendas habitadas</th>
                <th scope="col" class="px-4 py-3 text-center">Viviendas con SA</th>
                <th scope="col" class="px-4 py-3 text-center">Porcentaje</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="district in provinceData.houses_water" :key="district.name"
                  class="bg-blue-50 border-b dark:bg-gray-800 dark:border-gray-700 hover:cursor-pointer">
                <td class="px-4 py-3 text-center">{{ district.name }}</td>
                <td class="px-4 py-3 text-center">{{ formatNumber(district.total_houses) }}</td>
                <td class="px-4 py-3 text-center">{{ formatNumber(district.total_houses_with_water) }}</td>
                <td class="px-4 py-3 text-center">{{ (district.percentage_with_water || 0).toFixed(2) }}%</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="flex justify-center gap-6 w-full mb-[80px]">
        <!-- Gráfico de barras -->
        <div class="w-full h-full">
          <h2 class="font-bold min-h-[4rem] text-center">Porcentaje de viviendas con acceso a <span
            class="text-blue-900">UBS o DSE</span></h2>
          <div class="h-full">
            <BarChart :data="housesUBSArray" />
          </div>
        </div>

        <!-- Tabla de datos -->
        <div class="w-full h-full">
          <h2 class="font-bold min-h-[4rem] text-center">Reporte de viviendas con acceso a <span class="text-blue-900">UBS o DSE</span>
          </h2>
          <div class="relative overflow-x-auto shadow-md sm:rounded-lg h-full">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-blue-100 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-4 py-3 text-center">Distrito</th>
                <th scope="col" class="px-4 py-3 text-center">Viviendas habitadas</th>
                <th scope="col" class="px-4 py-3 text-center">Viviendas con UBS</th>
                <th scope="col" class="px-4 py-3 text-center">Porcentaje</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="district in provinceData.houses_ubs" :key="district.name"
                  class="bg-blue-50 border-b dark:bg-gray-800 dark:border-gray-700 hover:cursor-pointer">
                <td class="px-4 py-3 text-center">{{ district.name }}</td>
                <td class="px-4 py-3 text-center">{{ formatNumber(district.total_houses) }}</td>
                <td class="px-4 py-3 text-center">{{ formatNumber(district.total_houses_with_ubs) }}</td>
                <td class="px-4 py-3 text-center">{{ (district.percentage_with_ubs || 0).toFixed(2) }}%</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  </div>
  <div v-else>
    <p>
      Cargando el resumen
    </p>
  </div>
</template>

<script>
import MapProvince from '@/components/maps/MapProvince.vue'
import axiosInstance from '@/axios.js'
import { computed, onMounted, ref } from 'vue'
import { formatNumber } from '@/utils/utils.js'
import MapCajamarcaWater from '@/components/maps/MapCajamarcaWater.vue'
import BarChart from '@/components/charts/BarChart.vue'

export default {
  components: { BarChart, MapCajamarcaWater, MapProvince },
  props: {
    provinceName: {
      type: String,
      required: true
    }
  },
  setup(props) {  // Asegúrate de recibir `props` como argumento aquí
    const provinceDataTemp = ref(null)
    const housesWaterArray = ref([])
    const housesUBSArray = ref([])

    const fetchProvinceResume = async () => {
      try {
        const response = await axiosInstance.get('reports/api/province_resume', {
          params: {
            name: props.provinceName  // Acceder a `provinceName` desde `props`
          }
        })
        provinceDataTemp.value = response.data

        housesWaterArray.value = response.data.houses_water.map(element => ({
          label: element.name,
          value: element.percentage_with_water
        }))

        housesUBSArray.value = response.data.houses_ubs.map(element => ({
          label: element.name,
          value: element.percentage_with_ubs
        }))
      } catch (error) {
        console.error('Error fetching resume', error)
      }
    }

    onMounted(() => {
      fetchProvinceResume()
    })
    const provinceData = computed(() => provinceDataTemp.value)

    return {
      provinceData,
      housesWaterArray,
      housesUBSArray,
      formatNumber
    }
  }
}
</script>
