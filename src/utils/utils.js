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
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator)
}
