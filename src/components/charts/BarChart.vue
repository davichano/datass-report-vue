<template>
  <div ref="chartContainer" class="bar-chart-container"></div>
</template>

<script>
import * as d3 from 'd3'
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { getCoverageColor } from '@/utils/utils.js' // Importa la función

export default {
  name: 'BarChart',
  props: {
    data: {
      type: Array,
      required: true,
      default: () => [{ label: 'Default', value: 0 }]
    }
  },
  setup(props) {
    const chartContainer = ref(null)
    let svg = null

    const renderChart = () => {
      const margin = { top: 20, right: 30, bottom: 40, left: 50 }
      const containerWidth = chartContainer.value.clientWidth || 600
      const containerHeight = chartContainer.value.clientHeight || 250

      const width = containerWidth - margin.left - margin.right
      const height = containerHeight - margin.top - margin.bottom

      if (svg) svg.remove()

      svg = d3
        .select(chartContainer.value)
        .append('svg')
        .attr('width', containerWidth)
        .attr('height', containerHeight)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`)

      const x = d3
        .scaleBand()
        .domain(props.data.map(d => d.label))
        .range([0, width])
        .padding(0.1)

      const y = d3
        .scaleLinear()
        .domain([0, d3.max(props.data, d => d.value)])
        .nice()
        .range([height, 0])

      // Eje X
      svg
        .append('g')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x))
        .selectAll('text')
        .attr('transform', 'rotate(-45)')
        .style('text-anchor', 'end')

      // Eje Y
      svg.append('g').call(d3.axisLeft(y))

      // Crear las barras con el color basado en el valor
      svg
        .selectAll('.bar')
        .data(props.data)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', d => x(d.label))
        .attr('y', d => y(d.value))
        .attr('width', x.bandwidth())
        .attr('height', d => height - y(d.value))
        .attr('fill', d => getCoverageColor(d.value)) // Usar getCoverageColor para el color

      // Añadir etiquetas con el valor encima de las barras
      svg
        .selectAll('.label')
        .data(props.data)
        .enter()
        .append('text')
        .attr('class', 'label')
        .attr('x', d => x(d.label) + x.bandwidth() / 2)
        .attr('y', d => y(d.value) - 5)
        .attr('text-anchor', 'middle')
        .attr('fill', 'black')
        .text(d => d.value.toFixed(2))
    }

    const handleResize = () => {
      renderChart()
    }

    watch(() => props.data, renderChart)

    onMounted(() => {
      renderChart()
      window.addEventListener('resize', handleResize)
    })

    onBeforeUnmount(() => {
      window.removeEventListener('resize', handleResize)
    })

    return {
      chartContainer
    }
  }
}
</script>

<style scoped>
.bar-chart-container {
  width: 100%;
  height: 100%;
  min-height: 250px; /* Asegura que el contenedor tenga una altura mínima */
}
</style>
