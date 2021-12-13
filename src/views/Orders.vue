<template>
  <div class="home" v-if="orders">
    <table>
      <tbody>
      <tr>
        <th v-for="header in headers" :key="header">
          {{header}}
        </th>
      </tr>
      <tr v-for="order in orders" :key="order.id">
        <OrderRecord :order="order" />
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import {onMounted, ref} from 'vue'
import {getAllOrders} from '../controllers/OrderController'
import OrderRecord from "../components/orders/OrderRecord";

const orders = ref(null)
const headers = [
  'nazwa',
  'jednostka',
  'ilość',
  'komentarz',
  'kto dodał',
  'kto ogarnia',
  'status',
  'data dodania',
]

onMounted(async () => {
  const res = await getAllOrders()
  orders.value = res.data
  console.log(orders.value)
})

</script>

<style>
th {
  padding: 0 20px;
}
</style>
