<template>
  <div ref="mapElement" class="map-container"></div>
</template>

<script>
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { ref, onMounted, nextTick } from 'vue'
import markerRed from '@/assets/images/map-marker-red.png'
import markerGreen from '@/assets/images/map-marker-green.png'

export default {
  props: {
    populationCenters99: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    const mapElement = ref(null)
    let map = null

    const renderMap = () => {
      if (mapElement.value) {
        map = L.map(mapElement.value).setView([props.populationCenters99[0].latitude_datass, props.populationCenters99[0].longitude_datass], 12)

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.linkedin.com/in/dparedesa">David Paredes</a>'
        }).addTo(map)

        props.populationCenters99.forEach((pc) => {
          L.marker([pc.latitude_datass, pc.longitude_datass], {
            icon: L.icon({
              iconUrl: markerRed,
              iconSize: [41, 41],
              iconAnchor: [41, 41],
              popupAnchor: [1, -34],
              shadowSize: [41, 41]
            })
          }).addTo(map)
            .bindPopup(`<strong>${pc.name}</strong><br>Ubigeo: ${pc.code}`)
            .openPopup()

          // Agrega los CP cercanos en verde
          pc.nearest_population_centers.forEach(nearestPc => {
            L.marker([nearestPc.latitude_datass, nearestPc.longitude_datass], {
              icon: L.icon({
                iconUrl: markerGreen,
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
              })
            }).addTo(map)
              .bindPopup(`<strong>${nearestPc.name}</strong><br>Ubigeo: ${nearestPc.code}<br>Distancia: ${nearestPc.distance.toFixed(2)}m`)
          })
        })
      }
    }

    onMounted(async () => {
      await nextTick()  // Espera a que el DOM esté completamente cargado
      renderMap()  // Renderiza el mapa después de que el contenedor esté disponible
    })

    return {
      mapElement
    }
  }
}
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 600px;
}
</style>
