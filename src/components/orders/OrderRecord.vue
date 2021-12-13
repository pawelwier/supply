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
</template>

<script setup>
import {defineProps, onMounted, ref} from 'vue'
import {orderFields} from '../../data/orderFields'
import {formatDate} from "../../utils/formUtils";
import {getDemandById} from "../../controllers/DemandController";

const props = defineProps({
  order: Object,
})

const demand = ref(null)

const getFieldValue = (order, value) => value === 'createdAt' ? formatDate(new Date(order[value])) : order[value]

onMounted(async () => {
  const id = props.order.productId
  const res = await getDemandById(id)
  demand.value = res.data[0]
})
</script>

<style scoped>

</style>
