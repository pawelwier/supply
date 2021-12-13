import { createRouter, createWebHistory } from 'vue-router'
import Demands from '../views/Demands.vue'
import Orders from '../views/Orders.vue'

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
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
