<template>
  <div class="archive-record">
    <div>
      {{`${demand.name}: ${demand.originalQuantity} x ${demand.unit}`}}
    </div>
    <div v-for="(field, i) in filteredFields" :key="i">
      {{getFieldValue(demand, field)}}
    </div>
    <button @click="getDemandOrders">{{showOrders ? 'Ukryj' : 'Pokaż historię zamówień' }}</button>
  </div>
  <div v-if="showOrders" class="demand-orders">
    <div v-for="(order, i) in orders" :key="i">ilość: {{order.quantity}}, ogarnięte przez: {{order.assignedTo}}</div>
  </div>
</template>

<script setup>
import {defineProps, ref} from "vue";
import {demandFields} from "../../data/demandFields";
import {formatDate} from "../../utils/formUtils";
import {getOrdersByDemandId} from "../../controllers/OrderController";

const props = defineProps({
  demand: null
})

const orders = ref([])
const showOrders = ref(false)

const getDemandOrders = async () => {
  showOrders.value = !showOrders.value
  const res = await getOrdersByDemandId(props.demand.id)
  orders.value = res.data
}

// TODO: duplicates with DemandRecord
const getFieldValue = (demand, value) => value === 'createdAt' ? formatDate(new Date(demand[value])) : demand[value]

// TODO: duplicates with DemandRecord
const filteredFields = demandFields.filter(field => !['name', 'quantity', 'unit'].includes(field))

</script>

<style scoped>
.archive-record {
  display: flex;
  gap: 20px;
  align-items: center;
  margin-top: 10px;
}
.demand-orders {
  text-align: left;
}
</style>
