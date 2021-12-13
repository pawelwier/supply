<template>
  <td v-for="(field, i) in demandFields" :key="i">
    {{getFieldValue(demand, field)}}
  </td>
  <td>
    <AddOrderButton :id="demand.id" />
  </td>
</template>

<script setup>
import {defineProps} from 'vue'
import {demandFields} from '../../data/demandFields'
import {formatDate} from "../../utils/formUtils";
import AddOrderButton from "../orders/AddOrderButton";

defineProps({
  demand: Object,
})


const getFieldValue = (demand, value) => value === 'createdAt' ? formatDate(new Date(demand[value])) : demand[value]
</script>

<style scoped>

</style>
