import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../views/HomeView.vue'
import Translation from '../views/Translation.vue'
import DetailAduan from '../views/DetailAduan.vue'
// import Copy from '../views/Copy.vue'
import TambahAduan from '../views/TambahAduan.vue'
import TukarPassword from '../views/TukarPassword.vue'
import TambahPengguna from '../views/TambahPengguna.vue'
import SiasatanPage from '../views/SiasatanPage.vue'
import SenaraiPengguna from '../views/SenaraiPengguna.vue'
import SenaraiPengadu from '../views/SenaraiPengadu.vue'
import SelesaiPage from '../views/SelesaiPage.vue'
import RegisterPage from '../views/RegisterPage.vue'
import DetailPengadu from '../views/DetailPengadu.vue'
import DashboardPage from '../views/DashboardPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LoginPage
    },
    {
      path: '/translation',
      name: 'translate',
      component: Translation
    },
    {
      path: '/detailpengadu/:id',
      name: 'detailpengadu',
      component: DetailPengadu
    },
    {
      path: '/registerpage',
      name: 'registerpage',
      component: RegisterPage
    },
    {
      path: '/selesaipage',
      name: 'selesaipage',
      component: SelesaiPage
    },
    {
      path: '/senaraipengadu',
      name: 'senaraipengadu',
      component: SenaraiPengadu
    },
    {
      path: '/senaraipengguna',
      name: 'senaraipengguna',
      component: SenaraiPengguna
    },
    {
      path: '/siasatanpage',
      name: 'siasatanpage',
      component: SiasatanPage
    },
    {
      path: '/tambahpengguna',
      name: 'tambahpengguna',
      component: TambahPengguna
    },
    {
      path: '/tukarpassword',
      name: 'tukarpassword',
      component: TukarPassword
    },
    {
      path: '/tambahaduan',
      name: 'tambahaduan',
      component: TambahAduan
    },
    // {
    //   path: '/copy',
    //   name: 'copy',
    //   component: Copy
    // },
    {
      path: '/detailaduan/:id',
      name: 'detailaduan',
      component: DetailAduan,
      props: true
    },
    {
      path: '/dashboardpage',
      name: 'dashboardpage',
      component: DashboardPage
    },
  ]
})

export default router
