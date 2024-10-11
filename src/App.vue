<script setup>
import { computed } from 'vue'
import { isLoading } from './axios'
import LoadingSpinner from './components/LoadingSpinner.vue'

const loadingState = computed(() => isLoading.value)
</script>

<template>
  <LoadingSpinner :isVisible="loadingState" />
  <router-view />
</template>

<style scoped>
</style>
