import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Folder from '../views/Folder.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/folder/:id',
    name: 'Folder',
    component: Folder
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
