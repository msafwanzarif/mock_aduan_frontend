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
import ErrorPage from '../views/ErrorPage.vue'

const isAuthenticated = () => {
  return localStorage.getItem('token') !== null
}

const hasRestrictedRole = (restrictedRoleIds) => {
  const userRoleId = localStorage.getItem('roleId')
  return restrictedRoleIds.includes(userRoleId)
}

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
      component: DetailPengadu,
      meta: ({ requiresAuth: true, restrictedRoleIds: '3'})
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
      component: SenaraiPengadu,
      meta: ({ requiresAuth: true, restrictedRoleIds: '3' })
    },
    {
      path: '/senaraipengguna',
      name: 'senaraipengguna',
      component: SenaraiPengguna,
      meta: ({ requiresAuth: true, restrictedRoleIds: ['2','3'] })
    },
    {
      path: '/siasatanpage',
      name: 'siasatanpage',
      component: SiasatanPage,
      meta: ({ requiresAuth: true })
    },
    {
      path: '/tambahpengguna',
      name: 'tambahpengguna',
      component: TambahPengguna,
      meta: ({ requiresAuth: true, restrictedRoleIds: ['2', '3'] })
    },
    {
      path: '/tukarpassword',
      name: 'tukarpassword',
      component: TukarPassword,
      meta: ({ requiresAuth: true })
    },
    {
      path: '/tambahaduan',
      name: 'tambahaduan',
      component: TambahAduan,
      meta: ({ requiresAuth: true, restrictedRoleIds: ['1','2'] })
    },
    // {
    //   path: '/copy',
    //   name: 'copy',
    //   component: Copy
    // },
    {
      path: '/detailaduan/:aduanId',
      name: 'detailaduan',
      component: DetailAduan,
      meta: ({ requiresAuth: true }),
      props: true
    },
    {
      path: '/dashboardpage',
      name: 'dashboardpage',
      component: DashboardPage,
      meta: ({ requiresAuth: true })
    },
    {
      path: '/error',
      name: 'error',
      component: ErrorPage
    },
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated()) {
      next({ name: 'error' });
    } else {
      const restrictedRoleIds = to.meta.restrictedRoleIds;
      if (restrictedRoleIds && hasRestrictedRole(restrictedRoleIds)) {
        next({ name: 'error' }); 
      } else {
        next(); 
      }
    }
  } else {
    next(); 
  }
})

export default router
