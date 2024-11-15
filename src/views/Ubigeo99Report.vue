<template>
  <section class="flex w-full justify-center mx-auto px-6 py-8 bg-blue-100">
    <div class="flex items-center container">
      <div class="w-full lg:w-1/2">
        <h1 class="text-5xl font-bold">Encontremos <span class="text-blue-900">juntos</span> los ubigeos 99</h1>
        <h2 class="mt-4 text-2xl text-justify">Elige la <span class="text-blue-900">provincia</span> y el <span
          class="text-blue-900">distrito</span> para generar el reporte.
        </h2>
        <div
          class="w-full rounded p-10 border border-dashed border-blue-800 mt-10 flex space-x-5 items-center justify-around">
          <div class="w-1/3 flex flex-col space-y-2">
            <label for="province">Provincia:</label>
            <select id="province" v-model="selectedProvince" @change="filterDistricts" class="w-full">
              <option value="">Selecciona una provincia</option>
              <option v-for="province in provinces" :key="province.id" :value="province.id">
                {{ province.name }}
              </option>
            </select>
          </div>
          <div class="w-1/3 flex flex-col space-y-2">
            <label for="district">Distrito:</label>
            <select id="district" v-model="selectedDistrict" class="w-full" :disabled="filteredDistricts.length === 0">
              <option value="">Selecciona un distrito</option>
              <option v-for="district in filteredDistricts" :key="district.id" :value="district.id">
                {{ district.name }}
              </option>
            </select>
          </div>
          <div class="w-1/3 text-center">
            <button
              type="button"
              role="button"
              class="bg-blue-600 text-white px-10 py-3 rounded-lg shadow hover:bg-blue-700"
              @click="generateReport">
              Buscar
            </button>
          </div>
        </div>

      </div>
      <div class="w-full lg:w-1/2 text-center">
        <img :src="mapImage" alt="Bienvenido a gestión 99" class="w-full" />
      </div>
    </div>
  </section>

  <!-- Resumen de los CPs en acordeón -->
  <section v-if="populationCenters99.length > 0" class="w-full justify-center mx-auto py-[100px] bg-white container">
    <h2 class="text-3xl font-bold mb-1 text-center uppercase">
      Juntos hacia <span class="text-blue-900">un acceso más preciso a servicios básicos</span>
    </h2>
    <h3 class="text-2xl font-medium mb-16 text-center uppercase">
      Correcciones que mejoran la vida: Identificando centros poblados con datos incompletos
    </h3>

    <div class="flex flex-col lg:flex-row lg:justify-between gap-6">
      <!-- Acordeón de CPs -->
      <div class="w-full lg:w-1/2">
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
          <ul class="space-y-4">
            <li v-for="cp in populationCenters99" :key="cp.id"
                class="bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600">
              <input type="checkbox" :id="'accordion-' + cp.id" class="peer hidden">
              <label :for="'accordion-' + cp.id"
                     class="flex justify-between items-center px-4 py-2 cursor-pointer bg-blue-100 dark:bg-gray-600 dark:text-white peer-checked:bg-blue-300 dark:peer-checked:bg-blue-800">
                <span>{{ cp.name }} - {{ cp.code }}</span>
                <svg class="h-5 w-5 transform transition-transform peer-checked:rotate-90" fill="currentColor"
                     xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>chevron-down</title>
                  <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                </svg>
              </label>
              <div class="overflow-hidden transition-all duration-300 max-h-0 peer-checked:max-h-screen">
                <div class="p-4">
                  <div
                    class="w-full flex flex-wrap space-x-5 mb-5 border-2 border-dashed rounded-xl border-blue-800 px-7 py-5">
                    <p><strong>Ubigeo:</strong> {{ cp.code }}</p>
                    <p><strong>Lat:</strong> {{ cp.latitude_datass }}</p>
                    <p><strong>Lon:</strong> {{ cp.longitude_datass }}</p>
                  </div>
                  <ul
                    class="w-full text-sm font-medium text-gray-500 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    <li
                      class="w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600 text-center uppercase bg-blue-100">
                      Cercanos
                    </li>
                    <li v-for="neighbor in cp.nearest_population_centers"
                        class="w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600 flex">
                      <div class="w-2/4 flex flex-col">
                        <p class="w-full my-0">{{ neighbor.name }}</p>
                        <p class="w-full text-xs"><span class="font-bold">Ubigeo: </span>{{ neighbor.code }}</p>
                      </div>
                      <div class="w-1/4 flex flex-col">
                        <p class="w-full text-xs"><span class="font-bold">Lat: </span>{{ neighbor.latitude_datass }}</p>
                        <p class="w-full text-xs"><span class="font-bold">Lon: </span>{{ neighbor.longitude_datass }}
                        </p>
                      </div>
                      <div class="w-1/4 flex flex-col">
                        <p class="w-full text-xs"><span
                          class="font-bold">Distancia (m): </span>{{ formatNumber(neighbor.distance) }}</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <!-- Mapa con marcadores -->
      <div class="w-full lg:w-1/2">
        <MapWithMarkers :populationCenters99="populationCenters99" />
      </div>
    </div>
  </section>
</template>

<script>
import useProvinceStore from '@/stores/provinceStore'
import { computed, onMounted, ref } from 'vue'
import mapImage from '@/assets/images/ubigeo/map.svg'
import axiosInstance from '@/axios.js'
import { formatNumber, haversine } from '@/utils/utils.js'
import MapWithMarkers from '@/components/maps/MapWithMarkers.vue'
import Swal from 'sweetalert2'

export default {
  components: { MapWithMarkers },
  setup() {
    const provinceStore = useProvinceStore()
    const selectedProvince = ref('')
    const selectedDistrict = ref('')

    const provinces = computed(() => provinceStore.provinces)
    const filteredDistricts = ref([])
    const populationCenters = ref([])
    const populationCenters99 = ref([])

    const filterDistricts = () => {
      filteredDistricts.value = provinceStore.districts.filter(
        district => district.province === selectedProvince.value
      )
    }

    const generateReport = async () => {
      if (selectedDistrict.value && selectedDistrict.value > 0) {
        populationCenters.value = []
        populationCenters99.value = []
        await fetchPopulationCenters(selectedDistrict.value)
        console.log(populationCenters.value)
      }
    }

    const fetchPopulationCenters = async (district_id) => {
      const { data } = await axiosInstance('locations/population-centers/', {
        params: { option: 'by-district', district: district_id }
      })
      populationCenters.value = data
      const populationCentersWithout99 = data.filter(pc => pc.code.slice(6, 8) !== '99')
      const populationCentersWith99 = data.filter(pc => pc.code.slice(6, 8) === '99')
      if (populationCentersWith99.length === 0) {
        Swal.fire({
          title: '¡Vamos bien!',
          text: 'Este distrito no tiene centros poblados con código 99.',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        })
        return
      }
      populationCenters99.value = populationCentersWith99
        .map(pc => {
          const nearest = populationCentersWithout99
            .map(element => ({
              ...element,
              distance: haversine(pc.latitude_datass, pc.longitude_datass, element.latitude_datass, element.longitude_datass)
            }))
            .sort((a, b) => a.distance - b.distance)
            .slice(0, 3)
          return { ...pc, nearest_population_centers: nearest }
        })
    }

    onMounted(() => {
      provinceStore.initLists()
    })
    return {
      provinces,
      filteredDistricts,
      selectedProvince,
      selectedDistrict,
      filterDistricts,
      generateReport,
      mapImage,
      populationCenters99,
      formatNumber
    }
  }
}
</script>
