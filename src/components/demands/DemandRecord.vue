<template>
  <td :class="demand.quantity ? 'product-name-quantity' : ''">
    <span class="product-name">
      {{demand.name}}:
    </span>
    <span>
      {{`${demand.quantity} x ${demand.unit}`}}
    </span>
  </td>
  <td v-for="(field, i) in filteredFields" :key="i" :class="recordClass">
    {{getFieldValue(demand, field)}}
  </td>
  <td class="left-break">
    <AddOrderButton v-if="demand.quantity" :id="demand.id" :isComplete="demand.isComplete" />
  </td>
  <td>
    <ToggleUrgentButton v-if="demand.quantity" :urgent="demand.isUrgent" :id="demand.id" />
  </td>
</template>

<script setup>
import {defineProps, ref} from 'vue'
import {demandFields} from '../../data/demandFields'
import {formatDate} from "../../utils/formUtils";
import AddOrderButton from "../orders/AddOrderButton";
import ToggleUrgentButton from "../utils/ToggleUrgentButton";

const props = defineProps({
  demand: Object,
})

const filteredFields = demandFields.filter(field => !['name', 'quantity', 'unit'].includes(field))

const recordClass = ref(!props.demand.quantity ? 'inactive' : props.demand.isUrgent ? 'urgent' : '')

const getFieldValue = (demand, value) => value === 'createdAt' ? formatDate(new Date(demand[value])) : demand[value]
</script>

<style scoped>
.urgent {
  color: #9e2222;
  font-weight: 900;
}
.inactive {
  color: rgba(84,93,95,0.29)
}
.product-name-quantity {
  font-size: 18px;
  background-color: rgba(190,172,77,0.29);
  padding: 0 5px;
}
.left-break {
  padding-left: 30px;
}
.product-name-quantity .product-name {
  font-weight: 700;
  font-size: 22px;
}
</style>
