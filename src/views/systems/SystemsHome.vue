<template>
  <div>
    <section class="flex w-full justify-center mx-auto px-6 py-8 bg-blue-100">
      <div class="flex items-center container">
        <div class="w-full lg:w-1/2">
          <h1 class="text-5xl font-bold mb-10">Estado de los <span class="text-blue-900">sistemas de agua</span> en la
            región: </h1>
          <div class="flex flex-wrap justify-center gap-6 w-full mt-2">
            <div
              class="p-6 bg-white rounded-lg shadow-md text-center flex-1 min-w-[250px] max-w-[300px] flex flex-col border-l-4 border-l-blue-900">
              <h2 class="font-bold min-h-[4rem]">Total <br />Sist. Agua(SA)</h2>
              <p class="text-3xl mt-auto font-light">{{ formatNumber(resumeSystems.total_systems) }}</p>
            </div>
            <div
              class="p-6 bg-white rounded-lg shadow-md text-center flex-1 min-w-[250px] max-w-[300px] flex flex-col border-l-4 border-l-blue-900">
              <h2 class="font-bold min-h-[4rem]">Total SA con <br />agua continua</h2>
              <p class="text-3xl mt-auto font-light">{{ formatNumber(resumeSystems.total_with_continous_water) }}</p>
            </div>
            <div
              class="p-6 bg-white rounded-lg shadow-md text-center flex-1 min-w-[250px] max-w-[300px] flex flex-col border-l-4 border-l-blue-900">
              <h2 class="font-bold min-h-[4rem]">Total SA con sistema de cloración</h2>
              <p class="text-3xl mt-auto font-light">{{ formatNumber(resumeSystems.total_with_clorination) }}</p>
            </div>
            <div
              class="p-6 bg-white rounded-lg shadow-md text-center flex-1 min-w-[250px] max-w-[300px] flex flex-col border-l-4 border-l-blue-900">
              <h2 class="font-bold min-h-[4rem]">Total SA que realiza cloración</h2>
              <p class="text-3xl mt-auto font-light">{{ formatNumber(resumeSystems.total_makes_clorination) }}</p>
            </div>
            <div
              class="p-6 bg-white rounded-lg shadow-md text-center flex-1 min-w-[250px] max-w-[300px] flex flex-col border-l-4 border-l-blue-900">
              <h2 class="font-bold min-h-[4rem]">Total población atendida</h2>
              <p class="text-3xl mt-auto font-light">{{ formatNumber(resumeSystems.total_people_served) }}</p>
            </div>
            <div
              class="p-6 bg-white rounded-lg shadow-md text-center flex-1 min-w-[250px] max-w-[300px] flex flex-col border-l-4 border-l-blue-900">
              <h2 class="font-bold min-h-[4rem]">Total población que toma agua con cloro</h2>
              <p class="text-3xl mt-auto font-light">{{ formatNumber(resumeSystems.total_people_served_with_clorination)
                }}</p>
            </div>
          </div>
        </div>
        <div class="w-full lg:w-1/2">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-4 py-3 text-center">Provincia</th>
              <th scope="col" class="px-4 py-3 text-center">Total Sistemas</th>
              <th scope="col" class="px-4 py-3 text-center">Sist. con agua continua</th>
              <th scope="col" class="px-4 py-3 text-center">Sist. con cloración</th>
              <th scope="col" class="px-4 py-3 text-center">Sist. hacen cloración</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="province in resumeProvinces" :key="province.population_center__district__province__id"
                class="bg-white border-b hover:cursor-pointer">
              <td class="px-4 py-3 text-center">{{ province.population_center__district__province__name }}</td>
              <td class="px-4 py-3 text-center">{{ province.total_systems }}</td>
              <td class="px-4 py-3 text-center">{{ province.total_with_continous_water }}</td>
              <td class="px-4 py-3 text-center">{{ province.total_with_clorination }}</td>
              <td class="px-4 py-3 text-center">{{ province.total_makes_clorination }}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
    <section class="w-full justify-center mx-auto py-[100px] bg-white container">
      <h2 class="text-3xl font-bold mb-1 text-center uppercase">
        Resumen de <span class="text-blue-900">por estado de los sistemas</span>
      </h2>
      <div class="flex flex-wrap justify-around gap-6 w-full mt-10">
        <div
          v-for="state in resumeStates"
          class="p-6 bg-blue-100 rounded-lg shadow-md text-center flex-1 min-w-[250px] max-w-[300px] flex flex-col border-l-4 border-l-blue-900">
          <h2 class="font-bold min-h-[4rem] uppercase">{{ state.operational_state_annual }}</h2>
          <p class="text-3xl mt-auto font-light">{{ formatNumber(state.total) }}</p>
        </div>
      </div>
      <p class="text-sm text-gray-400 mt-10">*NAN: Not a Number (No se tiene información registrada en DATASS)</p>
    </section>
    <section class="flex flex-col w-full justify-center mx-auto py-[100px] bg-blue-100">
      <h2 class="text-3xl font-bold mb-1 text-center uppercase">
        Resumen de <span class="text-blue-900">por estado de los sistemas</span>
      </h2>
      <div class="container mx-auto flex flex-col lg:flex-row justify-center items-center lg:items-start w-full gap-8">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full mt-10">
          <div
            v-for="type in resumeTypes"
            :key="type.id"
            class="p-6 bg-white rounded-lg shadow-md text-center flex-1 min-w-[250px] max-w-[300px] flex flex-col border-l-4 border-l-blue-900">
            <h2 class="font-bold min-h-[4rem] uppercase">{{ type.water_system_type }}</h2>
            <p class="text-3xl mt-auto font-light">{{ formatNumber(type.total) }}</p>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>
<script>
import { onMounted, ref } from 'vue'
import { fetchRegionResume } from '@/services/systems.service.js'
import { formatNumber } from '@/utils/utils.js'

export default {
  name: 'SystemsHome',
  setup() {
    const resumeSystems = ref({
      total_systems: 0,
      total_with_continous_water: 0,
      total_with_clorination: 0,
      total_makes_clorination: 0
    })
    const resumeProvinces = ref([])
    const resumeStates = ref(null)
    const resumeTypes = ref(null)

    const fetchResume = async () => {
      let response = await fetchRegionResume()
      resumeProvinces.value = response.systems_resume
      resumeSystems.value = {
        total_systems: response.systems_resume.reduce((acc, curr) => acc + curr.total_systems, 0),
        total_with_continous_water: response.systems_resume.reduce((acc, curr) => acc + curr.total_with_continous_water, 0),
        total_with_clorination: response.systems_resume.reduce((acc, curr) => acc + curr.total_with_clorination, 0),
        total_makes_clorination: response.systems_resume.reduce((acc, curr) => acc + curr.total_makes_clorination, 0),
        total_people_served: response.systems_resume.reduce((acc, curr) => acc + curr.total_people_served, 0),
        total_people_served_with_clorination: response.systems_resume.reduce((acc, curr) => acc + curr.total_people_served_with_clorination, 0)
      }
      resumeStates.value = response.states_resume
      resumeTypes.value = response.types_resume
    }

    onMounted(() => {
      fetchResume()
    })

    return {
      resumeSystems,
      resumeProvinces,
      resumeStates,
      resumeTypes,
      formatNumber
    }
  }
}
</script>