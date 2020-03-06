import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Modules from '../components/Modules.vue'
import store from '../store/index'
import Module from '../components/Module.vue'
import Exercises from '../components/Exercises.vue'

Vue.use(VueRouter)

async function beforeEnter (_to, _from, next) {
  if (!store.getters['user/isAuthenticated']) {
    await store.dispatch('user/fetchUser')
  }
  if (store.getters['user/isAuthenticated']) {
    next()
    return
  }
  next('/login')
}

const routes = [
  {
    path: '/',
    name: 'modules',
    component: Modules,
    beforeEnter
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/module/:id',
    name: 'module',
    component: Module
  },
  {
    path: '/session/:id/exercises',
    name: 'exercises',
    component: Exercises
  }

]

// admin@example.com
// password: y5Epdg25Ue
export default new VueRouter({ routes })
