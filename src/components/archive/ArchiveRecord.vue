<template>
  <div class="archive-record-wrapper">
    <div class="archive-record">
      <div>
        {{`${demand.name}: ${demandTotal} x ${demand.unit}`}}
      </div>
      <div v-for="(field, i) in filteredFields" :key="i">
        {{getFieldValue(demand, field)}}
      </div>
      <button @click="getDemandOrders">{{showOrders ? 'Ukryj' : 'Pokaż historię zamówień' }}</button>
    </div>
    <div v-if="showOrders" class="demand-orders">
      <ArchiveOrderRecord v-for="(order, i) in orders" :key="i" :order="order" />
    </div>
  </div>
</template>

<script setup>
import {defineProps, onMounted, ref} from "vue";
import {demandFields} from "../../data/demandFields";
import {formatDate} from "../../utils/formUtils";
import {getOrdersByDemandId} from "../../controllers/OrderController";
import ArchiveOrderRecord from "./ArchiveOrderRecord";

const props = defineProps({
  demand: null
})

const orders = ref([])
const showOrders = ref(true)
const demandTotal = ref(0)

const getDemandOrders = async () => {
  showOrders.value = !showOrders.value
  const res = await getOrdersByDemandId(props.demand.id)
  orders.value = res.data
}

// TODO: duplicates with DemandRecord
const getFieldValue = (demand, value) => value === 'createdAt' ? formatDate(new Date(demand[value])) : demand[value]

// TODO: duplicates with DemandRecord
const filteredFields = demandFields.filter(field => !['name', 'quantity', 'unit', 'createdBy'].includes(field))

onMounted(async () => {
  await getDemandOrders()
  demandTotal.value = orders.value.map(({quantity}) => quantity).reduce((a, b) => a + b)
})

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
  margin-left: 20px;
}
.archive-record-wrapper {
  background-color: #BEAC4D49;
  padding: 10px;
  margin-bottom: 20px;
}
</style>
