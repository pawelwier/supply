<template>
  <div class="home" v-if="orders && loggedIn">
    <CategorySelect @change="categorySelect" />
    <table>
      <tbody>
      <tr>
        <th v-for="(header, i) in headers" :key="i">
          {{header}}
        </th>
      </tr>
      <tr v-for="(order, i) in orders" :key="i">
        <OrderRecord :order="order" />
      </tr>
      </tbody>
    </table>
  </div>
  <LoginRedirect v-else />
</template>

<script setup>
import {onMounted, ref} from 'vue'
import {useStore} from "vuex";
import {getAllOrders, getOrdersByCategory} from '../controllers/OrderController'
import OrderRecord from "../components/orders/OrderRecord";
import CategorySelect from "../components/utils/CategorySelect";
import LoginRedirect from "../components/utils/LoginRedirect";

const store = useStore()

const orders = ref(null)
const loggedIn = ref(false)

const headers = [
  'nazwa',
  'jednostka',
  'liczba / ilość',
  'komentarz',
  'kto dodał',
  'kto ogarnia',
  'skąd brane',
  'status',
  'data dodania',
]

const categorySelect = async (category) => {
  const res = category ? await getOrdersByCategory(category) : await getAllOrders()
  orders.value = res.data
}

onMounted(async () => {
  loggedIn.value = store.getters.isLoggedIn
  const res = await getAllOrders()
  orders.value = res.data
})

</script>

<style>
th {
  padding: 0 20px;
}
</style>
