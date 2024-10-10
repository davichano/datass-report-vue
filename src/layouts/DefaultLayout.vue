<!-- src/layouts/DefaultLayout.vue -->
<template>
  <div class="flex flex-col min-h-screen poppins-medium">
    <!-- Header -->
    <header class="bg-blue-100">
      <nav class="container mx-auto px-6 py-4 flex justify-between items-center">
        <!-- Logo -->
        <div class="flex items-center space-x-3">
          <!-- Logo -->
          <img :src="logo" alt="Logo" class="h-16 w-16" />

          <!-- Text next to logo -->
          <div class="text-blue-950">
            <h1 class="text-xl font-bold">DATASS Report</h1>
            <p class="text-sm">Cajamarca</p>
          </div>
        </div>

        <!-- Menu for larger screens -->
        <ul class="hidden md:flex space-x-4">
          <li>
            <router-link to="/" class="hover:text-gray-400">Home</router-link>
          </li>
        </ul>

        <!-- Hamburger Menu for mobile -->
        <button @click="toggleMenu" class="md:hidden focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <!-- Mobile menu -->
        <div v-if="mobileMenuOpen" class="absolute top-16 right-0 bg-gray-800 w-full p-6 md:hidden">
          <ul class="flex flex-col space-y-4">
            <li>
              <router-link @click="toggleMenu" to="/" class="hover:text-gray-400">Home</router-link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
    <router-view />

    <!-- Main content -->


    <!-- Footer -->
    <!-- Footer -->
    <footer class="bg-blue-100 text-blue-900 py-10">
      <div class="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- About Section -->
        <div class="space-y-4">
          <div class="flex items-start space-x-5">
            <!-- Logo -->
            <img :src="logo" alt="Logo" class="h-16 w-16" />

            <!-- Text next to logo -->
            <div>
              <h3 class="text-lg font-bold">DATASS Report</h3>
              <p class="text-sm text-justify font-light text-black">
                Plataforma de monitoreo de acceso a servicios básicos en la región de Cajamarca. Con datos detallados,
                apoyamos la mejora de las condiciones de vida en las comunidades rurales.
              </p>
            </div>
          </div>

        </div>

        <!-- Quick Links -->
        <div class="space-y-4">
          <h3 class="text-lg font-bold">Enlaces rápidos</h3>
          <ul class="space-y-2">
            <li>
              <router-link to="/" class="hover:underline  text-black">Inicio</router-link>
            </li>
            <!-- Puedes agregar más enlaces -->
          </ul>
        </div>

        <!-- Contact & Socials -->
        <div class="space-y-4">
          <h3 class="text-lg font-bold">Contacto</h3>
          <p class="text-sm text-black">info@datasscajamarca.com</p>
          <div class="flex space-x-4">
            <!-- Icono de ejemplo para redes sociales -->
            <a href="#" class=" text-black hover:text-blue-400">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M24 4.56v14.91c0 2.49-2.02 4.5-4.5 4.5h-15c-2.48 0-4.5-2.02-4.5-4.5v-14.91c0-2.48 2.02-4.5 4.5-4.5h15c2.48 0 4.5 2.02 4.5 4.5zm-9.5 0h-1.66c-.32 0-.58.25-.58.57v1.65c0 .32.26.58.58.58h1.66c.32 0 .58-.26.58-.58v-1.65c0-.32-.26-.57-.58-.57zm-7.5 0h-1.65c-.32 0-.57.25-.57.57v1.65c0 .32.26.58.58.58h1.65c.32 0 .58-.26.58-.58v-1.65c0-.32-.25-.57-.58-.57zm0 16h10.5c.32 0 .58-.26.58-.58v-10.5h-2.65c-.32 0-.58-.26-.58-.58v-2.65h-7.5v2.65c0 .32-.26.58-.58.58h-2.65v10.5c0 .32.26.58.58.58zm2.5-8.09c-.46 0-.91.19-1.23.52s-.52.77-.52 1.23.19.91.52 1.23.77.52 1.23.52.91-.19 1.23-.52.52-.77.52-1.23-.19-.91-.52-1.23-.77-.52-1.23-.52z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div class="container mx-auto px-6 mt-8 text-center border-t border-blue-800 pt-4">
        <p>&copy; {{ new Date().getFullYear() }} DRVCS CAJAMARCA. Todos los derechos reservados.</p>

      </div>
    </footer>
  </div>
</template>

<script>
import logo from '@/assets/images/logo.png'

export default {
  data() {
    return {
      mobileMenuOpen: false,
      logo
    }
  },
  methods: {
    toggleMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen
    }
  }
}
</script>

<style scoped>
/* Scoped styles */
</style>
