// routers/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import DefaultLayout from '../layouts/DefaultLayout.vue'
import ProvinceReport from '../views/ProvinceReport.vue'
import Ubigeo99Report from '../views/Ubigeo99Report.vue'
import SystemsHome from '../views/systems/SystemsHome.vue'

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: '',
        component: Home
      },
      {
        path: '/province/:provinceName',
        name: 'provinceReport',
        component: ProvinceReport,
        props: true
      },
      {
        path: '/ubigeo',
        name: 'ubigeoReport',
        component: Ubigeo99Report,
        props: true
      }
    ]
  },
  {
    path: '/sistemas',
    component: DefaultLayout,
    children: [
      {
        path: '',
        component: SystemsHome
      },
      {
        path: '/province/:provinceName',
        name: 'provinceReport',
        component: ProvinceReport,
        props: true
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
