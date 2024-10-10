<template>
  <div ref="mapContainer" class="w-full h-[600px] md:h-[500px]"></div>
</template>

<script>
import * as d3 from 'd3'
import { geoPath, geoMercator } from 'd3-geo'
import { onMounted, ref, watch, onBeforeUnmount } from 'vue'
import { normalizeString, getCoverageColor } from '@/utils/utils.js'

export default {
  name: 'MapCajamarcaUBS',
  props: {
    provincesData: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    const mapContainer = ref(null)
    let svg = null

    const renderMap = () => {
      const width = mapContainer.value.clientWidth
      const height = Math.max(mapContainer.value.clientHeight, 750)

      if (svg) svg.remove()

      svg = d3
        .select(mapContainer.value)
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox', `0 0 ${width} ${height}`)
        .attr('preserveAspectRatio', 'xMidYMid meet')

      const projection = geoMercator()
        .center([-78.5, -7.2])
        .scale(10000)
        .translate([width / 2, height / 2 + 100])

      const path = geoPath().projection(projection)

      d3.json('/geojson/peru_provincial_simple.geojson').then((geoData) => {
        const cajamarcaProvinces = geoData.features.filter(
          (d) => d.properties.FIRST_NOMB === 'CAJAMARCA'
        )

        svg
          .selectAll('path')
          .data(cajamarcaProvinces)
          .enter()
          .append('path')
          .attr('d', path)
          .attr('fill', (d) => {
            const provinceData = props.provincesData.find(p => normalizeString(p.name) === normalizeString(d.properties.NOMBPROV))
            return provinceData ? getCoverageColor(provinceData.percentage_with_ubs) : 'rgba(255, 255, 255, 1)'
          })
          .attr('stroke', 'black')
          .attr('stroke-width', 1)
          .style('cursor', 'pointer')
          .on('mouseover', function(event, d) {
            d3.select(this)
              .attr('stroke-width', 3)
              .attr('stroke', '#1e3a8a')
          })
          .on('mouseout', function(event, d) {
            d3.select(this)
              .attr('stroke-width', 1)
              .attr('stroke', 'black')
          })

        svg
          .selectAll('text')
          .data(cajamarcaProvinces)
          .enter()
          .append('text')
          .attr('x', (d) => path.centroid(d)[0])
          .attr('y', (d) => path.centroid(d)[1])
          .attr('text-anchor', 'middle')
          .attr('fill', '#000')
          .attr('font-size', '10px')
          .each(function(d) {
            const provinceData = props.provincesData.find(p => normalizeString(p.name) === normalizeString(d.properties.NOMBPROV))
            const provinceName = d.properties.NOMBPROV
            const ubsPercentage = provinceData ? `(${provinceData.percentage_with_ubs.toFixed(2)}%)` : ''

            d3.select(this)
              .append('tspan')
              .attr('x', path.centroid(d)[0])
              .attr('dy', '0')
              .attr('font-weight', 'bold')
              .text(provinceName)

            d3.select(this)
              .append('tspan')
              .attr('x', path.centroid(d)[0])
              .attr('dy', '1.2em')
              .text(ubsPercentage)
          })
      })
    }

    watch(() => props.provincesData, renderMap)

    const handleResize = () => {
      renderMap()
    }

    onMounted(() => {
      renderMap()
      window.addEventListener('resize', handleResize) // Escuchar cambios de tamaño de la ventana
    })

    onBeforeUnmount(() => {
      window.removeEventListener('resize', handleResize) // Limpiar el evento cuando se desmonte
    })

    return {
      mapContainer
    }
  }
}
</script>
