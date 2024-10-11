<template>
  <div v-if="isVisible" class="loading-spinner">
    <div class="spinner">Cargando...</div>
  </div>
</template>
<script>
export default {
  name: 'LoadingSpinner',
  props: {
    isVisible: {
      type: Boolean,
      required: true
    }
  }
}
</script>

<style scoped>
.loading-spinner {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.7);
  z-index: 9999;
}

.spinner {
  font-size: 1.5rem;
  color: #3498db;
}
</style>