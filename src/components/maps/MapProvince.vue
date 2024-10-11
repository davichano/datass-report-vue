<template>
  <div ref="mapContainer" class="w-full h-[600px] md:h-[500px]"></div>
</template>

<script>
import * as d3 from 'd3'
import { geoMercator, geoPath } from 'd3-geo'
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { getCoverageColor, normalizeString } from '@/utils/utils.js'

export default {
  name: 'MapProvince',
  props: {
    province: {
      required: true
    },
    districtsData: {
      type: Array,
      required: true
    },
    percentageType: {
      type: String,
      default: 'water'
    }
  },
  setup(props) {
    const mapContainer = ref(null)
    let svg = null

    const renderMap = () => {
      const width = mapContainer.value.clientWidth || 600
      const height = mapContainer.value.clientHeight || 500

      if (svg) svg.remove()

      svg = d3
        .select(mapContainer.value)
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox', `0 0 ${width} ${height}`)
        .attr('preserveAspectRatio', 'xMidYMid meet')

      d3.json('/geojson/peru_distrital_simple.geojson').then((geoData) => {

        const provinceDistricts = geoData.features.filter(
          (d) => normalizeString(d.properties.NOMBPROV) === normalizeString(props.province.name)
        )

        const projection = geoMercator().fitSize([width, height], {
          type: 'FeatureCollection',
          features: provinceDistricts
        })

        const path = geoPath().projection(projection)

        svg
          .selectAll('path')
          .data(provinceDistricts)
          .enter()
          .append('path')
          .attr('d', path)
          .attr('fill', (d) => {
            const districtData = props.districtsData.find(
              (dist) => normalizeString(dist.name) === normalizeString(d.properties.NOMBDIST)
            )
            return districtData
              ? getCoverageColor(
                props.percentageType === 'water'
                  ? districtData.percentage_with_water
                  : districtData.percentage_with_ubs
              )
              : 'rgba(255, 255, 255, 1)'
          })
          .attr('stroke', 'black')
          .attr('stroke-width', 1)
          .style('cursor', 'pointer')
          .on('mouseover', function(event, d) {
            d3.select(this).attr('stroke-width', 3).attr('stroke', '#1e3a8a')
          })
          .on('mouseout', function(event, d) {
            d3.select(this).attr('stroke-width', 1).attr('stroke', 'black')
          })

        // Añadir los nombres de los distritos y porcentajes de agua o UBS
        svg
          .selectAll('text')
          .data(provinceDistricts)
          .enter()
          .append('text')
          .attr('x', (d) => path.centroid(d)[0])
          .attr('y', (d) => path.centroid(d)[1])
          .attr('text-anchor', 'middle')
          .attr('fill', '#000')
          .attr('font-size', '10px')
          .each(function(d) {
            const districtData = props.districtsData.find(
              (dist) => normalizeString(dist.name) === normalizeString(d.properties.NOMBDIST)
            )
            const districtName = d.properties.NOMBDIST
            const waterOrUBSPercentage = districtData
              ? props.percentageType === 'water'
                ? `(${districtData.percentage_with_water.toFixed(2)}%)`
                : `(${districtData.percentage_with_ubs.toFixed(2)}%)`
              : ''

            d3.select(this)
              .append('tspan')
              .attr('x', path.centroid(d)[0])
              .attr('dy', '0')
              .attr('font-weight', 'bold')
              .text(districtName)

            d3.select(this)
              .append('tspan')
              .attr('x', path.centroid(d)[0])
              .attr('dy', '1.2em')
              .text(waterOrUBSPercentage)
          })
      })
    }

    // Rerender el mapa cuando cambien las props
    watch([() => props.province, () => props.districtsData, () => props.percentageType], renderMap)

    const handleResize = () => {
      renderMap()
    }

    onMounted(() => {
      renderMap()
      window.addEventListener('resize', handleResize) // Manejar cambio de tamaño
    })

    onBeforeUnmount(() => {
      window.removeEventListener('resize', handleResize) // Limpiar evento al desmontar
    })

    return {
      mapContainer
    }
  }
}
</script>
