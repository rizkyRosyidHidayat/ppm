import Vue from 'vue'
import Router from 'vue-router'
import ModuleSignup from './views/ModuleSignup.vue'
import ModuleHome from './views/ModuleHome.vue'
import ModuleLogin from './views/ModuleLogin.vue'
import ModuleIndex from './views/ModuleIndex.vue'
import ModuleBantuan from './views/ModuleBantuan.vue'
import Dashboard from './components/ModuleHome/Dashboard'
import EditProfile from './components/ModuleHome/EditProfile'
import DaftarOpenHouse from './components/ModuleHome/DaftarOpenHouse'
import Bantuan from './components/ModuleHome/Bantuan'
import Stepper from './components/ModuleSignup/Stepper'
import DataPrestasi from './components/ModuleSignup/DataPrestasi'
import TabelPrestasi from './components/ModuleHome/DataPrestasi/TabelPrestasi'
import DataPenyakit from './components/ModuleSignup/DataPenyakit'
import DaftarPenyakit from './components/ModuleHome/DataPenyakit/DaftarPenyakit'
import { logout } from './logout'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'index',
      component: ModuleIndex
    },
    {
      path: '/bantuan',
      name: 'bantuan',
      component: ModuleBantuan
    },
    {
      path: '/login',
      name: 'login',
      component: ModuleLogin
    },
    {
      path: '/signup',
      name: '',
      component: ModuleSignup,
      children: [
        {
          path: '/',
          name: 'signup.stepper',
          component: Stepper
        },
        {
          path: '/prestasi',
          name: 'signup.prestasi',
          meta: { requiresAuth: true },
          component: DataPrestasi,
        },
        {
          path: '/penyakit',
          name: 'signup.penyakit',
          meta: { requiresAuth: true },
          component: DataPenyakit,
        }
      ]
    },
    {
      path: '/home',
      name: '',
      component: ModuleHome,
      meta: { requiresAuth: true },
      children: [
        {
          path: '/',
          name: 'home.dashboard',
          component: Dashboard
        },
        {
          path: 'edit',
          name: 'home.edit',
          component: EditProfile
        },
        {
          path: 'daftar',
          name: 'home.daftar',
          component: DaftarOpenHouse
        },
        {
          path: 'bantuan',
          name: 'home.bantuan',
          component: Bantuan
        },
        {
          path: 'prestasi',
          name: 'home.prestasi',
          component: TabelPrestasi
        },
        {
          path: 'penyakit',
          name: 'home.penyakit',
          component: DaftarPenyakit
        }
      ]
    },

    {
      path: '/logout',
      name: 'logout',
      component: logout
    },
  ]
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(route => route.meta.requiresAuth)
  const isLoggedIn = window.localStorage.getItem('auth_token')
  
  if (requiresAuth && !isLoggedIn) {
    next({ name: 'login'})
  } else if(isLoggedIn && to.name === 'login') {
    next({ name: 'home.dashboard' })
  }else if (requiresAuth && isLoggedIn) {
    next()
  } else {
    next()
  }
})

export default router