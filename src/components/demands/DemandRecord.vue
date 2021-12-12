<template>
  <td v-for="(field, i) in demandFields" :key="i">
    {{getFieldValue(demand, field)}}
  </td>
  <td>
    <AddOrderButton />
  </td>
</template>

<script setup>
import {defineProps} from 'vue'
import {formatDate} from "../../utils/formUtils";
import AddOrderButton from "../orders/AddOrderButton";

defineProps({
  demand: Object,
})

const demandFields = [
  'name',
  'unit',
  'quantity',
  'comment',
  'createdBy',
  'assignedTo',
  'status',
  'createdAt',
]

const getFieldValue = (demand, value) => value === 'createdAt' ? formatDate(new Date(demand[value])) : demand[value]
</script>

<style scoped>

</style>
