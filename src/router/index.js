import { createRouter, createWebHistory } from 'vue-router'
import Demands from '../views/Demands.vue'
import Orders from '../views/Orders.vue'
import Archive from '../views/Archive.vue'

const routes = [
  {
    path: '/',
    name: 'Demands',
    component: Demands
  },
  {
    path: '/orders',
    name: 'Orders',
    component: Orders
  },
  {
    path: '/archive',
    name: 'Archive',
    component: Archive
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
