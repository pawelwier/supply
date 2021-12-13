<template>
  <td>
    {{`${demand.name}: ${demand.originalQuantity} x ${demand.unit}`}}
  </td>
  <td v-for="(field, i) in filteredFields" :key="i" :class="recordClass">
    {{getFieldValue(demand, field)}}
  </td>
  <tr>
    <td>
      123
    </td>
  </tr>
</template>

<script setup>
import {defineProps} from "vue";
import {demandFields} from "../../data/demandFields";
import {formatDate} from "../../utils/formUtils";

defineProps({
  demand: null
})
// TODO: duplicates with DemandRecord
const getFieldValue = (demand, value) => value === 'createdAt' ? formatDate(new Date(demand[value])) : demand[value]

// TODO: duplicates with DemandRecord
const filteredFields = demandFields.filter(field => !['name', 'quantity', 'unit'].includes(field))

</script>

<style scoped>

</style>
