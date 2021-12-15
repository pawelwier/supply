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
    <OrderStatusButtons
      :status="order.status"
      @status-change="orderStatusChange"
      @cancel-order="cancelOrder"
    />
  </td>
  <td>
    {{statusChangeDate}}
  </td>
</template>

<script setup>
import {defineProps, onMounted, ref} from 'vue'
import {orderFields} from '../../data/orderFields'
import {formatDate} from "../../utils/formUtils";
import OrderStatusButtons from "../../components/orders/OrderStatusButtons";
import {editDemand, getDemandById,} from "../../controllers/DemandController";
import {deleteOrder, editOrder,} from "../../controllers/OrderController";

const props = defineProps({
  order: Object,
})
const demand = ref(null)

const getFieldValue = (order, value) => value === 'createdAt' ? formatDate(new Date(order[value])) : order[value]

const statusChangeDate = props.order.orderFinishedAt ? `Wykonano: ${formatDate(new Date (props.order.orderFinishedAt))}` :
  props.order.orderStartedAt ? `Rozpoczęto: ${formatDate(new Date (props.order.orderStartedAt))}` : ''


const orderStatusChange = async (prevStatus) => {
  const status = prevStatus === 'nowy' ? 'w trakcie' : prevStatus === 'w trakcie' ? 'zakończone' : ''
  await editOrder({status}, props.order.id)
  const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
  if (status === 'w trakcie') await editOrder({orderStartedAt: currentDate}, props.order.id)
  if (status === 'zakończone') await editOrder({orderFinishedAt: currentDate}, props.order.id)
  window.location.reload()
}

const cancelOrder = async () => {
  await editDemand({quantity: demand.value.quantity + props.order.quantity}, demand.value.id)
  await deleteOrder(props.order.id)
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
