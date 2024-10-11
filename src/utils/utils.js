// src/utils/utils.js
export const getFormattedDate = (date) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(date).toLocaleDateString('es-ES', options)
}
export const normalizeString = (string) => {
  return string.trim().toLowerCase()
}

export const getCoverageColor = (percentage) => {
  if (
    percentage === null ||
    percentage === undefined ||
    Number.isNaN(percentage) ||
    percentage === 0
  )
    return 'rgba(255, 255, 255, 1)'
  if (percentage <= 20) return 'rgba(255, 220, 232, 1)'
  if (percentage <= 40) return 'rgba(255, 180, 232, 1)'
  if (percentage <= 60) return 'rgba(255, 235, 190, 1)'
  if (percentage <= 80) return 'rgba(190, 232, 255, 1)'
  return 'rgba(115, 178, 255, 1)'
}

export const formatNumber = (number, separator = ',') => {
  if (typeof number !== 'number') return number

  if (Number.isInteger(number)) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator)
  }

  const [integerPart, decimalPart] = number.toFixed(2).split('.')

  return `${integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, separator)}.${
    decimalPart
  }`
}

export const haversine = (lat1, lon1, lat2, lon2) => {
  const R = 6371e3
  const toRadians = (degrees) => degrees * (Math.PI / 180)

  const radLat1 = toRadians(lat1)
  const radLat2 = toRadians(lat2)
  const deltaLat = toRadians(lat2 - lat1)
  const deltaLon = toRadians(lon2 - lon1)

  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(radLat1) *
      Math.cos(radLat2) *
      Math.sin(deltaLon / 2) *
      Math.sin(deltaLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  return R * c
}
