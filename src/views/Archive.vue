<template>
  <table>
    <tbody>
      <tr>
        <th v-for="(header, i) in demandHeaders" :key="i">
          {{header}}
        </th>
      </tr>
      <tr v-for="(demand, i) in demands" :key="i">
        <ArchiveRecord :demand="demand" />
      </tr>
    </tbody>
  </table>
</template>

<script setup>

import {onMounted, ref} from "vue";
import {demandHeaders} from '../data/demandHeaders';
import {getCompleteDemands} from '../controllers/DemandController'
import ArchiveRecord from "../components/archive/ArchiveRecord";

const demands = ref([])

onMounted(async () => {
  const res = await getCompleteDemands()
  demands.value = res.data
})
</script>

<style scoped>

</style>
