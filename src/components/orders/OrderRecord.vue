<template>
  <td v-if="demand">
    {{demand.name}}
  </td>
  <td v-if="demand">
    {{demand.unit}}
  </td>
  <td v-for="(field, i) in orderFields" :key="i">
    {{getFieldValue(order, field)}}
  </td>
  <td>
    <OrderStatusButtons :status="order.status" @status-change="orderStatusChange" />
  </td>
</template>

<script setup>
import {defineProps, onMounted, ref} from 'vue'
import {orderFields} from '../../data/orderFields'
import {formatDate} from "../../utils/formUtils";
import {getDemandById} from "../../controllers/DemandController";
// import {editOrder} from "../../controllers/OrderController";
import OrderStatusButtons from "../../components/orders/OrderStatusButtons";
import {editOrder} from "../../controllers/OrderController";

const props = defineProps({
  order: Object,
})

const demand = ref(null)

const getFieldValue = (order, value) => value === 'createdAt' ? formatDate(new Date(order[value])) : order[value]

const orderStatusChange = async (prevStatus) => {
  const status = prevStatus === 'nowy' ? 'w trakcie' : prevStatus === 'w trakcie' ? 'zakończone' : ''
  await editOrder({status}, props.order.id)
  window.location.reload()
}

onMounted(async () => {
  const id = props.order.productId
  const res = await getDemandById(id)
  demand.value = res.data[0]
})
</script>

<style scoped>

</style>
